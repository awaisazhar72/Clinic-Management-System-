import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  FileText,
  TrendingUp,
  Zap,
} from "lucide-react";

const billingFeatures = [
  {
    icon: Zap,
    title: "Instant invoice generation",
    body: "Professional invoices created automatically after every consultation — zero manual effort.",
  },
  {
    icon: TrendingUp,
    title: "Cost control dashboard",
    body: "Track clinic expenses, staff costs, and revenue leakages from one central view.",
  },
  {
    icon: BarChart3,
    title: "Revenue insights",
    body: "Daily, weekly, and monthly revenue breakdowns with charts and trend analysis.",
  },
  {
    icon: CreditCard,
    title: "Multiple payment modes",
    body: "Cash, card, JazzCash, and EasyPaisa — record any payment type seamlessly.",
  },
];

const invoiceLines = [
  { label: "Consultation Fee", amount: "PKR 1,500" },
  { label: "ECG Test", amount: "PKR 800" },
  { label: "Medicines (Rx #2041)", amount: "PKR 2,200" },
];

function InvoiceMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5">
      <div className="bg-primary px-5 py-5 text-primary-foreground sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-primary-foreground/70">
              INVOICE
            </p>
            <h3 className="mt-1 text-lg font-bold">City Care Clinic</h3>
          </div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/15">
            <FileText className="size-5" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-primary-foreground/85">
          <p>
            Patient: <span className="font-medium text-primary-foreground">Ahmed Hassan</span>
          </p>
          <p>05 May 2026</p>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <ul className="space-y-3">
          {invoiceLines.map((line) => (
            <li
              key={line.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {line.label}
              </span>
              <span className="font-medium text-foreground">{line.amount}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
          <span className="text-sm font-semibold text-foreground">Total Amount</span>
          <span className="text-base font-bold text-primary">PKR 4,500</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2 className="size-4" />
            Payment Received
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground"
            >
              Print
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutomaticBillingSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          AUTOMATIC BILLING
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Billing on <span className="text-primary">autopilot</span>. Revenue in control.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          From consultation to payment — every rupee is tracked automatically. No lost
          receipts, no billing disputes. Just clean, accurate records.
        </p>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          {billingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <feature.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.body}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
            <h3 className="text-base font-semibold">Manage everything from one place</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Staff salaries, clinic rent, medicine purchases — all operational costs
              tracked in one dashboard. Full cost control, zero surprises.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Explore all features
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <InvoiceMock />
      </div>
    </section>
  );
}
