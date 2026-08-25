import Icon from "./Icon";

const statuses = ["PENDING", "SUCCESS", "CANCELLED"];
const statusStyle = { PENDING: "bg-[#ffb29b] text-[#794532]", SUCCESS: "bg-[#1b5a48] text-[#9ed1bd]", CANCELLED: "bg-[#ffdad6] text-[#93000a]" };
const formatDate = (value) => { if (!value) return { date: "—", time: "" }; const date = new Date(value); return { date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }; };

export default function BookingTable({ bookings, updatingId, onStatusChange, onView }) {
  return <section className="overflow-hidden rounded-[20px] border border-[#e0e3df] bg-white shadow-[0_3px_12px_rgba(24,48,39,0.05)]">
    <div className="hidden grid-cols-12 gap-4 border-b border-[#e0e3df] bg-[#f1f1ef] p-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#53605b] md:grid"><div className="col-span-3">Customer Name</div><div className="col-span-2">Country</div><div className="col-span-2">Contact</div><div className="col-span-2">Date Submitted</div><div className="col-span-2">Status</div><div className="col-span-1 text-right">Action</div></div>
    <div className="divide-y divide-[#e7e9e6]">{bookings.map((booking) => { const date = formatDate(booking.createdAt); const initials = (booking.fullName || "NA").split(" ").map((part) => part[0]).slice(0, 2).join(""); const status = booking.status || "PENDING"; return <div key={booking.id} className="grid gap-4 p-5 transition hover:bg-[#fafbf9] md:grid-cols-12 md:items-center">
      <div className="flex items-center gap-3 md:col-span-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4a4532] font-semibold text-[#f4f3f1]">{initials}</div><div><p className="font-semibold text-[#1a1c1a]">{booking.fullName || "Unnamed customer"}</p><p className="text-sm text-[#59615d]">{booking.landmark || "No landmark provided"}</p></div></div>
      <div className="flex items-center gap-2 text-[#1a1c1a] md:col-span-2"><Icon name="plane" size={19} className="text-[#30433c]" />{booking.currentCountry || "—"}</div><div className="text-[#1a1c1a] md:col-span-2">{booking.contactNumber || booking.whatsappNumber || "—"}</div><div className="text-[#59615d] md:col-span-2">{date.date}<br /><span className="text-xs">{date.time}</span></div>
      <div className="md:col-span-2"><select aria-label={`Change status for ${booking.fullName || "booking"}`} value={status} disabled={updatingId === booking.id} onChange={(event) => onStatusChange(booking.id, event.target.value)} className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${statusStyle[status] || statusStyle.PENDING}`}>{statuses.map((option) => <option key={option} value={option}>{option[0] + option.slice(1).toLowerCase()}</option>)}</select></div>
      <div className="text-right md:col-span-1"><button aria-label={`View details for ${booking.fullName || "booking"}`} onClick={() => onView(booking.id)} className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-[#404945] hover:bg-[#e7f3ee] hover:text-[#003629]"><Icon name="dots" size={20} /></button></div>
    </div>; })}{!bookings.length && <div className="p-10 text-center text-sm text-[#59615d]">No bookings found.</div>}</div>
  </section>;
}
