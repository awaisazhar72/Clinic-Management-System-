"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { APP_NAME } from "@/constants";

function PulseLine() {
  return (
    <svg
      viewBox="0 0 600 120"
      className="w-full max-w-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M0 60 H160 L185 20 L215 100 L245 40 L270 60 H600"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Form side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Clinic Management
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Brand side */}
      <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] px-16 py-16">
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="relative z-10">
          <span className="text-white/70 text-sm font-medium tracking-wide uppercase">
            Clinic Operations
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-start gap-8">
          <PulseLine />
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold text-white leading-snug">
              Every patient. Every appointment. One steady rhythm.
            </h2>
            <p className="mt-4 text-white/80 text-sm leading-relaxed">
              Our clinic management system brings scheduling, records, prescriptions, and billing
              into a single, calm workspace built for busy clinics.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-white/60 text-xs">
          <span>&copy; {new Date().getFullYear()} {APP_NAME}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>Built for modern clinics</span>
        </div>
      </div>
    </div>
  );
}
