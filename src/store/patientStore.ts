import { create } from "zustand";
import type { Patient } from "@/types";

interface PatientState {
  selectedPatient: Patient | null;
  filters: { search: string; gender?: string };
  setSelectedPatient: (patient: Patient | null) => void;
  setFilters: (filters: Partial<PatientState["filters"]>) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  selectedPatient: null,
  filters: { search: "" },
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),
}));
