import { Globe, Headphones, Mail, MessageCircle, Phone, Sparkles } from "lucide-react";

const supportChannels = [
  {
    icon: MessageCircle,
    iconTone: "bg-emerald-500 text-white",
    label: "FASTEST RESPONSE",
    title: "WhatsApp Support",
    body: "Message us directly on WhatsApp and get a response within minutes — any time of day.",
    availability: "24/7",
  },
  {
    icon: Phone,
    iconTone: "bg-sky-500 text-white",
    label: "DEDICATED LINE",
    title: "Phone Support",
    body: "Speak to a real support expert who understands your clinic setup and can resolve issues fast.",
    availability: "9AM — 10PM PKT",
  },
  {
    icon: Mail,
    iconTone: "bg-violet-500 text-white",
    label: "DETAILED HELP",
    title: "Email Support",
    body: "Send us a detailed query and receive a thorough written response within 2–4 hours.",
    availability: "24/7",
  },
  {
    icon: Globe,
    iconTone: "bg-primary text-primary-foreground",
    label: "SELF-SERVICE",
    title: "Help Center",
    body: "Browse articles, video guides, and tutorials covering every clinic management feature.",
    availability: "ALWAYS ON",
  },
];

export function SupportSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          <Headphones className="size-3.5" />
          24/7 SUPPORT
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We&apos;re here{" "}
          <span className="text-primary">around the clock.</span> Whenever you need us.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Your clinic doesn&apos;t shut down at 5 PM — and neither do we. Our support
          team stays available so your practice keeps running smoothly.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supportChannels.map((channel) => (
          <div
            key={channel.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div
              className={`flex size-11 items-center justify-center rounded-xl ${channel.iconTone}`}
            >
              <channel.icon className="size-5" />
            </div>

            <p className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
              <Sparkles className="size-3 text-primary" />
              {channel.label}
            </p>

            <h3 className="mt-2 text-base font-semibold text-foreground">{channel.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.body}</p>

            <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-success" />
              {channel.availability}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
