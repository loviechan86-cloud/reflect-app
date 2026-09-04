import Link from "next/link";
import { StaffForm } from "../staff-form";

export default function NewStaffPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 lg:py-10">
      <Link
        href="/staff"
        className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
      >
        &larr; All staff
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
        Add staff
      </h1>
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <StaffForm />
        </div>
      </section>
    </main>
  );
}
