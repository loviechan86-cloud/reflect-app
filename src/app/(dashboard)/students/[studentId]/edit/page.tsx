import { prisma } from "@/lib/prisma";
import { StudentForm } from "../../student-form";
import { toDateInputValue } from "../../date-utils";
import { updateStudent } from "../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  const student = await prisma.user.findUnique({
    where: { id: studentId, role: "STUDENT" },
  });
  if (!student) notFound();

  const boundUpdateStudent = updateStudent.bind(null, studentId);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <Link
        href={`/students/${studentId}`}
        className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
      >
        &larr; {student.name}
      </Link>

      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
        Edit student
      </h1>

      <StudentForm
        action={boundUpdateStudent}
        showPassword={false}
        submitLabel="Save changes"
        pendingLabel="Saving..."
        defaults={{
          name: student.name,
          email: student.email,
          phone: student.phone ?? undefined,
          dateOfBirth: toDateInputValue(student.dateOfBirth),
          gender: student.gender ?? undefined,
          paymentStatus: student.paymentStatus ?? undefined,
          team: student.team ?? undefined,
          parentName: student.parentName ?? undefined,
          parentPhone: student.parentPhone ?? undefined,
          parentEmail: student.parentEmail ?? undefined,
          school: student.school ?? undefined,
          gradeYear: student.gradeYear ?? undefined,
          joinDate: toDateInputValue(student.joinDate),
          emergencyContactName: student.emergencyContactName ?? undefined,
          emergencyContactPhone: student.emergencyContactPhone ?? undefined,
          emergencyContactRelation:
            student.emergencyContactRelation ?? undefined,
          medicalConditions: student.medicalConditions ?? undefined,
          dietaryRestrictions: student.dietaryRestrictions ?? undefined,
        }}
      />
    </main>
  );
}
