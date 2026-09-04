"use client";

import { useActionState } from "react";
import { createStudent, type CreateStudentState } from "../actions";

const initialState: CreateStudentState = { error: null };

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy focus:border-blue focus:outline-none";
const labelClass = "mb-1 block text-sm font-bold text-navy";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function NewStudentForm() {
  const [state, formAction, pending] = useActionState(
    createStudent,
    initialState,
  );

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
            <input name="name" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email (login) *</label>
            <input name="email" type="email" required className={inputClass} />
          </div>
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
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" type="tel" className={inputClass} />
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
            <input name="dateOfBirth" type="date" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" defaultValue="" className={inputClass}>
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
              defaultValue="PENDING"
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
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Parent/guardian name *</label>
            <input name="parentName" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Parent/guardian phone *</label>
            <input name="parentPhone" type="tel" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Parent/guardian email</label>
            <input name="parentEmail" type="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>School</label>
            <input name="school" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Grade / year</label>
            <input name="gradeYear" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Join date *</label>
            <input
              name="joinDate"
              type="date"
              required
              defaultValue={todayISO()}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Emergency contact name *</label>
            <input name="emergencyContactName" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Emergency contact phone *</label>
            <input
              name="emergencyContactPhone"
              type="tel"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Emergency contact relation</label>
            <input name="emergencyContactRelation" className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Medical conditions / allergies</label>
            <textarea
              name="medicalConditions"
              rows={2}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Dietary restrictions</label>
            <textarea
              name="dietaryRestrictions"
              rows={2}
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
        {pending ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
