import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StaffActionBar } from "./staff-action-bar";
import { StaffEditForm } from "./staff-edit-form";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ staffId: string }>;
}) {
  const session = await auth();
  if (!session) return null;
  const { staffId } = await params;

  const staffMember = await prisma.user.findUnique({
    where: { id: staffId, role: "STAFF" },
  });
  if (!staffMember) notFound();

  const isSelf = staffMember.id === session.user.id;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:py-10">
      <Link
        href="/staff"
        className="mb-4 inline-block text-sm font-bold text-blue hover:text-navy"
      >
        &larr; Staff
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        {staffMember.name}
      </h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        {staffMember.email}
        {isSelf && <span className="ml-2 text-xs text-gray-400">(you)</span>}
        {!staffMember.active && (
          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 uppercase">
            Deactivated
          </span>
        )}
      </p>

      <StaffActionBar
        staffId={staffId}
        active={staffMember.active}
        isSelf={isSelf}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
            Details
          </h2>
          <StaffEditForm
            staffId={staffId}
            defaults={{
              name: staffMember.name,
              email: staffMember.email,
              phone: staffMember.phone ?? "",
            }}
          />
        </div>
      </section>
    </main>
  );
}
