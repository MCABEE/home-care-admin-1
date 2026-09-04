import Icon from "./Icon";

const activityConfig = {
  PENDING: {
    message: (name) => `New booking request from ${name}`,
    icon: "calendar",
    tone: "bg-[#ffe1d7] text-[#794532]",
  },
  SUCCESS: {
    message: (name) => `Booking for ${name} marked as success`,
    icon: "grid",
    tone: "bg-[#dcefe6] text-[#003629]",
  },
  CANCELLED: {
    message: (name) => `Booking for ${name} was cancelled`,
    icon: "chart",
    tone: "bg-[#ffdad6] text-[#93000a]",
  },
};

function formatRelativeTime(value) {
  if (!value) return "—";

  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function toActivityItem(booking) {
  const status = booking.status || "PENDING";
  const config = activityConfig[status] || activityConfig.PENDING;
  const name = booking.fullName || "Unknown customer";

  return {
    id: booking.id,
    message: config.message(name),
    time: formatRelativeTime(booking.createdAt),
    icon: config.icon,
    tone: config.tone,
  };
}

export default function RecentActivity({ bookings, isLoading }) {
  const items = bookings.map(toActivityItem);

  return (
    <section className="rounded-2xl border border-[#e0e3df] bg-white p-6 shadow-[0_3px_12px_rgba(24,48,39,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Recent activity</h2>
          <p className="mt-1 text-sm text-[#718079]">Latest updates from your booking queue</p>
        </div>
        <span className="rounded-full bg-[#dcefe6] px-3 py-1 text-xs font-semibold text-[#1b5a48]">Live</span>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p className="py-6 text-center text-sm text-[#718079]">Loading recent activity...</p>
        ) : items.length ? (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-t border-[#edf0ed] pt-4 first:border-t-0 first:pt-0">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${item.tone}`}>
                <Icon name={item.icon} size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1a1c1a]">{item.message}</p>
                <p className="mt-1 text-xs text-[#718079]">{item.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-sm text-[#718079]">No recent booking activity yet.</p>
        )}
      </div>
    </section>
  );
}
