"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, {
    error: null,
    successAt: 0,
  });

  return (
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
      <select
        name="role"
        defaultValue="STUDENT"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
      >
        <option value="STUDENT">Student</option>
        <option value="STAFF">Staff</option>
      </select>

      {state.error && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-cta px-4 py-2 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50 sm:col-span-2"
      >
        {pending ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
