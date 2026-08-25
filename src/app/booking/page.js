"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/booking/Sidebar";
import Topbar from "@/components/booking/Topbar";
import BookingTable from "@/components/booking/BookingTable";
import Icon from "@/components/booking/Icon";
import BookingDetailsModal from "@/components/booking/BookingDetailsModal";
import { useBookingStore } from "@/store/bookingStore";
import AuthGuard from "@/components/auth/AuthGuard";

export default function BookingPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { bookings, pagination, isLoading, updatingId, error, fetchBookings, updateStatus, fetchBooking, clearSelectedBooking, selectedBooking, detailLoading, detailError } = useBookingStore();
  const bookingsFetched = useRef(false);
  useEffect(() => {
    if (bookingsFetched.current) return;
    bookingsFetched.current = true;
    fetchBookings(1);
  }, [fetchBookings]);
  const visibleBookings = bookings;
  const firstItem = pagination.total ? ((pagination.page - 1) * pagination.limit) + 1 : 0;
  const lastItem = Math.min(pagination.page * pagination.limit, pagination.total || visibleBookings.length);

  return <AuthGuard><div className="min-h-screen bg-[#f4f3f1] text-[#1a1c1a]"><Sidebar /><div className="ml-64"><Topbar /><main className="px-5 py-10 sm:px-8 lg:px-10"><div className="mb-10"><h2 className="font-display text-4xl font-bold tracking-tight text-[#1a1c1a] sm:text-[46px]">Booking Management</h2><p className="mt-3 max-w-3xl text-base leading-relaxed text-[#59615d]">Monitor and manage all home care service requests from NRK property owners. Review status, contact details, and coordinate care efficiently.</p></div>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e0e3df] bg-white p-5 shadow-[0_3px_12px_rgba(24,48,39,0.05)]"><div className="flex flex-wrap items-center gap-4"><div className="flex items-center gap-2 text-[#404945]"><Icon name="filter" className="text-[#30433c]" /><span className="text-sm font-semibold">Filter by:</span></div><select value={statusFilter} onChange={(event) => { const value = event.target.value; setStatusFilter(value); fetchBookings(1, value === "ALL" ? "" : value); }} className="min-w-[150px] rounded-lg border border-[#c0c9c3]/60 bg-white px-3 py-2 text-sm text-[#1a1c1a] outline-none focus:border-[#003629] focus:ring-2 focus:ring-[#9ed1bd]"><option value="ALL">All Statuses</option><option value="PENDING">Pending</option><option value="SUCCESS">Success</option><option value="CANCELLED">Cancelled</option></select></div><div className="text-sm font-semibold text-[#404945]">Showing {firstItem}-{lastItem} of {pagination.total || visibleBookings.length} requests</div></div>
    {error && <div className="mb-4 rounded-xl border border-[#ffb8ae] bg-[#fff0ed] px-4 py-3 text-sm text-[#93000a]">{error}</div>}
    {isLoading ? <div className="rounded-[20px] bg-white p-12 text-center text-[#59615d]">Loading bookings...</div> : <BookingTable bookings={visibleBookings} updatingId={updatingId} onStatusChange={updateStatus} onView={fetchBooking} />}
    {pagination.totalPages > 1 && <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#e0e3df] bg-white px-5 py-4"><button disabled={pagination.page <= 1 || isLoading} onClick={() => fetchBookings(pagination.page - 1)} className="rounded-lg px-3 py-2 text-sm font-medium text-[#59615d] hover:bg-[#f1f1ef] disabled:cursor-not-allowed disabled:opacity-40">Previous</button><div className="flex items-center gap-2">{Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => fetchBookings(page)} className={`h-9 w-9 rounded-full text-sm font-semibold ${page === pagination.page ? "bg-[#003629] text-white" : "text-[#404945] hover:bg-[#e7f3ee]"}`}>{page}</button>)}</div><button disabled={pagination.page >= pagination.totalPages || isLoading} onClick={() => fetchBookings(pagination.page + 1)} className="rounded-lg px-3 py-2 text-sm font-medium text-[#59615d] hover:bg-[#f1f1ef] disabled:cursor-not-allowed disabled:opacity-40">Next</button></div>}
  </main></div><BookingDetailsModal booking={selectedBooking} isLoading={detailLoading} error={detailError} onClose={clearSelectedBooking} /></div></AuthGuard>;
}
