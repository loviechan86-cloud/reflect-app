import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart, formatWeekLabel } from "@/lib/week";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return null;

  const currentWeek = weekStart(new Date());

  const [totalStudents, totalStaff, students] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "STAFF" } }),
    prisma.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { name: "asc" },
      include: {
        reflections: {
          where: { weekOf: currentWeek },
          select: { id: true },
        },
      },
    }),
  ]);

  const submittedCount = students.filter(
    (s) => s.reflections.length > 0,
  ).length;
  const missing = students.filter((s) => s.reflections.length === 0);

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-8 lg:py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-navy">{totalStudents}</p>
          <p className="text-xs font-bold text-gray-500 uppercase">
            Students
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-navy">{totalStaff}</p>
          <p className="text-xs font-bold text-gray-500 uppercase">Staff</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-cta">
            {submittedCount}/{totalStudents}
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase">
            Submitted
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-wide text-blue uppercase">
          Haven&rsquo;t submitted &middot; Week of{" "}
          {formatWeekLabel(currentWeek)}
        </h2>
        {missing.length === 0 ? (
          <p className="text-sm text-gray-500">
            Everyone&rsquo;s submitted this week.
          </p>
        ) : (
          <div className="space-y-2">
            {missing.map((s) => (
              <Link
                key={s.id}
                href={`/students/${s.id}`}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:border-blue"
              >
                <div>
                  <p className="text-sm font-bold text-navy">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500 uppercase">
                  Not yet
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
