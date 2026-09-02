import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";
import Link from "next/link";

const roleHome: Record<string, string> = {
  ADMIN: "/admin",
  MENTOR: "/mentor",
  STUDENT: "/student",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" userName={session.user.name ?? ""} />

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        <Link
          href={roleHome[session.user.role]}
          className="inline-block text-sm font-bold text-blue hover:text-navy"
        >
          &larr; Back
        </Link>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-cta" />
          <div className="p-6">
            <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
              Your details
            </h2>
            <ProfileForm name={user.name} email={user.email} />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-cta" />
          <div className="p-6">
            <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
              Change password
            </h2>
            <PasswordForm />
          </div>
        </section>

        <p className="text-xs text-gray-500">
          If you change your email or name, sign out and back in for it to
          show correctly everywhere.
        </p>
      </main>
    </div>
  );
}
