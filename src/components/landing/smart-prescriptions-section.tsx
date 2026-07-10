"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FilePlus2,
  Layers,
  Save,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: Layers,
    title: "Prescription templates",
    body: "Build reusable plans for common conditions — one click and you're done.",
  },
  {
    icon: Save,
    title: "Save & reuse anytime",
    body: "Set treatment plans once and apply them to any patient instantly.",
  },
  {
    icon: Clock3,
    title: "Faster consultations",
    body: "Cut documentation time in half — spend more time on actual care.",
  },
  {
    icon: FilePlus2,
    title: "Digital Rx printing",
    body: "Professional digital prescriptions with clinic branding, ready to print or share.",
  },
];

const checklist = [
  "Works on mobile, tablet & desktop",
  "Supports ICD-10 diagnosis codes",
  "WhatsApp or print delivery for patients",
];

const slides = [
  { id: 1, label: "Branded Rx preview" },
  { id: 2, label: "Template applied" },
  { id: 3, label: "Print / share view" },
];

export function SmartPrescriptionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
            <Sparkles className="size-3.5" />
            SMART PRESCRIPTIONS
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Prescriptions got{" "}
            <span className="text-primary">smarter</span>. Set plans, use anytime.
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Stop retyping the same medicines every visit. Create treatment templates,
            save preferred plans, and apply them in one click — your workflow, your rules.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-accent text-primary">
                  <feature.icon className="size-4" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{feature.body}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-xl shadow-black/5 sm:p-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-sm font-medium text-foreground">
                  Rx image placeholder {activeIndex + 1}/{slides.length}
                </p>
                <p className="text-xs text-muted-foreground">{activeSlide.label}</p>
                <p className="text-[11px] text-muted-foreground/80">
                  Add prescription screenshots here later
                </p>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous prescription preview"
                className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm hover:bg-card"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next prescription preview"
                className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm hover:bg-card"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to ${slide.label}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
