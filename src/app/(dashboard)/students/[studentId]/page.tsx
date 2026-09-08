import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatWeekLabel } from "@/lib/week";
import { StudentProfileGrid } from "@/components/student-profile-fields";
import { StudentActionBar } from "./student-action-bar";
import { PaymentSelect } from "./payment-select";
import { ReflectionCard } from "./reflection-card";
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
          <ReflectionCard
            key={r.id}
            studentId={studentId}
            reflectionId={r.id}
            weekLabel={formatWeekLabel(r.weekOf)}
            content={r.content}
            comments={r.comments.map((c) => ({
              id: c.id,
              content: c.content,
              staffId: c.staffId,
              staffName: c.staff.name,
            }))}
            currentStaffId={session.user.id}
          />
        ))}
      </div>
    </main>
  );
}
