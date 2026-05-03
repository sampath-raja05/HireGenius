import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { EmeraldTitle, GrayTitle, SectionHeading, SectionLabel } from "@/components/reuseable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CodeDemo } from "@/components/demo-components-animate-code";
import BentoCard from "@/components/BentoCard";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Lock,
  MessageCircle,
  Video,
  Wallet,
} from "lucide-react";
import { ROLES, SLOTS } from "@/lib/data";
import MockUI from "@/components/mockUI";
import { PricingTable } from "@clerk/nextjs";

const AVATARS = [
  { src: "https://randomuser.me/api/portraits/men/32.jpg" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg" },
  { src: "https://randomuser.me/api/portraits/men/76.jpg" },
  { src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { src: "https://randomuser.me/api/portraits/men/12.jpg" },
];

export const LOGOS = [
  { src: "/amazon.svg", alt: "Amazon" },
  { src: "/atlassian.svg", alt: "Atlassian" },
  { src: "/google.webp", alt: "Google" },
  { src: "/meta.svg", alt: "Meta" },
  { src: "/microsoft.webp", alt: "Microsoft" },
  { src: "/netflix.png", alt: "Netflix" },
  { src: "/uber.svg", alt: "Uber" },
];

export const AI_TAGS = [
  { label: "Frontend Engineer", active: true },
  { label: "L5 Level", active: true },
  { label: "React Performance", active: false },
  { label: "System Design", active: false },
  { label: "Behavioural", active: true },
  { label: "DSA", active: false },
];

export default function Home() {
  return (
    <div className="bg-black overflow-x-hidden">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 relative min-h-screen grid grid-cols-1 lg:grid-cols-5 px-4 sm:px-8 pb-20 overflow-hidden">
        
        <StarsBackgroundDemo />

        <div className="col-span-full lg:col-span-3 flex flex-col items-center justify-center text-center lg:-rotate-2">
          
          <Badge variant="emerald">Powered by AI - Now in Beta</Badge>

          <h1 className="font-serif relative text-5xl sm:text-6xl lg:text-7xl tracking-tighter max-w-4xl">
            <GrayTitle>Ace your next interview with AI</GrayTitle>
            <br />
            <EmeraldTitle>with real experts</EmeraldTitle>
          </h1>

          <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
            Book 1:1 mock interviews with senior engineers from top tech companies and get personalized feedback to help you land your dream job.
          </p>

          {/* Buttons */}
          <div className="relative z-10 mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            
            <Link href="/onboarding" className="relative">
              <Button
                className="min-w-[200px] justify-center bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>

            <Link href="/explore" className="relative">
              <Button
                className="min-w-[240px] justify-center border border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-base px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Browse interviewers →
              </Button>
            </Link>

          </div>

          {/* Avatars */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
            
            <div className="flex">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-[#0a0a0b] overflow-hidden ${
                    i > 0 ? "-ml-2" : ""
                  }`}
                >
                  <Image
                    src={av.src}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-stone-500 text-center sm:text-left">
              <strong className="text-stone-400 font-medium">
                2,400+ engineers have used HireGenius to prepare for their interviews.
              </strong>{" "}
              Join them and get the confidence you need to ace your next interview!
            </p>

          </div>

        </div>
        <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-12 lg:mt-0 lg:rotate-3">
          <CodeDemo duration={30000} writing />
        </div>
      </section>
      <section className="relative z-10 border-y border-white/10 py-14">
      <p className="text-center text-xs font-medium text-stone-600 tracking-widest uppercase mb-8">Interviwees landed roles at</p>
      <div className="flex flex-wrap items-center justify-center gap-24 px-6">
        {LOGOS.map((l)=>(
          <Image
          key={l.alt}
          src={l.src}
          alt={l.alt}
          width={50}
          height={50}
          className="h-6 w-auto opacity-60 grayscale"/>
        ))}
      </div>
      </section>
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-16 text-center">
            <SectionLabel>Features</SectionLabel>
            <SectionHeading
              gray="Everything you need,"
              emerald="Nothing you don't"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <BentoCard
                className="min-h-[316px]"
                icon={<Bot size={20} />}
                title={<GrayTitle>AI Question Generator</GrayTitle>}
                desc="Interviewers get a live AI co-pilot generating role-specific questions on demand - system design, behavioural, DSA - all tailored to the candidate's level."
              >
                <div className="flex flex-wrap gap-2">
                  {AI_TAGS.map((t) => (
                    <Badge key={t.label} variant={t.active ? "emerald" : "outline"}>
                      {t.label}
                    </Badge>
                  ))}
                </div>
              </BentoCard>
            </div>

            <div className="lg:col-span-5">
              <BentoCard
                className="min-h-[316px]"
                icon={<Wallet size={18} />}
                title={<GrayTitle>Credit System</GrayTitle>}
                desc="Subscribe for monthly credits. Book sessions. Interviewers earn and withdraw any time."
              >
                <div className="flex items-end justify-between rounded-[22px] border border-white/[0.08] bg-[#17171b] p-5">
                  <div>
                    <p className="mb-2 text-xs text-stone-600">Your balance</p>
                    <p className="font-serif text-5xl leading-none text-emerald-300 tabular-nums lining-nums">28</p>
                    <p className="mt-2 text-xs text-stone-600">credits remaining</p>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs font-medium text-stone-200">
                    +10 this month
                  </span>
                </div>
              </BentoCard>
            </div>

            <div className="lg:col-span-4">
              <BentoCard
                className="min-h-[288px]"
                icon={<Video size={18} />}
                title="HD Video Calls"
                desc="Powered by Stream. Screen sharing, recording, and instant playback links - all built in."
              >
                <MockUI rows={3} highlightRow={2} />
              </BentoCard>
            </div>

            <div className="lg:col-span-4">
              <BentoCard
                className="min-h-[288px]"
                icon={<MessageCircle size={18} />}
                title="Persistent Chat"
                desc="Message your interviewer before and after the call. Share resources, prep notes, and follow-ups in one thread."
              />
            </div>

            <div className="lg:col-span-4">
              <BentoCard
                className="min-h-[288px]"
                icon={<Lock size={18} />}
                title="Security by Arcjet"
                desc="Bot protection, rate limiting, and abuse prevention baked into every API route."
              />
            </div>

            <div className="lg:col-span-6">
              <BentoCard
                className="min-h-[284px]"
                icon={<BarChart3 size={18} />}
                title={<GrayTitle>AI Feedback Reports</GrayTitle>}
                desc="Post-interview analysis by Gemini with actionable insights."
              >
                <MockUI rows={4} highlightRow={2} />
              </BentoCard>
            </div>

            <div className="lg:col-span-6">
              <BentoCard
                className="min-h-[284px]"
                icon={<CalendarDays size={18} />}
                title={<span className="text-emerald-300">Slot-based Scheduling</span>}
                desc="Interviewers set availability once. Interviewees pick from open slots and confirm with one click - no back-and-forth needed."
              >
                <div className="flex flex-wrap gap-2">
                  {SLOTS.map((s) => (
                    <span
                      key={s.label}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium ${s.cls}`}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>who it&apos;s for</SectionLabel>
          <SectionHeading gray="Built for both sides" emerald="of the table"></SectionHeading>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ROLES.map((role) => (
            <div
            key={role.label}
            className="relative bg-[#f0f11] border border-white/10 hover:border-emerald-400/20 rounded-2xl p-12 h-full transition-duration-300 overflow-hidden">
            <span className="inline-block text-xs font-semibold text-emerald-400 tracking-widest uppercase border border-emerald-400/20 bg-emerald-400/10 rounded-full px-3 py-1.5 mb-5">
            {role.label}
            </span>

            <h3 className="font-serif text-2xl tracking-tight mb-4">
              {role.title}
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed mb-8">
                {role.desc}
              </p>
              <ul className="space-y-3">
                {role.perks.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-stone-400">
                    <span className="mt-0.5 min-w-4 h-4 rounded-full bg-emerald-400/10 border border-emerald-400/20 flrx items-centre justify-centre text-xs text-emerald-400">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

          ))}
          
        </div>
      </section>
      <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading gray="Simple, transparent"
           emerald="credit-based plans"/>
           <p className="text-stone-400 mt-3 text-sm">
            Each credit = one session. Used credits roll over.
           </p>
        </div>
        <PricingTable checkoutProps={{
          appearance: {
            elements: {
              drawerRoot:{
                zIndex:2000
              },
            },
          },
        }}
        />
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <div className="relative flex flex-col items-center overflow-hidden rounded-[32px] border border-emerald-400/15 bg-linear-to-br from-emerald-400/5 px-6 py-20 text-center sm:px-12 md:px-16">
          <StarsBackgroundDemo />
          <h2 className="relative z-10 max-w-2xl font-serif text-[clamp(3rem,6vw,4.75rem)] leading-[0.95] tracking-tight">
          <GrayTitle>Your next interview</GrayTitle>
            <br />
          <EmeraldTitle>starts here</EmeraldTitle>
          </h2>
          <p className="relative z-10 mt-5 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Join thousands of engineers who have aced their interviews with
            HireGenius. Book your mock interview today and get the confidence
            you need to land your dream job!
          </p>
            <div className="relative z-10 mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              
              <Link href="/onboarding" className="relative">
                <Button
                  className="min-w-[200px] justify-center bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>

              <Link href="/explore" className="relative">
                <Button
                  className="min-w-[240px] justify-center border border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-base px-8 py-4 rounded-2xl transition-all duration-300"
                >
                  Browse interviewers →
                </Button>
              </Link>

            </div>
          </div>
      </section>
    </div>
  );
}
