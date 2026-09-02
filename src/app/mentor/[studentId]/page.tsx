import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatWeekLabel } from "@/lib/week";
import { Header } from "@/components/header";
import { addComment } from "../actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const session = await auth();
  if (!session) return null;
  const { studentId } = await params;

  const student = await prisma.user.findUnique({
    where: { id: studentId, mentorId: session.user.id, role: "STUDENT" },
  });
  if (!student) notFound();

  const reflections = await prisma.reflection.findMany({
    where: { studentId },
    orderBy: { weekOf: "desc" },
    include: {
      comments: {
        include: { mentor: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header title={student.name} userName={session.user.name ?? ""} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/mentor"
          className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
        >
          &larr; All students
        </Link>

        {reflections.length === 0 && (
          <p className="text-sm text-gray-500">No reflections yet.</p>
        )}

        <div className="space-y-4">
          {reflections.map((r) => (
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
                        {c.mentor.name}:
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
                <input type="hidden" name="studentId" value={studentId} />
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
    </div>
  );
}
