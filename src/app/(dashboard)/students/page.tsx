import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart } from "@/lib/week";
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
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">
            Students
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {students.length} {students.length === 1 ? "student" : "students"}
          </p>
        </div>
        <Link
          href="/students/new"
          className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
        >
          + Add student
        </Link>
      </div>

      {students.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No students yet.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 px-5 py-3">
            <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
              Name
            </p>
            <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
              Reflection
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {students.map((s) => {
              const submitted = s.reflections.length > 0;
              return (
                <Link
                  key={s.id}
                  href={`/students/${s.id}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-background"
                >
                  <p className="text-sm font-bold text-navy">
                    {s.name}
                    {!s.active && (
                      <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 uppercase">
                        Deactivated
                      </span>
                    )}
                  </p>
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
        </div>
      )}
    </main>
  );
}
