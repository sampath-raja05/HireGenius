import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString =
    process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ DATABASE_URL / DIRECT_URL is missing");
    throw new Error("Database not configured");
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false, // important for Vercel + Neon/Supabase
    },
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
  });
}

export const db =
  globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}