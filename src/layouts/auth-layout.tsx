"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  FileText,
  Pill,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { APP_NAME } from "@/constants";

// ---------- Marquee preview cards for the brand panel ----------

function PatientsCard() {
  return (
    <div className="w-56 shrink-0 rounded-xl bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Total Patients
        </span>
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Users className="size-3.5" />
        </div>
      </div>
      <p className="mt-1 text-2xl font-bold text-neutral-900">1,284</p>
      <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-success">
        <TrendingUp className="size-3" />
        +8.2% this month
      </p>
    </div>
  );
}

function AppointmentCardMini() {
  return (
    <div className="w-56 shrink-0 rounded-xl bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Next Appointment
        </span>
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarClock className="size-3.5" />
        </div>
      </div>
      <p className="mt-1 text-sm font-semibold text-neutral-900">Sara Malik</p>
      <p className="text-xs text-muted-foreground">Dr. Ayesha Khan &middot; 10:30 AM</p>
      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning-foreground">
        Scheduled
      </span>
    </div>
  );
}

function InvoiceStatusCard() {
  return (
    <div className="w-56 shrink-0 rounded-xl bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Invoice Status
        </span>
        <div className="flex size-7 items-center justify-center rounded-lg bg-success/10 text-success">
          <CheckCircle2 className="size-3.5" />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <svg width="48" height="48" viewBox="0 0 36 36" className="shrink-0 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-muted)" strokeWidth="4" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 15.5 * 0.62} ${2 * Math.PI * 15.5}`}
            strokeLinecap="round"
          />
        </svg>
        <div>
          <p className="text-lg font-bold text-neutral-900">62%</p>
          <p className="text-[10px] text-muted-foreground">Paid this month</p>
        </div>
      </div>
    </div>
  );
}

function PrescriptionCard() {
  return (
    <div className="w-56 shrink-0 rounded-xl bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Prescription
        </span>
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-3.5" />
        </div>
      </div>
      <p className="mt-1 text-sm font-semibold text-neutral-900">Cetirizine 10mg</p>
      <p className="text-xs text-muted-foreground">1 Morning &middot; 10 days</p>
      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
        <Pill className="size-2.5" />
        Sent to pharmacy
      </span>
    </div>
  );
}

function DoctorCardMini() {
  return (
    <div className="w-56 shrink-0 rounded-xl bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Doctors on duty
        </span>
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Stethoscope className="size-3.5" />
        </div>
      </div>
      <p className="mt-1 text-sm font-semibold text-neutral-900">Dr. Ayesha Khan</p>
      <p className="text-xs text-muted-foreground">Cardiology &middot; 8 patients today</p>
      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
        Active now
      </span>
    </div>
  );
}

const marqueeCards = [
  { Card: PatientsCard, tilt: -4 },
  { Card: InvoiceStatusCard, tilt: 3 },
  { Card: AppointmentCardMini, tilt: -3 },
  { Card: PrescriptionCard, tilt: 4 },
  { Card: DoctorCardMini, tilt: -2 },
];

function MarqueeRow({ duration = 28 }: { duration?: number }) {
  // Render the card set twice back-to-back so the loop is seamless.
  // Cards travel right → left continuously.
  const track = [...marqueeCards, ...marqueeCards];

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map(({ Card, tilt }, i) => (
          <div key={i} style={{ transform: `rotate(${tilt}deg)` }}>
            <Card />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ---------- Auth layout ----------

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
<<<<<<< Updated upstream
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Clinic Management
            </span>
          </Link>
=======
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto w-full max-w-sm"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="mb-10 flex items-center gap-2">
              <motion.div
                initial={{ rotate: -15, scale: 0.7 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold"
              >
                S
              </motion.div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {APP_NAME}
              </span>
            </Link>
          </motion.div>
>>>>>>> Stashed changes

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] py-16 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 px-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80">
            <span className="size-1.5 rounded-full bg-success" />
            Clinic Operations
          </span>
        </motion.div>

<<<<<<< Updated upstream
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
=======
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 max-w-md px-16"
        >
          <h2 className="font-serif text-4xl italic leading-snug text-white">
            Your clinic, intelligently organized.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Patients, appointments, prescriptions, and billing — brought together
            in one calm workspace built for busy clinics.
          </p>
        </motion.div>
>>>>>>> Stashed changes

        {/* Marquee cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative z-10 py-2"
        >
          <MarqueeRow duration={30} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative z-10 mt-8 flex items-center gap-6 px-16 text-xs text-white/60"
        >
          <span>
            &copy; {new Date().getFullYear()} {APP_NAME}
          </span>
          <span className="size-1 rounded-full bg-white/40" />
          <span>Built for modern clinics</span>
        </motion.div>
      </div>
    </div>
  );
}