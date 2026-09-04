import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";
import { StudentProfileGrid } from "@/components/student-profile-fields";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return null;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 lg:py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        Profile
      </h1>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
            Your details
          </h2>
          <ProfileForm name={user.name} email={user.email} />
        </div>
      </section>

      {user.role === "STUDENT" && (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-cta" />
          <div className="p-6">
            <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
              Student profile
            </h2>
            <StudentProfileGrid student={user} />

            <p className="mt-6 text-xs text-gray-500">
              Need to update any of this? Ask your staff contact.
            </p>
          </div>
        </section>
      )}

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
        If you change your email or name, sign out and back in for it to show
        correctly everywhere.
      </p>
    </main>
  );
}
