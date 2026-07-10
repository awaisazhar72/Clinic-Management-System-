"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Headset,
  ShieldCheck,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: Stethoscope,
    title: "Individual doctor portals",
    body: "Each doctor gets a secure workspace with their own schedule and patient list.",
  },
  {
    icon: Headset,
    title: "Separate receptionist access",
    body: "Front desk can manage queues and bookings without seeing sensitive clinical data.",
  },
  {
    icon: Zap,
    title: "Real-time synchronization",
    body: "Reception updates show up instantly on the doctor dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Permission management",
    body: "Control what each staff member can view or edit with role-based settings.",
  },
];

const slides = [
  { id: 1, label: "Receptionist dashboard" },
  { id: 2, label: "Doctor workspace" },
  { id: 3, label: "Staff permissions" },
];

export function TeamCollaborationSection() {
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
            <Users className="size-3.5" />
            TEAM COLLABORATION
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Manage your entire{" "}
            <span className="text-primary">clinic team</span> with ease
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Whether you run a solo practice or a multi-doctor clinic, give every
            role a clear workspace so the whole team stays in sync.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <feature.icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-xl shadow-black/5 sm:p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-sm font-medium text-foreground">
                  Team UI placeholder {activeIndex + 1}/{slides.length}
                </p>
                <p className="text-xs text-muted-foreground">{activeSlide.label}</p>
                <p className="text-[11px] text-muted-foreground/80">
                  Add dashboard screenshots here later
                </p>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous team preview"
                className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm hover:bg-card"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next team preview"
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
                  index === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
