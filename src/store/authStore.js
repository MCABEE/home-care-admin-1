import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api";

const getAuthData = (response) => {
  const payload = response?.data ?? {};
  const data = payload?.data ?? payload;

  return {
    user: data?.user ?? data?.admin ?? null,
    token: data?.token ?? data?.access_token ?? data?.accessToken ?? null,
    response: payload,
  };
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      response: null,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.login(credentials);
          const authData = getAuthData(result);
          set({ ...authData, isLoading: false, error: null });
          return authData;
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || error.message || "Unable to sign in. Please try again.";
          set({ isLoading: false, error: message });
          throw error;
        }
      },
      logout: () => set({ user: null, token: null, response: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "home-care-admin-auth",
      partialize: (state) => ({ user: state.user, token: state.token, response: state.response }),
    },
  ),
);
