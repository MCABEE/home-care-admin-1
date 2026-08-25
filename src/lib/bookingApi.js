import api from "@/lib/api";

export const bookingApi = {
  stats: () => api.get("/bookings/stats"),
  list: ({ page = 1, limit = 5, status } = {}) => api.get("/bookings/", { params: { page, limit, ...(status ? { status } : {}) } }),
  getById: (bookingId) => api.get(`/bookings/${bookingId}`),
  updateStatus: (bookingId, status) => api.patch(`/bookings/${bookingId}/status`, { status }),
};
