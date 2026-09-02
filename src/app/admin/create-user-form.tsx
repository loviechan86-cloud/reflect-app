"use client";

import { useActionState, useState } from "react";
import { createUser } from "./actions";

export function CreateUserForm({
  mentors,
}: {
  mentors: { id: string; name: string }[];
}) {
  const [state, formAction, pending] = useActionState(createUser, {
    error: null,
    successAt: 0,
  });
  const [role, setRole] = useState<"ADMIN" | "MENTOR" | "STUDENT">("STUDENT");

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
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <input
        name="password"
        type="text"
        placeholder="Temporary password (min 8 chars)"
        required
        minLength={8}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value as typeof role)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      >
        <option value="STUDENT">Student</option>
        <option value="MENTOR">Mentor</option>
        <option value="ADMIN">Admin</option>
      </select>

      {role === "STUDENT" && (
        <select
          name="mentorId"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:col-span-2"
          defaultValue=""
        >
          <option value="">No mentor assigned yet</option>
          {mentors.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      )}

      {state.error && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 sm:col-span-2"
      >
        {pending ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
