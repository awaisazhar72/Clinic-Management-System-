import api from "@/lib/axios";
import type { Doctor, PaginatedResponse } from "@/types";

export const doctorService = {
  list: async (params?: Record<string, unknown>): Promise<PaginatedResponse<Doctor>> => {
    const { data } = await api.get("/doctors", { params });
    return data;
  },
  getById: async (id: string): Promise<Doctor> => {
    const { data } = await api.get(`/doctors/${id}`);
    return data;
  },
  create: async (payload: Partial<Doctor>): Promise<Doctor> => {
    const { data } = await api.post("/doctors", payload);
    return data;
  },
  update: async (id: string, payload: Partial<Doctor>): Promise<Doctor> => {
    const { data } = await api.put(`/doctors/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/doctors/${id}`);
  },
};
