import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  PlaySquare,
  Shield,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UnifiedPlatformSection } from "@/components/landing/unified-platform-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/80 bg-card">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Shield className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-foreground">SEHATDOC</p>
              <p className="text-[10px] text-muted-foreground">Pakistan&apos;s #1 Clinic Platform</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="#" className="hover:text-foreground">Products</Link>
            <Link href="#" className="hover:text-foreground">Pricing</Link>
            <Link href="#" className="hover:text-foreground">About Us</Link>
            <Link href="#" className="hover:text-foreground">Blog</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Pakistan&apos;s #1 Clinic Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Digitize Your
            <span className="block text-primary/20">Records</span>
            <span className="block">in Minutes</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            The all-in-one EMR and clinic management system trusted by thousands
            of doctors across Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/login">Book a Demo</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
            <p className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-success" />
              Instant Setup
            </p>
            <p className="inline-flex items-center gap-1.5">
              <Shield className="size-3.5 text-success" />
              Bank-Grade Security
            </p>
            <p className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5 text-success" />
              24/7 Support
            </p>
          </div>

          <div className="mt-10 w-full max-w-lg rounded-xl border bg-card p-4 sm:p-6">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              TRUSTED BY DOCTORS ACROSS PAKISTAN
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="mt-1 text-[10px] tracking-wider text-muted-foreground">DOCTORS ONBOARD</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="mt-1 text-[10px] tracking-wider text-muted-foreground">CITIES</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50k+</p>
                <p className="mt-1 text-[10px] tracking-wider text-muted-foreground">PATIENTS MANAGED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Walkthrough */}
        <section className="mx-auto mt-24 w-full max-w-5xl sm:mt-32">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-teal-700">
              <Video className="size-3.5" />
              VIDEO WALKTHROUGH
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              See <span className="text-teal-600">SehatDoc</span> in Action
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Watch our quick tutorial to see how easily you can manage appointments,
              prescribe smart medicines, handle billing, and run your entire clinic.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <Image
              src="/landing-walkthrough.png"
              alt="SehatDoc clinic dashboard preview"
              width={1200}
              height={675}
              className="aspect-video w-full object-cover"
              priority
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Quick Setup",
                description: "Go live in under 5 minutes with zero installation needed.",
              },
              {
                icon: ShieldCheck,
                title: "100% Secure",
                description: "HIPAA compliant and end-to-end encrypted medical data.",
              },
              {
                icon: PlaySquare,
                title: "Easy Walkthrough",
                description: "Step-by-step guidance on every feature from Day 1.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex size-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <UnifiedPlatformSection />
      </main>
    </div>
  );
}
