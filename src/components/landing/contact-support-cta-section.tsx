import Link from "next/link";
import { Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactSupportCtaSection() {
  return (
    <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 bg-primary py-16 sm:mt-36 sm:py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <div className="flex size-14 items-center justify-center rounded-full bg-white/15 text-white">
          <Headphones className="size-6" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Have questions? We&apos;ve got answers.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
          Our dedicated Pakistani support team speaks your language — Urdu, English,
          and everything in between. We understand local clinic workflows and are
          trained to help you succeed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="rounded-full bg-white px-6 text-primary hover:bg-white/90"
          >
            <Link href="/register">Contact Support</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/login">Book a Live Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
