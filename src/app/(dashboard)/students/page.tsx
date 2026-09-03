import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart, formatWeekLabel } from "@/lib/week";
import Link from "next/link";

export default async function StudentsPage() {
  const session = await auth();
  if (!session) return null;

  const currentWeek = weekStart(new Date());

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { name: "asc" },
    include: {
      reflections: {
        where: { weekOf: currentWeek },
        select: { id: true },
      },
    },
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 lg:py-10">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
        Students
      </h1>
      <p className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
        Week of {formatWeekLabel(currentWeek)}
      </p>
      {students.length === 0 && (
        <p className="text-sm text-gray-500">No students yet.</p>
      )}
      <div className="space-y-3">
        {students.map((s) => {
          const submitted = s.reflections.length > 0;
          return (
            <Link
              key={s.id}
              href={`/students/${s.id}`}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:border-blue"
            >
              <div>
                <p className="text-sm font-bold text-navy">{s.name}</p>
                <p className="text-xs text-gray-500">{s.email}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
                  submitted
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {submitted ? "Submitted" : "Not yet"}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
