"use client";

import { useActionState } from "react";
import { changePassword, type ProfileState } from "./actions";

const initialState: ProfileState = { error: null, success: null };

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    initialState
  );

  return (
    <form action={formAction} key={state.success ?? "idle"} className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-bold text-navy">
          Current password
        </label>
        <input
          name="currentPassword"
          type="password"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-navy">
          New password
        </label>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-navy">
          Confirm new password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-700">{state.success}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-cta px-5 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
      >
        {pending ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
