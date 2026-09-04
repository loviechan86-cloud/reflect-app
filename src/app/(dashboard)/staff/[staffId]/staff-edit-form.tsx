"use client";

import { useActionState } from "react";
import { updateStaff, type UpdateStaffState } from "../actions";

const initialState: UpdateStaffState = { error: null };

export function StaffEditForm({
  staffId,
  defaults,
}: {
  staffId: string;
  defaults: { name: string; email: string; phone: string };
}) {
  const boundUpdateStaff = updateStaff.bind(null, staffId);
  const [state, formAction, pending] = useActionState(
    boundUpdateStaff,
    initialState,
  );

  return (
    <form action={formAction} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-bold text-gray-400 uppercase">
          Full name
        </label>
        <input
          name="name"
          defaultValue={defaults.name}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold text-gray-400 uppercase">
          Email (login)
        </label>
        <input
          name="email"
          type="email"
          defaultValue={defaults.email}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold text-gray-400 uppercase">
          Phone
        </label>
        <input
          name="phone"
          defaultValue={defaults.phone}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50 sm:col-span-2 sm:w-fit"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
