import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileText,
  FlaskConical,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const labFeatures = [
  {
    icon: FlaskConical,
    title: "Diagnostic order tracking",
    body: "Book tests and follow sample status live from the patient record.",
  },
  {
    icon: FileText,
    title: "Custom report builder",
    body: "Create print-ready lab reports with parameters filled in automatically.",
  },
  {
    icon: ClipboardCheck,
    title: "Smart templates",
    body: "Reuse panels like CBC, lipid, and thyroid for one-click report drafting.",
  },
  {
    icon: BarChart3,
    title: "Billing & POS integration",
    body: "Push lab orders into clinic invoicing so charges stay clear and instant.",
  },
];

export function LabDiagnosticsSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-5xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          <FlaskConical className="size-3.5" />
          CLINIC MANAGEMENT SYSTEM IS LIVE
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Advanced diagnostics & reports —{" "}
          <span className="text-primary">now in one click</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Our clinic management system includes a fully integrated laboratory
          module. Launch tests, manage sample collection, and publish verified
          digital reports without leaving your clinic workflow.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {labFeatures.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <feature.icon className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild className="rounded-full px-6">
          <Link href="/register">
            Go to Clinic Management
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
