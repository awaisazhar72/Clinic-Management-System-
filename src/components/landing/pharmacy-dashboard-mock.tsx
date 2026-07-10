export function PharmacyDashboardMock() {
  const stats = [
    { label: "Total Medicines", value: "101" },
    { label: "Low Stock", value: "3" },
    { label: "Expiring Soon", value: "8" },
    { label: "Out of Stock", value: "0" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5">
      <div className="flex min-h-[280px] sm:min-h-[320px]">
        <aside className="hidden w-36 shrink-0 border-r border-border bg-muted/40 p-3 sm:block">
          <p className="text-[10px] font-semibold text-primary">Pharmacy</p>
          <ul className="mt-3 space-y-2 text-[10px] text-muted-foreground">
            <li className="rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">Dashboard</li>
            <li className="px-2 py-1">Inventory</li>
            <li className="px-2 py-1">Billing</li>
            <li className="px-2 py-1">Reports</li>
          </ul>
        </aside>

        <div className="flex-1 p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Pharmacy Intelligence
          </p>
          <h3 className="mt-1 text-sm font-bold text-foreground sm:text-base">
            Real-time stock & sales overview
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-background px-2 py-3 text-center"
              >
                <p className="text-lg font-bold text-primary sm:text-xl">{item.value}</p>
                <p className="mt-0.5 text-[9px] leading-tight text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="h-20 rounded-lg border border-dashed border-border bg-muted/30" />
            <div className="h-20 rounded-lg border border-dashed border-border bg-muted/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
