import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart, formatWeekLabel } from "@/lib/week";
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
          include: { staff: { select: { name: true } } },
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
          include: { staff: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-8 lg:py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        My Reflections
      </h1>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <h2 className="mb-1 text-xs font-bold tracking-wide text-blue uppercase">
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
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue focus:outline-none"
              placeholder="Write your reflection..."
            />
            <button
              type="submit"
              className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
            >
              {thisWeek ? "Update reflection" : "Submit reflection"}
            </button>
          </form>

          {thisWeek && thisWeek.comments.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
              {thisWeek.comments.map((c) => (
                <div key={c.id} className="text-sm">
                  <span className="font-bold text-navy">{c.staff.name}:</span>{" "}
                  <span className="text-gray-700">{c.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-wide text-blue uppercase">
          Past reflections
        </h2>
        {history.length === 0 && (
          <p className="text-sm text-gray-500">Nothing here yet.</p>
        )}
        <div className="space-y-4">
          {history.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-2 text-xs font-bold text-gray-500">
                {formatWeekLabel(r.weekOf)}
              </p>
              <p className="whitespace-pre-wrap text-sm text-gray-800">
                {r.content}
              </p>

              {r.comments.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                  {r.comments.map((c) => (
                    <div key={c.id} className="text-sm">
                      <span className="font-bold text-navy">
                        {c.staff.name}:
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
  );
}
