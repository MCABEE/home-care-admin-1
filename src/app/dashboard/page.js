"use client";

import { useEffect, useRef } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/booking/Sidebar";
import Topbar from "@/components/booking/Topbar";
import Icon from "@/components/booking/Icon";
import { useBookingStore } from "@/store/bookingStore";

export default function DashboardPage() {
  const { stats, statsLoading, error, fetchStats } = useBookingStore();
  const statsFetched = useRef(false);
  useEffect(() => {
    if (statsFetched.current) return;
    statsFetched.current = true;
    fetchStats();
  }, [fetchStats]);

  const metrics = [
    { label: "Total bookings", value: stats.all, note: "Across all requests", icon: "calendar", tone: "bg-[#dcefe6] text-[#003629]" },
    { label: "Pending bookings", value: stats.pending, note: "Needs your attention", icon: "chart", tone: "bg-[#ffe1d7] text-[#794532]" },
    { label: "Successful bookings", value: stats.success, note: "Completed successfully", icon: "grid", tone: "bg-[#e6eee5] text-[#1b5a48]" },
  ];

  return <AuthGuard><div className="min-h-screen bg-[#f4f3f1] text-[#1a1c1a]"><Sidebar /><div className="ml-64"><Topbar /><main className="px-5 py-10 sm:px-8 lg:px-10">
    <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#597067]">Overview</p><h1 className="font-display mt-2 text-4xl font-bold tracking-tight text-[#1a1c1a] sm:text-[46px]">Welcome back, Admin</h1><p className="mt-3 max-w-2xl text-base leading-relaxed text-[#59615d]">Here is what is happening with your home care service requests today.</p></div>
    {error && <div className="mb-5 rounded-xl border border-[#ffb8ae] bg-[#fff0ed] px-4 py-3 text-sm text-[#93000a]">{error}</div>}
    <div className="grid gap-5 lg:grid-cols-3">{metrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-[#e0e3df] bg-white p-6 shadow-[0_3px_12px_rgba(24,48,39,0.05)]"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-[#59615d]">{metric.label}</p><p className="mt-4 text-4xl font-bold text-[#003629]">{statsLoading ? "—" : metric.value}</p></div><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.tone}`}><Icon name={metric.icon} /></div></div><p className="mt-5 text-xs font-medium text-[#718079]">{metric.note}</p></div>)}</div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]"><section className="rounded-2xl border border-[#e0e3df] bg-white p-6 shadow-[0_3px_12px_rgba(24,48,39,0.05)]"><div className="flex items-center justify-between"><div><h2 className="font-display text-2xl font-bold">Recent activity</h2><p className="mt-1 text-sm text-[#718079]">Latest updates from your booking queue</p></div><span className="rounded-full bg-[#dcefe6] px-3 py-1 text-xs font-semibold text-[#1b5a48]">Live</span></div><div className="mt-6 space-y-4">{["New booking request received", "Booking status updated to Success", "Customer details were reviewed"].map((item, index) => <div key={item} className="flex items-center gap-4 border-t border-[#edf0ed] pt-4"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${index === 0 ? "bg-[#ffe1d7] text-[#794532]" : "bg-[#dcefe6] text-[#003629]"}`}><Icon name={index === 0 ? "calendar" : "grid"} size={17} /></span><div><p className="text-sm font-semibold text-[#1a1c1a]">{item}</p><p className="mt-1 text-xs text-[#718079]">{index + 1} hours ago</p></div></div>)}</div></section><section className="rounded-2xl bg-[#003629] p-7 text-white shadow-[0_15px_30px_-18px_rgba(0,54,41,0.8)]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9ed1bd]">Quick action</p><h2 className="font-display mt-4 text-3xl font-bold">Keep your care queue moving.</h2><p className="mt-3 text-sm leading-relaxed text-[#d4e7df]">Review pending requests and keep property owners updated on their service bookings.</p><a href="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#003629] hover:bg-[#e7f3ee]">View bookings <span aria-hidden="true">→</span></a></section></div>
  </main></div></div></AuthGuard>;
}
