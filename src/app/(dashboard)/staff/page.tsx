import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StaffStatusAction } from "./staff-status-action";
import Link from "next/link";

export default async function StaffPage() {
  const session = await auth();
  if (!session) return null;

  const staff = await prisma.user.findMany({
    where: { role: "STAFF" },
    orderBy: { name: "asc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">
            Staff
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {staff.length} {staff.length === 1 ? "staff member" : "staff members"}
          </p>
        </div>
        <Link
          href="/staff/new"
          className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
        >
          + Add staff
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.4fr_1.6fr_120px_140px] gap-4 border-b border-gray-100 px-5 py-3">
          <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
            Name
          </p>
          <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
            Email
          </p>
          <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
            Status
          </p>
          <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
            Actions
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {staff.map((s) => {
            const isSelf = s.id === session.user.id;
            return (
              <div
                key={s.id}
                className="grid grid-cols-[1.4fr_1.6fr_120px_140px] items-center gap-4 px-5 py-3.5"
              >
                <p className="text-sm font-bold text-navy">
                  {s.name}
                  {isSelf && (
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      (you)
                    </span>
                  )}
                </p>
                <p className="truncate text-sm text-gray-500">{s.email}</p>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
                    s.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {s.active ? "Active" : "Deactivated"}
                </span>
                {isSelf ? (
                  <span className="text-xs text-gray-300">&mdash;</span>
                ) : (
                  <StaffStatusAction userId={s.id} active={s.active} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
