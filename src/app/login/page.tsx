"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 5.5l7 5.5 7-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="4" y="9" width="12" height="8" rx="1.8" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: null,
  });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="relative flex min-h-[34vh] flex-col items-center justify-center overflow-hidden bg-navy px-6 py-12 lg:min-h-screen lg:w-[44%] lg:px-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 85% 90%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(160deg, var(--color-navy) 0%, var(--color-blue) 55%, var(--color-cta) 140%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* orbit rings behind the mark */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:h-[520px] lg:w-[520px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:h-[380px] lg:w-[380px]" />

        <div className="relative flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-white/60 uppercase">
            Every Nation Malaysia
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/apprentice-mark.png"
            alt="APPRENTICE"
            className="h-16 w-auto lg:h-24"
          />
          <p className="mt-5 max-w-[26ch] text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
            Christ&#8209;Centred · Spirit&#8209;Empowered · Socially
            Responsible · Mission&#8209;Driven
          </p>
        </div>

        <p className="relative mt-10 hidden text-sm text-white/50 lg:block">
          Weekly Reflections — growing deeper, one week at a time.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">
            Welcome back
          </h1>
          <p className="mt-1 mb-8 text-sm text-gray-500">
            Sign in to continue to your reflections.
          </p>

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-blue">
                <MailIcon />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-blue">
                <LockIcon />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
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

          <p className="mt-6 text-center text-xs text-gray-400">
            Forgot your password, or don&rsquo;t have an account?{" "}
            <span className="font-semibold text-gray-500">
              Ask your admin.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
