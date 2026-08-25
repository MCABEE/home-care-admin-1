import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.homecare.mcabee.in/api/admin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const isAuthRequest = config.url?.startsWith("/auth");

  if (!isAuthRequest && typeof window !== "undefined") {
    try {
      const storedAuth = window.localStorage.getItem("home-care-admin-auth");
      const authState = storedAuth ? JSON.parse(storedAuth) : null;
      const token = authState?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Ignore malformed local storage and let the API return its auth error.
    }
  }

  return config;
});

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
};

export default api;
