import Link from "next/link";
import { NewStudentForm } from "./new-student-form";

export default function NewStudentPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <Link
        href="/students"
        className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
      >
        &larr; All students
      </Link>

      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
        Add student
      </h1>

      <NewStudentForm />
    </main>
  );
}
