"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";
import { useAuthStore } from "@/store/authStore";

const navItems = [{ label: "Dashboard", href: "/dashboard", icon: "grid" }, { label: "Bookings", href: "/booking", icon: "calendar" }];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => { logout(); router.replace("/"); };
  return <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#c0c9c3]/30 bg-[#faf9f6] shadow-sm"><div className="mb-4 border-b border-[#c0c9c3]/20 bg-[#f4f3f1] p-6 text-center"><div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#9ed1bd] bg-[#dcefe6] text-xl font-semibold text-[#003629]">MN</div><h1 className="text-xl font-semibold text-[#003629]">Marivia Nest</h1><p className="mt-1 text-sm font-medium text-[#404945]">Admin Panel</p></div><nav className="space-y-2 px-4 py-2">{navItems.map((item) => { const active = pathname === item.href || pathname.startsWith(`${item.href}/`); return <Link key={item.label} href={item.href} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${active ? "border-r-4 border-[#003629] bg-[#baeed9]/30 text-[#003629]" : "text-[#404945] hover:bg-[#f4f3f1] hover:text-[#003629]"}`}><Icon name={item.icon} /><span>{item.label}</span></Link>; })}</nav><div className="mt-auto border-t border-[#c0c9c3]/20 p-4"><button onClick={handleLogout} className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium text-[#404945] hover:bg-[#f4f3f1]"><Icon name="logout" />Logout</button></div></aside>;
}
