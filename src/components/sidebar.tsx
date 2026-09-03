"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/actions";

type Role = "ADMIN" | "MENTOR" | "STUDENT";

const roleNav: Record<
  Role,
  { href: string; label: string; mobileLabel: string }[]
> = {
  ADMIN: [{ href: "/admin", label: "Admin", mobileLabel: "Admin" }],
  MENTOR: [
    { href: "/mentor", label: "My Students", mobileLabel: "Students" },
  ],
  STUDENT: [
    {
      href: "/student",
      label: "Weekly Reflections",
      mobileLabel: "Reflections",
    },
  ],
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ role, userName }: { role: Role; userName: string }) {
  const pathname = usePathname();
  const items = [
    ...roleNav[role],
    { href: "/profile", label: "Profile", mobileLabel: "Profile" },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col bg-navy px-4 py-6 lg:flex">
        <div className="mb-8 px-2">
          <p className="text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
            Every Nation
          </p>
          <p className="text-lg font-extrabold tracking-tight text-white">
            APPRENTICE
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-cta text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="mb-3 truncate px-2 text-xs text-white/50">
            Signed in as {userName}
          </p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-full bg-white px-3 py-2 text-sm font-bold text-blue hover:bg-white/90"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto bg-navy px-3 py-3 lg:hidden">
        <p className="shrink-0 text-sm font-extrabold tracking-tight text-white">
          APPRENTICE
        </p>
        <nav className="flex shrink-0 items-center gap-0.5">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-bold whitespace-nowrap uppercase ${
                  active ? "bg-cta text-white" : "text-white/70"
                }`}
              >
                {item.mobileLabel}
              </Link>
            );
          })}
          <form action={signOutAction} className="shrink-0">
            <button
              type="submit"
              className="rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-blue"
            >
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </>
  );
}
