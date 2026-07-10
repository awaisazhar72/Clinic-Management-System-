export function PracticeDoneRightSection() {
  return (
    <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 overflow-hidden bg-slate-50 py-20 sm:mt-36 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
          Practice management software,
          <span className="block">done right</span>
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Most health and wellness software fails. Old designs, slow speeds, and
          difficult interfaces — we are changing all that. With a modern approach,
          we bring fast, superior tools to clinics so you can work with peace of mind.
        </p>
      </div>
    </section>
  );
}
