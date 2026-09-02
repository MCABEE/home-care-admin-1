import Icon from "./Icon";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e3e2e0] bg-[#faf9f6]/95 px-6 backdrop-blur-md lg:px-10">
      <div className="flex items-center gap-4">
        <span className="font-display hidden text-[29px] font-bold text-[#003629] md:block">
          Marivia Nest Admin
        </span>
        <label className="relative hidden w-80 md:block">
          <Icon name="search" size={21} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#53605b]" />
          <input
            className="w-full rounded-xl border border-[#d3d8d4] bg-[#f1f1ef] py-3 pl-12 pr-4 text-base text-[#1a1c1a] outline-none transition focus:border-[#003629] focus:ring-2 focus:ring-[#9ed1bd]"
            placeholder="Search bookings..."
            type="text"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#404945] transition hover:bg-[#f4f3f1] hover:text-[#003629]">
          <Icon name="bell" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#404945] transition hover:bg-[#f4f3f1] hover:text-[#003629]">
          <Icon name="help" />
        </button>
        <div className="ml-2 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#c0c9c3]/40 bg-[#e7f3ee] text-sm font-semibold text-[#003629]">
          AD
        </div>
      </div>
    </header>
  );
}
