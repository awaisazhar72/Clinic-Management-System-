"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  FileWarning,
  MoreHorizontal,
  Plus,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { DataTable } from "@/components/tables/data-table";
import { StatCard } from "@/components/cards/stat-card";
import { InvoiceFormDialog } from "@/components/forms/invoice-form-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  invoicesMock,
  paymentsMock,
  expensesMock,
  transactionsMock,
  revenueSummary,
} from "@/constants/billing-mock";
import type { Invoice, Payment, Expense, Transaction } from "@/types";
import type { InvoiceFormOutput } from "@/schemas/invoice.schema";

const invoiceStatusVariant: Record<Invoice["status"], "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
};

const methodLabel: Record<Payment["method"], string> = {
  cash: "Cash",
  card: "Card",
  "bank-transfer": "Bank Transfer",
  insurance: "Insurance",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const handleCreateInvoice = (values: InvoiceFormOutput) => {
    const amount = values.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: `p-${Date.now()}`,
      patientName: values.patientName,
      amount,
      status: "pending",
      issuedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dueAt: values.dueAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      items: values.items,
    };
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleMarkPaid = (invoice: Invoice) => {
    setInvoices((prev) => prev.map((i) => (i.id === invoice.id ? { ...i, status: "paid" } : i)));
    toast.success(`Invoice ${invoice.invoiceNumber} marked as paid`);
  };

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      header: "Invoice #",
      accessorKey: "invoiceNumber",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.invoiceNumber}</p>
          <p className="text-xs text-muted-foreground">{row.original.patientName}</p>
        </div>
      ),
    },
    {
      header: "Doctor",
      accessorKey: "doctorName",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.doctorName ? `Dr. ${row.original.doctorName}` : "—"}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{formatCurrency(row.original.amount)}</span>
      ),
    },
    {
      header: "Issued / Due",
      accessorKey: "issuedAt",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.issuedAt} → {row.original.dueAt}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge variant={invoiceStatusVariant[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            {row.original.status !== "paid" && (
              <DropdownMenuItem onClick={() => handleMarkPaid(row.original)}>
                Mark as paid
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const paymentColumns: ColumnDef<Payment>[] = [
    { header: "Invoice #", accessorKey: "invoiceNumber" },
    { header: "Patient", accessorKey: "patientName" },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className="font-medium text-success">{formatCurrency(row.original.amount)}</span>
      ),
    },
    {
      header: "Method",
      accessorKey: "method",
      cell: ({ row }) => <Badge variant="secondary">{methodLabel[row.original.method]}</Badge>,
    },
    { header: "Paid on", accessorKey: "paidAt" },
  ];

  const expenseColumns: ColumnDef<Expense>[] = [
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.description}</p>
          <p className="text-xs text-muted-foreground">{row.original.vendor ?? "—"}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className="font-medium text-destructive">-{formatCurrency(row.original.amount)}</span>
      ),
    },
    { header: "Date", accessorKey: "date" },
  ];

  const transactionColumns: ColumnDef<Transaction>[] = [
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.type === "income" ? (
            <ArrowUpCircle className="size-4 text-success shrink-0" />
          ) : (
            <ArrowDownCircle className="size-4 text-destructive shrink-0" />
          )}
          <div>
            <p className="font-medium text-foreground">{row.original.description}</p>
            <p className="text-xs text-muted-foreground">{row.original.reference}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className={row.original.type === "income" ? "font-medium text-success" : "font-medium text-destructive"}>
          {row.original.type === "income" ? "+" : "-"}
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    { header: "Date", accessorKey: "date" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Billing"
        description="Manage invoices, payments, expenses, and clinic revenue."
        action={
          <Button size="sm" onClick={() => setInvoiceFormOpen(true)}>
            <Plus className="size-4" />
            Create invoice
          </Button>
        }
      />

      {/* Revenue summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(revenueSummary.totalRevenue)} icon={DollarSign} />
        <StatCard label="Total Expenses" value={formatCurrency(revenueSummary.totalExpenses)} icon={Wallet} />
        <StatCard label="Net Profit" value={formatCurrency(revenueSummary.netProfit)} icon={ArrowUpCircle} />
        <StatCard label="Overdue Amount" value={formatCurrency(revenueSummary.overdueAmount)} icon={FileWarning} iconClassName="bg-destructive/10 text-destructive" />
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="pt-4 space-y-4">
          <Card className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by invoice # or patient..."
                className="flex-1"
              />
              <Filter
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { label: "All", value: "all" },
                  { label: "Paid", value: "paid" },
                  { label: "Pending", value: "pending" },
                  { label: "Overdue", value: "overdue" },
                ]}
              />
            </div>
          </Card>
          <DataTable
            columns={invoiceColumns}
            data={filteredInvoices}
            emptyTitle="No invoices found"
            emptyDescription="Try adjusting your search or filters, or create a new invoice."
          />
        </TabsContent>

        <TabsContent value="payments" className="pt-4">
          <DataTable
            columns={paymentColumns}
            data={paymentsMock}
            emptyTitle="No payments recorded"
            emptyDescription="Payments received against invoices will appear here."
          />
        </TabsContent>

        <TabsContent value="expenses" className="pt-4">
          <DataTable
            columns={expenseColumns}
            data={expensesMock}
            emptyTitle="No expenses recorded"
            emptyDescription="Clinic expenses will appear here."
          />
        </TabsContent>

        <TabsContent value="transactions" className="pt-4">
          <DataTable
            columns={transactionColumns}
            data={transactionsMock}
            emptyTitle="No transactions yet"
            emptyDescription="All income and expense transactions will appear here."
          />
        </TabsContent>
      </Tabs>

      <InvoiceFormDialog
        open={invoiceFormOpen}
        onOpenChange={setInvoiceFormOpen}
        onSaved={handleCreateInvoice}
      />
    </div>
  );
}
