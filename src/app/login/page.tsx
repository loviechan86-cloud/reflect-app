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

function GlobeWireframe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      fill="none"
      stroke="white"
      strokeOpacity="0.22"
      strokeWidth="1"
    >
      <ellipse cx="200" cy="120" rx="190" ry="110" />
      <ellipse cx="200" cy="120" rx="80" ry="110" />
      <ellipse cx="200" cy="120" rx="140" ry="110" />
      <ellipse cx="200" cy="120" rx="190" ry="46" />
      <ellipse cx="200" cy="120" rx="190" ry="78" />
      <line x1="10" y1="120" x2="390" y2="120" />
    </svg>
  );
}

function TornEdgeVertical() {
  return (
    <svg
      viewBox="0 0 24 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 text-background lg:block"
    >
      <polygon
        fill="currentColor"
        points="14,0 6,28 19,52 3,80 17,108 8,140 21,168 4,196 16,224 9,252 22,280 5,308 18,336 7,364 15,392 13,400 24,400 24,0"
      />
    </svg>
  );
}

function TornEdgeHorizontal() {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-6 w-full text-background lg:hidden"
    >
      <polygon
        fill="currentColor"
        points="0,14 28,6 52,19 80,3 108,17 140,8 168,21 196,4 224,16 252,9 280,22 308,5 336,18 364,7 392,15 400,13 400,24 0,24"
      />
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
      <div className="relative flex min-h-[46vh] flex-col overflow-hidden bg-navy px-8 py-10 lg:min-h-screen lg:w-[46%] lg:px-14 lg:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.14), transparent 42%), radial-gradient(circle at 88% 92%, rgba(255,255,255,0.10), transparent 48%), linear-gradient(160deg, var(--color-navy) 0%, var(--color-blue) 55%, var(--color-cta) 145%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 140px rgba(0,0,0,0.35)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <TornEdgeVertical />
        <TornEdgeHorizontal />

        <p className="relative text-xs font-bold tracking-[0.3em] text-white/55 uppercase">
          Every Nation Malaysia
        </p>

        <div className="relative flex flex-1 flex-col items-center justify-center py-6 text-center">
          <div className="relative flex w-full max-w-[420px] items-center justify-center">
            <GlobeWireframe className="w-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/apprentice-wordmark.png"
              alt="APPRENTICE"
              className="absolute w-[78%] drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
            />
          </div>
          <div className="mt-6 h-px w-14 bg-white/25" />
          <p className="mt-5 max-w-[30ch] text-[11px] font-semibold leading-relaxed tracking-[0.16em] text-white/60 uppercase">
            Christ&#8209;Centred · Spirit&#8209;Empowered · Socially
            Responsible · Mission&#8209;Driven
          </p>
        </div>

        <p className="relative text-sm text-white/45">
          Weekly Reflections — growing deeper, one week at a time.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-14 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-5 h-1.5 w-10 rounded-full bg-cta" />
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">
            Welcome back
          </h1>
          <p className="mt-2 mb-9 text-sm text-gray-500">
            Sign in to continue to your reflections.
          </p>

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-bold text-navy"
              >
                Email
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 shadow-sm transition focus-within:border-blue focus-within:ring-4 focus-within:ring-blue/10">
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
                className="mb-1.5 block text-sm font-bold text-navy"
              >
                Password
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 shadow-sm transition focus-within:border-blue focus-within:ring-4 focus-within:ring-blue/10">
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
              className="w-full rounded-full bg-cta px-3 py-3 text-sm font-bold text-white uppercase tracking-wide shadow-md transition hover:bg-cta-dark hover:shadow-lg disabled:opacity-50"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
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
