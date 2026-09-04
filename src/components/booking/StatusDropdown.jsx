"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const statuses = ["PENDING", "SUCCESS", "CANCELLED"];

const statusConfig = {
  PENDING: {
    label: "Pending",
    pill: "bg-[#ffb29b] text-[#794532]",
    dot: "bg-[#ffb29b]",
    menu: "text-[#794532] hover:bg-[#fff0eb]",
    active: "bg-[#fff0eb] font-semibold",
  },
  SUCCESS: {
    label: "Success",
    pill: "bg-[#1b5a48] text-[#9ed1bd]",
    dot: "bg-[#1b5a48]",
    menu: "text-[#1b5a48] hover:bg-[#e7f3ee]",
    active: "bg-[#e7f3ee] font-semibold",
  },
  CANCELLED: {
    label: "Cancelled",
    pill: "bg-[#ffdad6] text-[#93000a]",
    dot: "bg-[#ff9a94]",
    menu: "text-[#93000a] hover:bg-[#fff0ed]",
    active: "bg-[#fff0ed] font-semibold",
  },
};

export default function StatusDropdown({ value, disabled, onChange, label }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = statusConfig[value] || statusConfig.PENDING;

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex min-w-[132px] items-center justify-between gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 ${current.pill}`}
      >
        <span>{current.label}</span>
        <Icon
          name="chevron"
          size={14}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-full overflow-hidden rounded-xl border border-[#e0e3df] bg-white py-1 shadow-[0_12px_32px_-8px_rgba(24,48,39,0.18)]"
        >
          {statuses.map((status) => {
            const option = statusConfig[status];
            const selected = status === value;

            return (
              <li key={status} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    if (status !== value) onChange(status);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition ${option.menu} ${selected ? option.active : ""}`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${option.dot}`} />
                  <span className="flex-1">{option.label}</span>
                  {selected ? <Icon name="check" size={14} className="opacity-70" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
