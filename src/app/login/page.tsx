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

// Tileable torn-paper edges: a fixed-size jagged tile repeated with
// background-size/repeat, so the tooth size stays consistent no matter
// how tall (desktop) or wide (mobile) the panel is.
const TORN_EDGE_COLOR = "%23f4f7fb"; // must match --background literally (data URIs can't read CSS vars)

function TornEdgeVertical() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 lg:block"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='40'%3E%3Cpolygon fill='${TORN_EDGE_COLOR}' points='14,0 6,10 18,20 4,30 14,40 24,40 24,0'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "24px 40px",
      }}
    />
  );
}

function TornEdgeHorizontal() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-6 w-full lg:hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24'%3E%3Cpolygon fill='${TORN_EDGE_COLOR}' points='0,14 10,6 20,18 30,4 40,14 40,24 0,24'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "40px 24px",
      }}
    />
  );
}

function PaperScrap({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: flip ? "scaleX(-1) scaleY(-1)" : undefined }}
    >
      <polygon
        fill="#f4f7fb"
        points="200,0 200,140 182,119 168,144 151,124 133,149 118,127 96,153 82,129 61,156 46,131 24,158 9,134 0,148 0,0"
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
            backgroundImage: "url('/hero-duotone.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.16), transparent 42%), radial-gradient(circle at 88% 92%, rgba(255,255,255,0.10), transparent 48%), linear-gradient(165deg, rgba(18,54,61,0.90) 0%, rgba(27,74,82,0.82) 55%, rgba(47,109,119,0.78) 140%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 140px rgba(0,0,0,0.35)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{
            backgroundImage: "url('/grain-texture.jpg')",
            backgroundSize: "320px auto",
            backgroundRepeat: "repeat",
          }}
        />

        <TornEdgeVertical />
        <TornEdgeHorizontal />

        <PaperScrap className="pointer-events-none absolute -top-3 -right-3 h-28 w-28 -rotate-6 opacity-90 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] lg:h-36 lg:w-36" />
        <PaperScrap
          flip
          className="pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rotate-3 opacity-90 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.2)] lg:h-20 lg:w-20"
        />

        <p className="relative text-xs font-bold tracking-[0.3em] text-white/55 uppercase">
          Every Nation Malaysia
        </p>

        <div className="relative flex flex-1 flex-col items-center justify-center py-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/apprentice-logo-official.png"
            alt="APPRENTICE — Christ-Centred, Spirit-Empowered, Socially Responsible, Mission-Driven"
            className="w-full max-w-[440px] drop-shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
          />
        </div>

        <p className="relative pl-8 text-sm text-white/45 lg:pl-10">
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
