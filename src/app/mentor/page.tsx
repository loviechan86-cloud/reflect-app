import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart, formatWeekLabel } from "@/lib/week";
import { Header } from "@/components/header";
import Link from "next/link";

export default async function MentorPage() {
  const session = await auth();
  if (!session) return null;

  const currentWeek = weekStart(new Date());

  const students = await prisma.user.findMany({
    where: { mentorId: session.user.id, role: "STUDENT" },
    orderBy: { name: "asc" },
    include: {
      reflections: {
        where: { weekOf: currentWeek },
        select: { id: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Students" userName={session.user.name ?? ""} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-4 text-sm text-gray-500">
          Week of {formatWeekLabel(currentWeek)}
        </p>
        {students.length === 0 && (
          <p className="text-sm text-gray-500">
            No students assigned to you yet.
          </p>
        )}
        <div className="space-y-3">
          {students.map((s) => {
            const submitted = s.reflections.length > 0;
            return (
              <Link
                key={s.id}
                href={`/mentor/${s.id}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {s.name}
                  </p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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
    </div>
  );
}
