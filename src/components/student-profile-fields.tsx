export function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export const paymentStatusLabel: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  WAIVED: "Waived",
};

export function Field({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-sm text-navy">{value?.trim() ? value : "—"}</p>
    </div>
  );
}

type StudentLike = {
  phone: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  paymentStatus: string | null;
  team: string | null;
  joinDate: Date | null;
  school: string | null;
  gradeYear: string | null;
  parentName: string | null;
  parentPhone: string | null;
  parentEmail: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
  medicalConditions: string | null;
  dietaryRestrictions: string | null;
};

export function StudentProfileGrid({ student }: { student: StudentLike }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Phone" value={student.phone} />
        <Field
          label="Date of birth"
          value={formatDate(student.dateOfBirth)}
        />
        <Field label="Gender" value={student.gender} />
        <Field
          label="Payment status"
          value={
            student.paymentStatus
              ? paymentStatusLabel[student.paymentStatus]
              : null
          }
        />
        <Field label="Team" value={student.team} />
        <Field label="Join date" value={formatDate(student.joinDate)} />
        <Field label="School" value={student.school} />
        <Field label="Grade / year" value={student.gradeYear} />
      </div>

      <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
        Parent / guardian
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Name" value={student.parentName} />
        <Field label="Phone" value={student.parentPhone} />
        <Field label="Email" value={student.parentEmail} />
      </div>

      <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
        Emergency contact
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Name" value={student.emergencyContactName} />
        <Field label="Phone" value={student.emergencyContactPhone} />
        <Field
          label="Relation"
          value={student.emergencyContactRelation}
        />
      </div>

      <h3 className="mt-6 mb-3 text-xs font-bold tracking-wide text-blue uppercase">
        Health &amp; dietary
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Medical conditions / allergies"
          value={student.medicalConditions}
        />
        <Field
          label="Dietary restrictions"
          value={student.dietaryRestrictions}
        />
      </div>
    </>
  );
}
