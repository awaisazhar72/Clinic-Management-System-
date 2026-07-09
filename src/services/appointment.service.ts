import api from "@/lib/axios";
import type { Appointment, PaginatedResponse } from "@/types";

export const appointmentService = {
  list: async (params?: Record<string, unknown>): Promise<PaginatedResponse<Appointment>> => {
    const { data } = await api.get("/appointments", { params });
    return data;
  },
  getById: async (id: string): Promise<Appointment> => {
    const { data } = await api.get(`/appointments/${id}`);
    return data;
  },
  create: async (payload: Partial<Appointment>): Promise<Appointment> => {
    const { data } = await api.post("/appointments", payload);
    return data;
  },
  update: async (id: string, payload: Partial<Appointment>): Promise<Appointment> => {
    const { data } = await api.put(`/appointments/${id}`, payload);
    return data;
  },
  cancel: async (id: string): Promise<void> => {
    await api.patch(`/appointments/${id}/cancel`);
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};
