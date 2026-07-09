import api from "@/lib/axios";

export const dashboardService = {
  getOverview: async () => {
    const { data } = await api.get("/dashboard/overview");
    return data;
  },
  getRevenue: async (range?: string) => {
    const { data } = await api.get("/dashboard/revenue", { params: { range } });
    return data;
  },
};
