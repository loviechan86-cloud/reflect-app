"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: null,
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(255,255,255,0.10), transparent 45%), radial-gradient(circle at 85% 90%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(155deg, var(--color-navy) 0%, var(--color-blue) 55%, var(--color-cta) 130%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mb-7 flex flex-col items-center text-center">
        <p className="mb-2 text-sm font-bold tracking-[0.2em] text-white/70 uppercase">
          Every Nation Malaysia
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/apprentice-mark.png"
          alt="APPRENTICE"
          className="h-20 w-auto drop-shadow-sm"
        />
        <p className="mt-2 text-sm text-white/60">Weekly Reflections</p>
      </div>

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="h-2 bg-cta" />
        <div className="p-8">
          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
            </div>

            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-cta px-3 py-2.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
