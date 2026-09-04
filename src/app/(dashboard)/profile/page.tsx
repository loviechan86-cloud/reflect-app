import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-sm text-navy">{value?.trim() ? value : "—"}</p>
    </div>
  );
}

const paymentStatusLabel: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  WAIVED: "Waived",
};

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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Phone" value={user.phone} />
              <Field label="Date of birth" value={formatDate(user.dateOfBirth)} />
              <Field label="Gender" value={user.gender} />
              <Field
                label="Payment status"
                value={
                  user.paymentStatus
                    ? paymentStatusLabel[user.paymentStatus]
                    : null
                }
              />
              <Field label="Team" value={user.team} />
              <Field label="Join date" value={formatDate(user.joinDate)} />
              <Field label="School" value={user.school} />
              <Field label="Grade / year" value={user.gradeYear} />
            </div>

            <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
              Parent / guardian
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Name" value={user.parentName} />
              <Field label="Phone" value={user.parentPhone} />
              <Field label="Email" value={user.parentEmail} />
            </div>

            <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
              Emergency contact
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Name" value={user.emergencyContactName} />
              <Field label="Phone" value={user.emergencyContactPhone} />
              <Field label="Relation" value={user.emergencyContactRelation} />
            </div>

            <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
              Health &amp; dietary
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Medical conditions / allergies"
                value={user.medicalConditions}
              />
              <Field
                label="Dietary restrictions"
                value={user.dietaryRestrictions}
              />
            </div>

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
