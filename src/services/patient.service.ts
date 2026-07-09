import api from "@/lib/axios";
import type { Patient, PaginatedResponse } from "@/types";

export const patientService = {
  list: async (params?: Record<string, unknown>): Promise<PaginatedResponse<Patient>> => {
    const { data } = await api.get("/patients", { params });
    return data;
  },
  getById: async (id: string): Promise<Patient> => {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },
  create: async (payload: Partial<Patient>): Promise<Patient> => {
    const { data } = await api.post("/patients", payload);
    return data;
  },
  update: async (id: string, payload: Partial<Patient>): Promise<Patient> => {
    const { data } = await api.put(`/patients/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/patients/${id}`);
  },
};
