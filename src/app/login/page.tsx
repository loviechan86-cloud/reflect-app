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
    <div className="flex min-h-screen flex-col">
      {/* Brand band */}
      <div className="relative flex h-[34vh] min-h-[260px] flex-col items-center justify-center gap-3 overflow-hidden bg-navy px-6 py-8">
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
              "linear-gradient(165deg, rgba(18,54,61,0.92) 0%, rgba(27,74,82,0.85) 55%, rgba(47,109,119,0.80) 140%)",
          }}
        />
        <p className="relative text-xs font-bold tracking-[0.3em] text-white/60 uppercase">
          Every Nation Malaysia
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/apprentice-logo-official.png"
          alt="APPRENTICE"
          className="relative h-24 w-auto sm:h-28 lg:h-32"
        />
        <p className="relative text-sm text-white/50">
          Weekly Reflections — growing deeper, one week at a time.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-sm">
          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-cta uppercase">
            Account Access
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">
            Welcome back
          </h1>
          <p className="mt-2 mb-9 text-sm text-[#5c6e6f]">
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
              <div className="flex items-center gap-2 rounded-xl border border-[#dbe6e4] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(18,54,61,0.04)] transition focus-within:border-cta focus-within:shadow-[0_0_0_4px_rgba(47,109,119,0.12)]">
                <MailIcon />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full text-sm text-navy placeholder:text-[#9db0af] focus:outline-none"
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
              <div className="flex items-center gap-2 rounded-xl border border-[#dbe6e4] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(18,54,61,0.04)] transition focus-within:border-cta focus-within:shadow-[0_0_0_4px_rgba(47,109,119,0.12)]">
                <LockIcon />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full text-sm text-navy placeholder:text-[#9db0af] focus:outline-none"
                />
              </div>
            </div>

            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full cursor-pointer rounded-full bg-cta px-3 py-3 text-sm font-bold text-white uppercase tracking-wide shadow-md transition hover:bg-cta-dark hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 border-t border-[#e2e9e8] pt-5 text-center text-xs text-[#8a9c9b]">
            Forgot your password, or don&rsquo;t have an account?{" "}
            <span className="font-semibold text-[#5c6e6f]">
              Ask your admin.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
