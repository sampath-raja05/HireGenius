"use server";

import { currentUser } from "@clerk/nextjs/server";
import { request } from "@arcjet/next";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { createRateLimiter, checkRateLimit } from "@/lib/arcjet";
import { WithdrawalRequestEmail } from "@/emails/WithdrawalRequestEmail";

const ADMIN_EMAIL = "piyushagarwalvo@gmail.com";
const PLATFORM_FEE = 0.2;

let withdrawalLimiter;

function getWithdrawalLimiter() {
  if (!withdrawalLimiter) {
    withdrawalLimiter = createRateLimiter({
      refillRate: 1,
      interval: "1h",
      capacity: 3,
    });
  }

  return withdrawalLimiter;
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  return new Resend(apiKey);
}

export const setAvailability = async ({ startTime, endTime }) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser || dbUser.role !== "INTERVIEWER") throw new Error("Forbidden");

  if (!startTime || !endTime) throw new Error("Start and end time required");

  // Use fixed base date so a daily time window (e.g. 08:00–17:00) is never
  // incorrectly rejected just because the current wall-clock time has passed.
  const baseDate = "1970-01-01T";
  const start = new Date(baseDate + new Date(startTime).toTimeString().slice(0, 8));
  const end   = new Date(baseDate + new Date(endTime).toTimeString().slice(0, 8));
  if (start >= end) {
    throw new Error("Start time must be before end time");
  }

  try {
    const existing = await db.availability.findFirst({
      where: { interviewerId: dbUser.id, status: "AVAILABLE" },
    });

    if (existing) {
      await db.availability.update({
        where: { id: existing.id },
        data: {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
    } else {
      await db.availability.create({
        data: {
          interviewerId: dbUser.id,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status: "AVAILABLE",
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save availability");
  }
};

export const getAvailability = async () => {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  // Return null instead of throwing — a missing user (e.g. new signup) should
  // not crash the dashboard's Promise.all and should just show no availability.
  if (!dbUser) return null;

  return db.availability.findFirst({
    where: { interviewerId: dbUser.id, status: "AVAILABLE" },
  });
};

export const getInterviewerAppointments = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser) return [];

  return db.booking.findMany({
    where: { interviewerId: dbUser.id },
    include: {
      interviewee: { select: { name: true, imageUrl: true, email: true } },
      feedback: true,
    },
    orderBy: { startTime: "desc" },
  });
};

export const getInterviewerStats = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    select: {
      creditBalance: true,
      creditRate: true,
      bookingsAsInterviewer: {
        where: { status: "COMPLETED" },
        select: { creditsCharged: true },
      },
    },
  });

  if (!dbUser) {
    return {
      creditBalance: 0,
      creditRate: 1,
      totalEarned: 0,
      completedSessions: 0,
    };
  }

  const totalEarned = dbUser.bookingsAsInterviewer.reduce(
    (sum, booking) => sum + booking.creditsCharged,
    0
  );

  return {
    creditBalance: dbUser.creditBalance,
    creditRate: dbUser.creditRate,
    totalEarned,
    completedSessions: dbUser.bookingsAsInterviewer.length,
  };
};

export const requestWithdrawal = async ({
  credits,
  paymentMethod,
  paymentDetail,
}) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const req = await request();
  const rateLimitError = await checkRateLimit(
    getWithdrawalLimiter(),
    req,
    user.id
  );
  if (rateLimitError) throw new Error(rateLimitError);

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser || dbUser.role !== "INTERVIEWER") throw new Error("Forbidden");

  if (!credits || credits <= 0) throw new Error("Invalid credit amount");
  if (credits > dbUser.creditBalance) {
    throw new Error("Insufficient credit balance");
  }
  if (!paymentMethod || !paymentDetail) {
    throw new Error("Payment details required");
  }

  const netAmount = credits * (1 - PLATFORM_FEE) * 5;
  const platformFee = credits * PLATFORM_FEE * 5;

  try {
    const [payout] = await db.$transaction([
      db.payout.create({
        data: {
          interviewerId: dbUser.id,
          credits,
          platformFee,
          netAmount,
          paymentMethod,
          paymentDetail,
          status: "PROCESSING",
        },
      }),
      db.user.update({
        where: { id: dbUser.id },
        data: { creditBalance: { decrement: credits } },
      }),
    ]);

    try {
      const resend = getResend();
      if (!resend) {
        console.warn("Skipping withdrawal email: RESEND_API_KEY is not set.");
      } else {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
        const reviewUrl = `${appUrl}/payout/${payout.id}`;
        const html = await render(
          WithdrawalRequestEmail({
            interviewerName: dbUser.name ?? "Unknown",
            interviewerEmail: dbUser.email,
            credits,
            platformFee,
            netAmount,
            paymentMethod,
            paymentDetail,
            reviewUrl,
          })
        );

        await resend.emails.send({
          from: "Prept <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: `Withdrawal Request - ${dbUser.name} - ${credits} credits`,
          html,
        });
      }
    } catch (emailError) {
      console.error("Withdrawal email failed:", emailError);
    }

    revalidatePath("/dashboard");
    return { success: true, netAmount };
  } catch (error) {
    console.error(error);
    throw new Error("Withdrawal request failed");
  }
};

export const getWithdrawalHistory = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser) return [];

  return db.payout.findMany({
    where: { interviewerId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });
};
