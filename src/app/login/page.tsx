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

const VERTICAL_TEAR_POINTS =
  "6.9,0.0 5.2,2.9 6.4,5.7 5.0,8.6 8.4,11.4 13.2,14.3 15.5,17.1 21.0,20.0 23.7,22.9 25.0,25.7 20.4,28.6 21.0,31.4 19.9,34.3 25.6,37.1 27.5,40.0 26.8,42.9 34,45.7 34,48.6 31.7,51.4 28.2,54.3 21.1,57.1 16.0,60.0 15.7,62.9 11.3,65.7 11.9,68.6 12.8,71.4 12.0,74.3 13.9,77.1 11.8,80.0 11.1,82.9 6.2,85.7 4.7,88.6 3.5,91.4 6.1,94.3 8.4,97.1 11.8,100.0 20.0,102.9 22.9,105.7 23.3,108.6 22.5,111.4 19.7,114.3 19.0,117.1 20.4,120.0 21.5,122.9 28.8,125.7 29.9,128.6 34,131.4 32.0,134.3 33.3,137.1 29.1,140.0 19.9,142.9 17.3,145.7 18.8,148.6 15.3,151.4 18.5,154.3 15.7,157.1 13.6,160.0 15.4,162.9 13.5,165.7 7.0,168.6 2.7,171.4 2.2,174.3 6.0,177.1 7.0,180.0 7.0,182.9 11.9,185.7 14.5,188.6 16.4,191.4 21.3,194.3 17.4,197.1 6.9,200 36,200 36,0";

const HORIZONTAL_TEAR_POINTS =
  "0.0,6.9 2.9,5.2 5.7,6.4 8.6,5.0 11.4,8.4 14.3,13.2 17.1,15.5 20.0,21.0 22.9,23.7 25.7,25.0 28.6,20.4 31.4,21.0 34.3,19.9 37.1,25.6 40.0,27.5 42.9,26.8 45.7,34 48.6,34 51.4,31.7 54.3,28.2 57.1,21.1 60.0,16.0 62.9,15.7 65.7,11.3 68.6,11.9 71.4,12.8 74.3,12.0 77.1,13.9 80.0,11.8 82.9,11.1 85.7,6.2 88.6,4.7 91.4,3.5 94.3,6.1 97.1,8.4 100.0,11.8 102.9,20.0 105.7,22.9 108.6,23.3 111.4,22.5 114.3,19.7 117.1,19.0 120.0,20.4 122.9,21.5 125.7,28.8 128.6,29.9 131.4,34 134.3,32.0 137.1,33.3 140.0,29.1 142.9,19.9 145.7,17.3 148.6,18.8 151.4,15.3 154.3,18.5 157.1,15.7 160.0,13.6 162.9,15.4 165.7,13.5 168.6,7.0 171.4,2.7 174.3,2.2 177.1,6.0 180.0,7.0 182.9,7.0 185.7,11.9 188.6,14.5 191.4,16.4 194.3,21.3 197.1,17.4 200,6.9 200,36 0,36";

function TornEdgeVertical() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-9 lg:block"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='200'%3E%3Cpolygon fill='${TORN_EDGE_COLOR}' points='${VERTICAL_TEAR_POINTS}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "36px 200px",
      }}
    />
  );
}

function TornEdgeHorizontal() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-9 w-full lg:hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='36'%3E%3Cpolygon fill='${TORN_EDGE_COLOR}' points='${HORIZONTAL_TEAR_POINTS}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "200px 36px",
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
