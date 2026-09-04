import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatWeekLabel } from "@/lib/week";
import { addComment } from "../actions";
import { StudentProfileGrid } from "@/components/student-profile-fields";
import { StudentActionBar } from "./student-action-bar";
import { PaymentSelect } from "./payment-select";
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
    where: { id: studentId, role: "STUDENT" },
  });
  if (!student) notFound();

  const reflections = await prisma.reflection.findMany({
    where: { studentId },
    orderBy: { weekOf: "desc" },
    include: {
      comments: {
        include: { staff: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <Link
        href="/students"
        className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
      >
        &larr; All students
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        {student.name}
      </h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        Student{student.team ? ` · ${student.team}` : ""}
        {!student.active && (
          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 uppercase">
            Deactivated
          </span>
        )}
      </p>

      <StudentActionBar studentId={studentId} active={student.active} />

      <section className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <StudentProfileGrid
            title="Profile"
            student={student}
            paymentControl={
              <PaymentSelect
                studentId={studentId}
                currentStatus={student.paymentStatus}
              />
            }
          />
        </div>
      </section>

      <h2 className="mb-3 text-xs font-bold tracking-wide text-blue uppercase">
        Reflections ({reflections.length})
      </h2>

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
                      {c.staff.name}:
                    </span>{" "}
                    <span className="text-gray-700">{c.content}</span>
                  </div>
                ))}
              </div>
            )}

            <form
              action={addComment}
              className="mt-4 space-y-2 border-t border-gray-100 pt-3"
            >
              <input type="hidden" name="reflectionId" value={r.id} />
              <input type="hidden" name="studentId" value={studentId} />
              <textarea
                name="content"
                rows={2}
                placeholder="Write staff feedback..."
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-cta px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
              >
                Save feedback
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
