import {
  CalendarDays,
  CheckCircle2,
  Cloud,
  Database,
  Lock,
  Shield,
  ShieldCheck,
  TriangleAlert,
  UserCog,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    body: "Patient data is encrypted in transit and at rest with AES-256 — the same standard banks use.",
    card: "bg-sky-50",
    iconColor: "text-sky-700",
  },
  {
    icon: Cloud,
    title: "Secure cloud backup",
    body: "Automatic daily backups keep records safe even if a device is lost, damaged, or stolen.",
    card: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    icon: UserCog,
    title: "Role-based access control",
    body: "Staff only see what they need. Doctors, reception, and pharmacy get separate access levels.",
    card: "bg-violet-50",
    iconColor: "text-violet-700",
  },
  {
    icon: Shield,
    title: "HIPAA-aligned infrastructure",
    body: "Systems follow strict healthcare privacy guidelines so patient records stay safe and compliant.",
    card: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    icon: TriangleAlert,
    title: "Breach detection & alerts",
    body: "Live monitoring flags unusual activity and notifies clinic admins right away.",
    card: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  {
    icon: Database,
    title: "99.9% uptime guarantee",
    body: "Enterprise-grade servers keep your clinic management system online around the clock.",
    card: "bg-rose-50",
    iconColor: "text-rose-700",
  },
];

const trustStats = [
  { value: "500+", label: "Active Clinics" },
  { value: "2M+", label: "Patient Records" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "0", label: "Data Breaches" },
];

const trustBadges = [
  { icon: Lock, label: "256-Bit Encryption" },
  { icon: CheckCircle2, label: "Regular Security Audits" },
  { icon: ShieldCheck, label: "GDPR Aligned" },
  { icon: CalendarDays, label: "Daily Backups" },
  { icon: Shield, label: "Two-Factor Auth" },
];

export function DataSecuritySection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          <Shield className="size-3.5" />
          DATA SECURITY
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your patients&apos; data is{" "}
          <span className="text-primary">Fort Knox secure.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          We treat patient privacy as seriously as you do. Every record,
          prescription, and transaction is protected — so you can focus on care,
          not security worries.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {securityFeatures.map((feature) => (
          <div
            key={feature.title}
            className={`rounded-2xl p-5 ${feature.card}`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl bg-white/80 ${feature.iconColor}`}
            >
              <feature.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{feature.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10 sm:py-14">
        <Shield className="mx-auto size-8 opacity-90" />

        <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Trusted by 500+ clinics across Pakistan
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/80">
          Millions of patient records processed without a single breach. Your
          trust is our most important metric.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs tracking-wide text-primary-foreground/75">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-primary-foreground"
            >
              <badge.icon className="size-3.5" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
