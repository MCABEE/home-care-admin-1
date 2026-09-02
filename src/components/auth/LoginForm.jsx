"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const inputClassName =
  "w-full rounded-xl border border-[#c0c9c3] bg-white/80 py-3 pl-11 pr-4 text-[15px] text-[#1a1c1a] outline-none transition focus:border-[#003629] focus:ring-2 focus:ring-[#9ed1bd] placeholder:text-[#404945]/60";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await login({ email: formData.get("email"), password: formData.get("password") });
      router.push("/dashboard");
    } catch {
      // The store exposes the API error for the form to render.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#1a1c1a]">Email Address</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#404945]">✉</span>
          <input id="email" name="email" type="email" placeholder="admin@homecare.com" required className={inputClassName} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-[#1a1c1a]">Password</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#404945]">🔒</span>
          <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required className={`${inputClassName} pr-11`} />
          <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404945] transition hover:text-[#1a1c1a]">👁</button>
        </div>
      </div>

      {error ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#003629] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b4d3e] hover:shadow-[0_12px_24px_-12px_rgba(0,54,41,0.45)] disabled:cursor-not-allowed disabled:opacity-60">
        {isLoading ? "Signing in..." : "Secure Login"}
        <span aria-hidden="true">→</span>
      </button>

      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5d5f5d]">Authorized personnel only. Secure connection active.</p>
    </form>
  );
}
