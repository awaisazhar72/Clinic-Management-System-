const lineItems = [
  { name: "Panadol 500mg", qty: 2, price: 25 },
  { name: "Augmentin 625mg", qty: 1, price: 45 },
];

export function PosCounterMock() {
  const subtotal = lineItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Smart POS Counter
        </p>
        <p className="text-xs text-muted-foreground">Walk-in sale · Counter #1</p>
      </div>

      <div className="grid min-h-[280px] grid-cols-1 sm:grid-cols-[1fr_140px] sm:min-h-[320px]">
        <div className="border-b border-border p-3 sm:border-b-0 sm:border-r">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-border pb-2 text-[10px] font-semibold text-muted-foreground">
            <span>Item</span>
            <span>Qty</span>
            <span>Total</span>
          </div>
          <ul className="mt-2 space-y-2">
            {lineItems.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[1fr_auto_auto] gap-2 text-xs text-foreground"
              >
                <span className="truncate">{item.name}</span>
                <span className="text-muted-foreground">{item.qty}</span>
                <span className="font-medium">Rs {item.qty * item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between p-4">
          <div>
            <p className="text-[10px] text-muted-foreground">Amount due</p>
            <p className="text-2xl font-bold text-primary">Rs {subtotal}</p>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground"
          >
            Proceed to pay
          </button>
        </div>
      </div>
    </div>
  );
}
