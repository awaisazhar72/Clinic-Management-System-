import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleDot,
  CreditCard,
  Star,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Solo",
    description: "Perfect for solo practitioners just getting started.",
    price: "PKR 4,000",
    cta: "Start Free Trial",
    href: "/register",
    featured: false,
    features: [
      "1 Doctor & 1 Receptionist Account",
      "Unlimited Patients",
      "Appointment Scheduling",
      "Digital Prescriptions",
      "Basic Billing",
      "Patient Reminders (WhatsApp)",
      "Email Support",
    ],
  },
  {
    name: "Care",
    description: "Full clinic management for growing practices.",
    price: "PKR 5,500",
    cta: "Start Free Trial",
    href: "/register",
    featured: true,
    features: [
      "Up to 3 Doctors & 2 Receptionists",
      "Receptionist Portal",
      "Staff Management",
      "Advanced Billing & Reports",
      "Patient Reminders (WhatsApp)",
      "QR Code Booking",
      "Cost Control Dashboard",
      "Priority Support",
    ],
  },
  {
    name: "Elite",
    description: "Multi-branch hospitals and large clinic networks.",
    price: "PKR 6,500",
    cta: "Contact Sales",
    href: "/register",
    featured: false,
    features: [
      "Up to 6 Doctors, 3 Receptionists",
      "Multi-Branch Support",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Unlimited Patients",
      "24/7 Phone Support",
      "On-site Onboarding",
    ],
  },
];

const assurances = [
  { icon: CircleDot, label: "14-day free trial" },
  { icon: Zap, label: "Cancel anytime" },
  { icon: CreditCard, label: "No credit card needed" },
  { icon: Check, label: "Setup in under 10 minutes" },
];

export function SimplePricingSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          SIMPLE PRICING
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          One simple subscription. Zero hidden fees.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          No complicated tiers, no confusing add-ons. Pick a monthly plan, cancel
          anytime. Free 14-day trial — no credit card required.
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-6 shadow-sm",
              plan.featured
                ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20 lg:-translate-y-2 lg:scale-[1.02]"
                : "border-border bg-card text-foreground"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold tracking-wide text-slate-900">
                <Star className="size-3 fill-current" />
                MOST POPULAR
              </span>
            )}

            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p
              className={cn(
                "mt-1 text-sm",
                plan.featured ? "text-primary-foreground/75" : "text-muted-foreground"
              )}
            >
              {plan.description}
            </p>

            <div className="mt-5">
              <p className="text-3xl font-bold tracking-tight">{plan.price}</p>
              <p
                className={cn(
                  "text-xs",
                  plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                /month
              </p>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      plan.featured ? "text-primary-foreground/90" : "text-foreground"
                    )}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={cn(
                "mt-8 w-full rounded-full",
                plan.featured && "bg-white text-primary hover:bg-white/90"
              )}
            >
              <Link href={plan.href}>
                {plan.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {assurances.map((item) => (
          <p
            key={item.label}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <item.icon className="size-4 text-primary" />
            {item.label}
          </p>
        ))}
      </div>
    </section>
  );
}
