"use client";

import { useActionState, useState } from "react";
import { createStudent, type CreateStudentState } from "./actions";

const initialState: CreateStudentState = { error: null, successAt: 0 };

export function AddStudentForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createStudent,
    initialState,
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
        >
          {open ? "Cancel" : "+ Add student"}
        </button>
      </div>

      {open && (
        <section className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-cta" />
          <div className="p-6">
            <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
              Add student
            </h2>
            <form
              action={formAction}
              key={state.successAt}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <input
                name="name"
                placeholder="Full name"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
              <input
                name="password"
                type="text"
                placeholder="Temporary password (min 8 chars)"
                required
                minLength={8}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
              <label className="flex flex-col gap-1 text-sm text-gray-500">
                Date of birth
                <input
                  name="dateOfBirth"
                  type="date"
                  required
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue focus:outline-none"
                />
              </label>
              <select
                name="gender"
                required
                defaultValue=""
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue focus:outline-none"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {state.error && (
                <p className="text-sm text-red-600 sm:col-span-2">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-cta px-4 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50 sm:col-span-2"
              >
                {pending ? "Creating..." : "Create account"}
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
