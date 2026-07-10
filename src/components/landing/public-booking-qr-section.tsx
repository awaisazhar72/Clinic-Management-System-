import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  QrCode,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const bookingSteps = [
  {
    icon: QrCode,
    text: "Patient scans the QR code from their phone",
  },
  {
    icon: CalendarDays,
    text: "They see live available slots and pick a time",
  },
  {
    icon: CheckCircle2,
    text: "Booking confirmed instantly — no calls needed",
  },
  {
    icon: Clock3,
    text: "You get notified in real-time on your dashboard",
  },
];

function QrCodeVisual() {
  // Deterministic fake QR matrix (21x21) with classic finder patterns
  const size = 21;
  const modules: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  const paintFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r += 1) {
      for (let c = 0; c < 7; c += 1) {
        const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const inCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        modules[row + r][col + c] = onBorder || inCenter;
      }
    }
  };

  paintFinder(0, 0);
  paintFinder(0, size - 7);
  paintFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i += 1) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }

  // Pseudo data modules (stable pattern, looks like a real QR)
  const seed = [
    1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1,
    1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0,
  ];

  let seedIndex = 0;
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      const inTopLeftFinder = r < 9 && c < 9;
      const inTopRightFinder = r < 9 && c > size - 10;
      const inBottomLeftFinder = r > size - 10 && c < 9;
      const onTiming = r === 6 || c === 6;
      if (inTopLeftFinder || inTopRightFinder || inBottomLeftFinder || onTiming) continue;

      modules[r][c] = seed[seedIndex % seed.length] === 1;
      seedIndex += 1;
    }
  }

  const cell = 8;
  const quiet = 12;
  const canvas = size * cell + quiet * 2;

  return (
    <svg
      viewBox={`0 0 ${canvas} ${canvas}`}
      className="mx-auto mt-6 size-44 rounded-2xl bg-white p-2 shadow-sm"
      role="img"
      aria-label="Clinic booking QR code"
    >
      <rect width={canvas} height={canvas} fill="white" />
      {modules.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={quiet + c * cell}
              y={quiet + r * cell}
              width={cell}
              height={cell}
              className="fill-primary"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function QrBookingCard() {
  return (
    <div className="mx-auto w-full max-w-xs rounded-3xl border border-primary/30 bg-card p-8 text-center shadow-2xl shadow-primary/10">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <QrCode className="size-6" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-foreground">City Care Clinic</h3>
      <p className="mt-1 text-sm text-muted-foreground">Scan to book appointment</p>

      <QrCodeVisual />

      <p className="mt-5 text-xs font-medium text-primary">clinicmanagement.com/book/city-care</p>
    </div>
  );
}

export function PublicBookingQrSection() {
  return (
    <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 bg-slate-950 py-20 sm:mt-36 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
            <QrCode className="size-3.5" />
            PUBLIC BOOKING QR
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Patients book in <span className="text-primary">seconds.</span>
            <span className="mt-1 block">No app. No call. Just scan.</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            Display your clinic&apos;s unique QR at the entrance, on social media, or on
            prescriptions. Patients scan, pick a slot, and book — contactless, 24/7.
          </p>

          <ul className="mt-8 space-y-3">
            {bookingSteps.map((step) => (
              <li
                key={step.text}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <step.icon className="size-4" />
                </span>
                <span className="text-sm text-slate-200">{step.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/register">
                Get your QR code
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-700 bg-transparent px-6 text-white hover:bg-slate-900 hover:text-white"
            >
              <Link href="/login">Watch demo</Link>
            </Button>
          </div>
        </div>

        <QrBookingCard />
      </div>
    </section>
  );
}
