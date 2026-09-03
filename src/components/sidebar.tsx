"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/actions";

type Role = "STAFF" | "STUDENT";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="4" rx="1.5" />
      <rect x="11" y="8" width="7" height="10" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function StudentsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="7" cy="6" r="2.5" />
      <path d="M2 17c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
      <circle cx="14.5" cy="7" r="2" />
      <path
        d="M12 5.2c.5-.6 1.2-1 2-1 1.4 0 2.5 1.1 2.5 2.5"
        strokeLinecap="round"
      />
      <path d="M13 12.5c2.3.4 4 2.3 4 4.5" strokeLinecap="round" />
    </svg>
  );
}

function ReflectionsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M3 4.5h14v9H8l-3.5 3v-3H3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M6.5 8h7M6.5 10.7h4.5" strokeLinecap="round" />
    </svg>
  );
}

function StaffIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2.5" y="4" width="15" height="12" rx="2" />
      <circle cx="7.5" cy="9.5" r="1.8" />
      <path d="M4.8 13.5c.4-1.5 1.6-2.3 2.7-2.3s2.3.8 2.7 2.3" strokeLinecap="round" />
      <path d="M12.5 8h3M12.5 11h3" strokeLinecap="round" />
    </svg>
  );
}

const roleNav: Record<
  Role,
  {
    href: string;
    label: string;
    mobileLabel: string;
    icon: () => React.ReactElement;
  }[]
> = {
  STAFF: [
    {
      href: "/dashboard",
      label: "Dashboard",
      mobileLabel: "Dashboard",
      icon: DashboardIcon,
    },
    {
      href: "/students",
      label: "Students",
      mobileLabel: "Students",
      icon: StudentsIcon,
    },
    {
      href: "/reflections",
      label: "Reflection",
      mobileLabel: "Reflection",
      icon: ReflectionsIcon,
    },
    { href: "/staff", label: "Staff", mobileLabel: "Staff", icon: StaffIcon },
  ],
  STUDENT: [
    {
      href: "/student",
      label: "Weekly Reflections",
      mobileLabel: "Reflections",
      icon: ReflectionsIcon,
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
    { href: "/profile", label: "Profile", mobileLabel: "Profile", icon: undefined },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col bg-navy px-4 py-6 lg:flex">
        <div className="mb-1 px-2">
          <p className="text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
            Every Nation
          </p>
          <p className="text-lg font-extrabold tracking-tight text-white">
            APPRENTICE
          </p>
        </div>
        <p className="mb-7 px-2 text-xs font-bold tracking-[0.25em] text-cta uppercase">
          {role === "STAFF" ? "Staff" : "Student"}
        </p>

        <nav className="flex-1 space-y-1">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-cta text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {Icon && <Icon />}
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
