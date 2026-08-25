import Icon from "./Icon";

const formatDate = (value) => value ? new Date(value).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "—";

export default function BookingDetailsModal({ booking, isLoading, error, onClose }) {
  if (!booking && !isLoading && !error) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1c1a]/40 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section role="dialog" aria-modal="true" aria-labelledby="booking-details-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#faf9f6] p-6 shadow-2xl sm:p-8">
      <div className="flex items-start justify-between border-b border-[#e0e3df] pb-5"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#597067]">Booking details</p><h2 id="booking-details-title" className="font-display mt-1 text-3xl font-bold text-[#1a1c1a]">{booking?.fullName || "Loading booking"}</h2></div><button aria-label="Close booking details" onClick={onClose} className="rounded-full p-2 text-2xl leading-none text-[#59615d] hover:bg-[#e7e9e6]">×</button></div>
      {isLoading && <div className="p-10 text-center text-[#59615d]">Loading booking details...</div>}
      {error && <div className="mt-6 rounded-xl border border-[#ffb8ae] bg-[#fff0ed] px-4 py-3 text-sm text-[#93000a]">{error}</div>}
      {booking && <div className="mt-6 grid gap-4 sm:grid-cols-2">{[["Full name", booking.fullName], ["Current country", booking.currentCountry], ["Contact number", booking.contactNumber], ["WhatsApp number", booking.whatsappNumber], ["Residential address", booking.residentialAddress], ["Landmark", booking.landmark], ["Status", booking.status || "PENDING"], ["Submitted", formatDate(booking.createdAt)], ["Last updated", formatDate(booking.updatedAt)]].map(([label, value]) => <div key={label} className={`${label === "Residential address" ? "sm:col-span-2" : ""} rounded-xl border border-[#e0e3df] bg-white p-4`}><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#718079]">{label}</p><p className="mt-1 break-words text-sm font-medium text-[#1a1c1a]">{value || "—"}</p></div>)}</div>}
    </section>
  </div>;
}
