"use client";

import { create } from "zustand";
import { bookingApi } from "@/lib/bookingApi";

const getMessage = (error) => error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong.";

export const useBookingStore = create((set, get) => ({
  bookings: [], stats: { all: 0, pending: 0, success: 0, cancelled: 0 }, pagination: { page: 1, limit: 5, total: 0, totalPages: 0 }, activeStatus: "", isLoading: false, statsLoading: false, detailLoading: false, detailError: null, selectedBooking: null, updatingId: null, error: null,
  fetchStats: async () => {
    set({ statsLoading: true, error: null });
    try {
      const response = await bookingApi.stats();
      set({ stats: { all: 0, pending: 0, success: 0, cancelled: 0, ...(response.data?.data ?? {}) }, statsLoading: false });
    } catch (error) { set({ statsLoading: false, error: getMessage(error) }); }
  },
  fetchBookings: async (page = 1, status = get().activeStatus) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bookingApi.list({ page, limit: get().pagination.limit, status });
      const payload = response.data ?? {};
      set({ bookings: payload.data ?? [], activeStatus: status, pagination: { page, limit: get().pagination.limit, ...(payload.pagination ?? {}) }, isLoading: false });
    } catch (error) { set({ isLoading: false, error: getMessage(error) }); }
  },
  fetchBooking: async (bookingId) => {
    set({ detailLoading: true, detailError: null, selectedBooking: null });
    try {
      const response = await bookingApi.getById(bookingId);
      set({ selectedBooking: response.data?.data ?? null, detailLoading: false });
    } catch (error) { set({ detailLoading: false, detailError: getMessage(error) }); }
  },
  clearSelectedBooking: () => set({ selectedBooking: null, detailError: null }),
  updateStatus: async (bookingId, status) => {
    set({ updatingId: bookingId, error: null });
    try {
      await bookingApi.updateStatus(bookingId, status);
      set((state) => ({ updatingId: null, bookings: state.bookings.map((booking) => booking.id === bookingId ? { ...booking, status } : booking) }));
    } catch (error) { set({ updatingId: null, error: getMessage(error) }); }
  },
}));
