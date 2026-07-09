import api from "@/lib/axios";
import type { Invoice, PaginatedResponse } from "@/types";

export const billingService = {
  listInvoices: async (params?: Record<string, unknown>): Promise<PaginatedResponse<Invoice>> => {
    const { data } = await api.get("/billing/invoices", { params });
    return data;
  },
  getInvoice: async (id: string): Promise<Invoice> => {
    const { data } = await api.get(`/billing/invoices/${id}`);
    return data;
  },
  createInvoice: async (payload: Partial<Invoice>): Promise<Invoice> => {
    const { data } = await api.post("/billing/invoices", payload);
    return data;
  },
  markPaid: async (id: string): Promise<Invoice> => {
    const { data } = await api.patch(`/billing/invoices/${id}/pay`);
    return data;
  },
};
