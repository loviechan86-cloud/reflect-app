"use client";

import { useActionState } from "react";
import { todayISO } from "./date-utils";

export type StudentFormState = { error: string | null };

export const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy focus:border-blue focus:outline-none";
export const labelClass = "mb-1 block text-sm font-bold text-navy";

type Defaults = {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  paymentStatus?: string;
  team?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  school?: string;
  gradeYear?: string;
  joinDate?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  medicalConditions?: string;
  dietaryRestrictions?: string;
};

export function StudentForm({
  action,
  defaults,
  showPassword = true,
  submitLabel,
  pendingLabel,
}: {
  action: (
    prevState: StudentFormState,
    formData: FormData,
  ) => Promise<StudentFormState>;
  defaults?: Defaults;
  showPassword?: boolean;
  submitLabel: string;
  pendingLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {
    error: null,
  });
  const d = defaults ?? {};

  return (
    <form action={formAction} className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <h2 className="text-xs font-bold tracking-wide text-blue uppercase sm:col-span-2">
            Account
          </h2>

          <div>
            <label className={labelClass}>Full name *</label>
            <input
              name="name"
              required
              defaultValue={d.name}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email (login) *</label>
            <input
              name="email"
              type="email"
              required
              defaultValue={d.email}
              className={inputClass}
            />
          </div>
          {showPassword && (
            <div>
              <label className={labelClass}>Temporary password *</label>
              <input
                name="password"
                type="text"
                required
                minLength={8}
                placeholder="Min 8 characters"
                className={inputClass}
              />
            </div>
          )}
          <div>
            <label className={labelClass}>Phone</label>
            <input
              name="phone"
              type="tel"
              defaultValue={d.phone}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <h2 className="text-xs font-bold tracking-wide text-blue uppercase sm:col-span-2">
            Student profile
          </h2>

          <div>
            <label className={labelClass}>Date of birth *</label>
            <input
              name="dateOfBirth"
              type="date"
              required
              defaultValue={d.dateOfBirth}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              defaultValue={d.gender ?? ""}
              className={inputClass}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Payment status *</label>
            <select
              name="paymentStatus"
              defaultValue={d.paymentStatus ?? "PENDING"}
              required
              className={inputClass}
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="WAIVED">Waived</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Team</label>
            <input
              name="team"
              placeholder="— none —"
              defaultValue={d.team}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Parent/guardian name *</label>
            <input
              name="parentName"
              required
              defaultValue={d.parentName}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Parent/guardian phone *</label>
            <input
              name="parentPhone"
              type="tel"
              required
              defaultValue={d.parentPhone}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Parent/guardian email</label>
            <input
              name="parentEmail"
              type="email"
              defaultValue={d.parentEmail}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>School</label>
            <input
              name="school"
              defaultValue={d.school}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Grade / year</label>
            <input
              name="gradeYear"
              defaultValue={d.gradeYear}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Join date *</label>
            <input
              name="joinDate"
              type="date"
              required
              defaultValue={d.joinDate ?? todayISO()}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Emergency contact name *</label>
            <input
              name="emergencyContactName"
              required
              defaultValue={d.emergencyContactName}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Emergency contact phone *</label>
            <input
              name="emergencyContactPhone"
              type="tel"
              required
              defaultValue={d.emergencyContactPhone}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Emergency contact relation</label>
            <input
              name="emergencyContactRelation"
              defaultValue={d.emergencyContactRelation}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>
              Medical conditions / allergies
            </label>
            <textarea
              name="medicalConditions"
              rows={2}
              defaultValue={d.medicalConditions}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Dietary restrictions</label>
            <textarea
              name="dietaryRestrictions"
              rows={2}
              defaultValue={d.dietaryRestrictions}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-cta px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
