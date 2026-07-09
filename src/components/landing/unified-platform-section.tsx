import {
  Boxes,
  Check,
  Link2,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { PharmacyDashboardMock } from "@/components/landing/pharmacy-dashboard-mock";
import { PosCounterMock } from "@/components/landing/pos-counter-mock";

const pharmacyFeatures = [
  {
    icon: Boxes,
    title: "Live inventory tracking",
    body: "See stock levels as they change so critical medicines never run out.",
  },
  {
    icon: ShoppingCart,
    title: "POS integrated billing",
    body: "Ring up sales and print receipts from the same system your clinic uses.",
  },
  {
    icon: TrendingUp,
    title: "Revenue analytics",
    body: "Measure pharmacy performance on its own and spot what drives margin.",
  },
  {
    icon: Link2,
    title: "Prescription auto-fill",
    body: "Doctor orders flow straight to the counter with no duplicate entry.",
  },
];

const posHighlights = [
  "Auto-syncs with doctor prescriptions",
  "Daily, weekly, and monthly sales reports",
  "Low-stock alerts with reorder suggestions",
  "Returns and exchange management",
];

function SectionBadge({
  icon: Icon,
  label,
}: {
  icon: typeof Link2;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-teal-700">
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export function UnifiedPlatformSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <SectionBadge icon={Link2} label="BUILT-IN PHARMACY" />

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your clinic & pharmacy —{" "}
          <span className="text-teal-600">one unified platform</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Stop switching between disconnected tools. SehatDoc links your clinic
          workflow to pharmacy operations so prescriptions, billing, and inventory
          stay in sync.
        </p>
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <ul className="space-y-6">
          {pharmacyFeatures.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
                <feature.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <PharmacyDashboardMock />
      </div>

      <div className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 lg:order-1">
          <PosCounterMock />
        </div>

        <div className="order-1 lg:order-2">
          <SectionBadge icon={ShoppingCart} label="SMART POS COUNTER" />

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sell medicines like a pro —{" "}
            <span className="text-teal-600">zero paperwork</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            A fast counter experience helps staff scan, sell, and hand over
            receipts in seconds. Everything ties back to prescriptions so nothing
            gets missed at checkout.
          </p>

          <ul className="mt-6 space-y-3">
            {posHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
