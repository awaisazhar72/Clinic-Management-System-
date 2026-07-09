import api from "@/lib/axios";
import type { AuthResponse } from "@/types/auth";
import type { LoginFormValues, RegisterFormValues } from "@/schemas/auth.schema";

export const authService = {
  login: async (payload: LoginFormValues): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterFormValues): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  verifyOtp: async (email: string, code: string): Promise<{ message: string; resetToken?: string }> => {
    const { data } = await api.post("/auth/verify-otp", { email, code });
    return data;
  },

  resetPassword: async (resetToken: string, password: string): Promise<{ message: string }> => {
    const { data } = await api.post("/auth/reset-password", { resetToken, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  me: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};
