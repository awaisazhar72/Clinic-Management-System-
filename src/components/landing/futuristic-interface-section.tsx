"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  { id: 1, label: "Dashboard overview" },
  { id: 2, label: "Appointments board" },
  { id: 3, label: "Patient records" },
  { id: 4, label: "Prescriptions" },
  { id: 5, label: "Billing & finance" },
  { id: 6, label: "Pharmacy inventory" },
  { id: 7, label: "Lab reports" },
  { id: 8, label: "Staff schedule" },
];

const highlights = [
  {
    icon: Zap,
    title: "Lightning fast",
    body: "Sub-second page loads with live data updates — no waiting on reports.",
  },
  {
    icon: Layers,
    title: "Contextual dashboards",
    body: "Every role gets a workspace built for them — doctors, reception, pharmacy.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first design",
    body: "Same clear experience on phone, tablet, or desktop, wherever you work.",
  },
  {
    icon: Monitor,
    title: "Dark & light mode",
    body: "Switch themes comfortably for day or night clinic shifts.",
  },
];

export function FuturisticInterfaceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 bg-slate-950 py-20 sm:mt-36 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
            <Sparkles className="size-3.5" />
            FUTURISTIC INTERFACE
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            No more boring dashboards.
            <span className="mt-1 block text-primary">This is healthcare, reimagined.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Built for clarity and speed first. Every screen is intentional, every
            interaction is smooth — so your clinic team moves faster with less friction.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <p className="flex-1 text-center text-[11px] text-slate-500">
                app.clinicmanagement.com/dashboard
              </p>
              <p className="text-[11px] font-medium text-primary">● Secure</p>
            </div>

            <div className="relative aspect-[16/9] bg-slate-950">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-700/80 bg-slate-900/50 m-4 rounded-xl">
                <p className="text-sm font-medium text-slate-300">
                  Image placeholder {activeIndex + 1}/{slides.length}
                </p>
                <p className="text-xs text-slate-500">{activeSlide.label}</p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Drop your screenshot here later
                </p>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-white hover:bg-slate-800"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-white hover:bg-slate-800"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
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
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild className="rounded-full px-6">
            <Link href="/login">
              See a live demo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
