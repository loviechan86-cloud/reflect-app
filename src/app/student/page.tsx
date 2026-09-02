import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart, formatWeekLabel } from "@/lib/week";
import { Header } from "@/components/header";
import { submitReflection } from "./actions";

export default async function StudentPage() {
  const session = await auth();
  if (!session) return null;

  const currentWeek = weekStart(new Date());

  const [thisWeek, history] = await Promise.all([
    prisma.reflection.findUnique({
      where: {
        studentId_weekOf: {
          studentId: session.user.id,
          weekOf: currentWeek,
        },
      },
      include: {
        comments: {
          include: { mentor: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    }),
    prisma.reflection.findMany({
      where: {
        studentId: session.user.id,
        weekOf: { lt: currentWeek },
      },
      orderBy: { weekOf: "desc" },
      include: {
        comments: {
          include: { mentor: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Reflections" userName={session.user.name ?? ""} />

      <main className="mx-auto max-w-2xl space-y-8 px-4 py-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-medium text-gray-900">
            This week &middot; {formatWeekLabel(currentWeek)}
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            {thisWeek
              ? "You can still edit your reflection for this week."
              : "What went well? What was hard? What do you need help with?"}
          </p>
          <form action={submitReflection} className="space-y-3">
            <textarea
              name="content"
              required
              rows={6}
              defaultValue={thisWeek?.content ?? ""}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none"
              placeholder="Write your reflection..."
            />
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              {thisWeek ? "Update reflection" : "Submit reflection"}
            </button>
          </form>

          {thisWeek && thisWeek.comments.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
              {thisWeek.comments.map((c) => (
                <div key={c.id} className="text-sm">
                  <span className="font-medium text-gray-900">
                    {c.mentor.name}:
                  </span>{" "}
                  <span className="text-gray-700">{c.content}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium text-gray-900">
            Past reflections
          </h2>
          {history.length === 0 && (
            <p className="text-sm text-gray-500">Nothing here yet.</p>
          )}
          <div className="space-y-4">
            {history.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="mb-2 text-xs font-medium text-gray-500">
                  {formatWeekLabel(r.weekOf)}
                </p>
                <p className="whitespace-pre-wrap text-sm text-gray-800">
                  {r.content}
                </p>

                {r.comments.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                    {r.comments.map((c) => (
                      <div key={c.id} className="text-sm">
                        <span className="font-medium text-gray-900">
                          {c.mentor.name}:
                        </span>{" "}
                        <span className="text-gray-700">{c.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
