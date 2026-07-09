import api from "@/lib/axios";

export const reportService = {
  getPatientReport: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/reports/patients", { params });
    return data;
  },
  getRevenueReport: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/reports/revenue", { params });
    return data;
  },
  getAppointmentReport: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/reports/appointments", { params });
    return data;
  },
  getDoctorPerformanceReport: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/reports/doctors-performance", { params });
    return data;
  },
};
