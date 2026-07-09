import { create } from "zustand";
import type { Doctor } from "@/types";

interface DoctorState {
  selectedDoctor: Doctor | null;
  filters: { search: string; specialty?: string };
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setFilters: (filters: Partial<DoctorState["filters"]>) => void;
}

export const useDoctorStore = create<DoctorState>((set) => ({
  selectedDoctor: null,
  filters: { search: "" },
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),
}));
