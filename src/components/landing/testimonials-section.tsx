"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "The public QR booking feature is a lifesaver. Patients scan the code outside my clinic and register themselves. It has reduced reception wait times significantly.",
    name: "Dr. Amara Saeed",
    role: "Gynecologist — Women's Health Clinic",
    city: "RAWALPINDI",
  },
  {
    quote:
      "Accessing patient EMR history on my phone is so convenient. I can review past diagnoses, lab reports, and prescriptions even when I'm away from the clinic.",
    name: "Dr. Tariq Mahmood",
    role: "Cardiologist — Heart Care Centre",
    city: "GUJRANWALA",
  },
  {
    quote:
      "Billing used to take hours every evening. Now invoices generate automatically after each visit and my monthly reports are ready in one click.",
    name: "Dr. Sana Iqbal",
    role: "General Physician — City Care Clinic",
    city: "KARACHI",
  },
  {
    quote:
      "Staff roles are clear and secure. Reception handles bookings while I stay focused on patients — without worrying about who can see clinical notes.",
    name: "Dr. Hassan Raza",
    role: "Orthopedic Surgeon — Bone & Joint Clinic",
    city: "LAHORE",
  },
];

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const goPrev = () => {
    const nextIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    scrollToIndex(nextIndex);
  };

  const goNext = () => {
    const nextIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;

      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft - track.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 bg-primary py-16 sm:mt-36 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            <Heart className="size-3.5" />
            SATISFIED DOCTORS
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by healthcare providers across Pakistan
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">
            Don&apos;t just take our word for it. Here&apos;s what Pakistani doctors and
            clinic owners say about our clinic management system.
          </p>
        </div>

        <div className="relative px-12 sm:px-14">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <article
                key={`${item.name}-${item.city}`}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl bg-white p-5 shadow-lg sm:w-[calc(50%-0.5rem)]"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mt-4 flex-1 text-sm italic leading-6 text-slate-600">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                      PK
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                      <p className="mt-0.5 text-[10px] font-semibold tracking-wider text-primary">
                        {item.city}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-5 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
