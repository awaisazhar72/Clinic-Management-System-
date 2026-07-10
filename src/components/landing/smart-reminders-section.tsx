import {
  Bell,
  CalendarDays,
  RefreshCw,
  Smartphone,
} from "lucide-react";

const reminderFeatures = [
  {
    icon: CalendarDays,
    title: "Appointment reminders",
    body: "Automatic WhatsApp messages sent 24 hours and 2 hours before each appointment.",
    iconTone: "bg-sky-100 text-sky-700",
  },
  {
    icon: RefreshCw,
    title: "Follow-up alerts",
    body: "Remind patients to return for check-ups based on your prescribed follow-up schedule.",
    iconTone: "bg-primary/10 text-primary",
  },
  {
    icon: Bell,
    title: "Medicine reminders",
    body: "Patients get dose reminders on their phone through the patient app.",
    iconTone: "bg-violet-100 text-violet-700",
  },
  {
    icon: Smartphone,
    title: "No-show reduction",
    body: "Clinics using reminders report up to 60% fewer no-shows — more patients, more revenue.",
    iconTone: "bg-orange-100 text-orange-700",
  },
];

const messages = [
  {
    title: "Appointment Reminder",
    text: "Reminder: Your appointment with Dr. Kamran is tomorrow at 10:00 AM at City Care Clinic. Reply CONFIRM to confirm.",
  },
  {
    title: "Medicine Reminder",
    text: "Time for your Metformin dose! Stay on track with your treatment plan — Dr. Aisha.",
  },
  {
    title: "Follow-up Reminder",
    text: "Follow-up due: Dr. Bilal recommends a check-up in 7 days. Book your slot at City Care Clinic.",
  },
];

const stats = [
  { value: "60%", label: "FEWER NO-SHOWS" },
  { value: "3x", label: "PATIENT RETENTION" },
  { value: "100%", label: "AUTO DELIVERY" },
];

function PhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl shadow-black/20">
        <div className="rounded-[1.5rem] bg-card">
          <div className="bg-primary px-4 pb-3 pt-4 text-primary-foreground">
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/30" />
            <p className="text-center text-sm font-semibold">Clinic Management</p>
            <p className="text-center text-[10px] text-primary-foreground/75">Reminders</p>
          </div>

          <div className="space-y-3 bg-muted/40 p-3 pb-5">
            {messages.map((message) => (
              <div
                key={message.title}
                className="rounded-xl border-l-4 border-primary bg-card p-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold text-foreground">{message.title}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SmartRemindersSection() {
  return (
    <section className="mx-auto mt-28 w-full max-w-6xl sm:mt-36">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
          SMART REMINDERS
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Patients never forget.{" "}
          <span className="text-primary">Because you remind them.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Automatic WhatsApp reminders for appointments, medications, and follow-ups —
          sent at the right time. No manual chasing needed.
        </p>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reminderFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-muted/40 p-4"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${feature.iconTone}`}
              >
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>

        <PhoneMock />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-4 py-5 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
