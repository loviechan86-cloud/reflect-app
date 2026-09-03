import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatWeekLabel } from "@/lib/week";
import { addComment } from "../students/actions";
import Link from "next/link";

export default async function ReflectionsPage() {
  const session = await auth();
  if (!session) return null;

  const reflections = await prisma.reflection.findMany({
    orderBy: { updatedAt: "desc" },
    take: 30,
    include: {
      student: { select: { id: true, name: true } },
      comments: {
        include: { staff: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 lg:py-10">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
        Reflections
      </h1>

      {reflections.length === 0 && (
        <p className="text-sm text-gray-500">No reflections submitted yet.</p>
      )}

      <div className="space-y-4">
        {reflections.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <Link
                href={`/students/${r.student.id}`}
                className="text-sm font-bold text-navy hover:text-blue"
              >
                {r.student.name}
              </Link>
              <p className="text-xs font-bold text-gray-500">
                {formatWeekLabel(r.weekOf)}
              </p>
            </div>
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

            <form
              action={addComment}
              className="mt-4 flex gap-2 border-t border-gray-100 pt-3"
            >
              <input type="hidden" name="reflectionId" value={r.id} />
              <input type="hidden" name="studentId" value={r.student.id} />
              <input
                name="content"
                placeholder="Leave a comment..."
                required
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-cta px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
              >
                Reply
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
