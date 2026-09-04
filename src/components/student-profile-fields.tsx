import type { ReactNode } from "react";

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

export function PaymentBadge({ status }: { status: string | null }) {
  return (
    <p className="text-sm">
      <span className="text-xs font-bold text-gray-400 uppercase">
        Payment:{" "}
      </span>
      <span className="font-bold text-navy">
        {status ? paymentStatusLabel[status] : "—"}
      </span>
    </p>
  );
}

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

export function StudentProfileGrid({
  title,
  student,
  paymentControl,
}: {
  title: string;
  student: StudentLike;
  paymentControl?: ReactNode;
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold tracking-wide text-blue uppercase">
          {title}
        </h2>
        {paymentControl}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        <Field label="Date of birth" value={formatDate(student.dateOfBirth)} />
        <Field label="Gender" value={student.gender} />
        <Field label="Phone" value={student.phone} />

        <Field label="School" value={student.school} />
        <Field label="Grade / year" value={student.gradeYear} />
        <Field label="Parent/guardian" value={student.parentName} />

        <Field label="Parent phone" value={student.parentPhone} />
        <Field label="Parent email" value={student.parentEmail} />
        <Field
          label="Emergency contact"
          value={student.emergencyContactName}
        />

        <Field
          label="Emergency phone"
          value={student.emergencyContactPhone}
        />
        <Field
          label="Emergency relation"
          value={student.emergencyContactRelation}
        />
      </div>

      {(student.medicalConditions || student.dietaryRestrictions) && (
        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
          {student.medicalConditions && (
            <p>
              <span className="font-bold text-cta">Medical:</span>{" "}
              <span className="text-navy">{student.medicalConditions}</span>
            </p>
          )}
          {student.dietaryRestrictions && (
            <p>
              <span className="font-bold text-cta">Dietary:</span>{" "}
              <span className="text-navy">{student.dietaryRestrictions}</span>
            </p>
          )}
        </div>
      )}
    </>
  );
}
