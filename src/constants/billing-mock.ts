import type { Expense, Invoice, Payment, Transaction } from "@/types";

export const invoicesMock: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0142",
    patientId: "p-1",
    patientName: "Sara Malik",
    doctorName: "Ayesha Khan",
    amount: 145,
    status: "paid",
    issuedAt: "Jul 6, 2026",
    dueAt: "Jul 13, 2026",
    items: [
      { description: "Consultation fee", quantity: 1, unitPrice: 45 },
      { description: "ECG test", quantity: 1, unitPrice: 100 },
    ],
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0143",
    patientId: "p-2",
    patientName: "Bilal Ahmed",
    doctorName: "Usman Tariq",
    amount: 210,
    status: "pending",
    issuedAt: "Jul 4, 2026",
    dueAt: "Jul 18, 2026",
    items: [
      { description: "X-Ray (knee)", quantity: 1, unitPrice: 120 },
      { description: "Consultation fee", quantity: 1, unitPrice: 90 },
    ],
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0144",
    patientId: "p-3",
    patientName: "Hina Farooq",
    doctorName: "Fatima Noor",
    amount: 60,
    status: "overdue",
    issuedAt: "Jun 20, 2026",
    dueAt: "Jun 27, 2026",
    items: [{ description: "Consultation fee", quantity: 1, unitPrice: 60 }],
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0145",
    patientId: "p-5",
    patientName: "Zainab Sheikh",
    doctorName: "Sadia Malik",
    amount: 320,
    status: "paid",
    issuedAt: "Jul 8, 2026",
    dueAt: "Jul 15, 2026",
    items: [
      { description: "Neurology consultation", quantity: 1, unitPrice: 60 },
      { description: "MRI scan", quantity: 1, unitPrice: 260 },
    ],
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-0146",
    patientId: "p-6",
    patientName: "Usman Ghani",
    doctorName: "Ayesha Khan",
    amount: 95,
    status: "pending",
    issuedAt: "Jul 7, 2026",
    dueAt: "Jul 21, 2026",
    items: [{ description: "Follow-up consultation", quantity: 1, unitPrice: 45 }, { description: "Lipid panel", quantity: 1, unitPrice: 50 }],
  },
  {
    id: "inv-6",
    invoiceNumber: "INV-2026-0147",
    patientId: "p-7",
    patientName: "Mahnoor Iqbal",
    doctorName: "Hamza Sheikh",
    amount: 40,
    status: "overdue",
    issuedAt: "Jun 15, 2026",
    dueAt: "Jun 22, 2026",
    items: [{ description: "Dermatology consultation", quantity: 1, unitPrice: 40 }],
  },
];

export const paymentsMock: Payment[] = [
  { id: "pay-1", invoiceNumber: "INV-2026-0142", patientName: "Sara Malik", amount: 145, method: "card", paidAt: "Jul 6, 2026" },
  { id: "pay-2", invoiceNumber: "INV-2026-0145", patientName: "Zainab Sheikh", amount: 320, method: "insurance", paidAt: "Jul 8, 2026" },
  { id: "pay-3", invoiceNumber: "INV-2026-0139", patientName: "Ali Raza", amount: 75, method: "cash", paidAt: "Jul 2, 2026" },
  { id: "pay-4", invoiceNumber: "INV-2026-0136", patientName: "Bilal Ahmed", amount: 150, method: "bank-transfer", paidAt: "Jun 28, 2026" },
];

export const expensesMock: Expense[] = [
  { id: "exp-1", category: "Medical Supplies", description: "Syringes & bandages restock", amount: 320, date: "Jul 5, 2026", vendor: "MedSupply Co." },
  { id: "exp-2", category: "Utilities", description: "Electricity bill - June", amount: 210, date: "Jul 1, 2026", vendor: "K-Electric" },
  { id: "exp-3", category: "Salaries", description: "Nursing staff - June payroll", amount: 4200, date: "Jun 30, 2026" },
  { id: "exp-4", category: "Equipment", description: "ECG machine maintenance", amount: 150, date: "Jun 25, 2026", vendor: "MedTech Services" },
  { id: "exp-5", category: "Rent", description: "Clinic premises - July", amount: 1800, date: "Jul 1, 2026", vendor: "DHA Properties" },
];

export const transactionsMock: Transaction[] = [
  { id: "txn-1", type: "income", description: "Invoice INV-2026-0142 payment", amount: 145, date: "Jul 6, 2026", reference: "INV-2026-0142" },
  { id: "txn-2", type: "expense", description: "Medical supplies restock", amount: 320, date: "Jul 5, 2026", reference: "EXP-0089" },
  { id: "txn-3", type: "income", description: "Invoice INV-2026-0145 payment", amount: 320, date: "Jul 8, 2026", reference: "INV-2026-0145" },
  { id: "txn-4", type: "expense", description: "Electricity bill", amount: 210, date: "Jul 1, 2026", reference: "EXP-0088" },
  { id: "txn-5", type: "expense", description: "Clinic rent - July", amount: 1800, date: "Jul 1, 2026", reference: "EXP-0087" },
  { id: "txn-6", type: "income", description: "Invoice INV-2026-0139 payment", amount: 75, date: "Jul 2, 2026", reference: "INV-2026-0139" },
];

export const revenueSummary = {
  totalRevenue: 18420,
  totalExpenses: 6680,
  netProfit: 11740,
  pendingAmount: invoicesMock
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0),
  overdueAmount: invoicesMock
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0),
};
