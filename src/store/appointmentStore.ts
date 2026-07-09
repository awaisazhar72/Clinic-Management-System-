import { create } from "zustand";
import type { Appointment } from "@/types";

interface AppointmentState {
  selectedAppointment: Appointment | null;
  view: "calendar" | "table";
  setSelectedAppointment: (appointment: Appointment | null) => void;
  setView: (view: "calendar" | "table") => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  selectedAppointment: null,
  view: "calendar",
  setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),
  setView: (view) => set({ view }),
}));
