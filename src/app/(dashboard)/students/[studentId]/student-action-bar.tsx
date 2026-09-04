"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  setActive,
  resetPassword,
  type ResetPasswordState,
} from "../actions";

const resetInitialState: ResetPasswordState = { error: null, success: false };

export function StudentActionBar({
  studentId,
  active,
}: {
  studentId: string;
  active: boolean;
}) {
  const [showReset, setShowReset] = useState(false);
  const boundResetPassword = resetPassword.bind(null, studentId);
  const [resetState, resetAction, resetPending] = useActionState(
    boundResetPassword,
    resetInitialState,
  );

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <form
          action={setActive}
          onSubmit={(e) => {
            if (
              active &&
              !confirm(
                "Deactivate this student? They won't be able to sign in until reactivated.",
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="studentId" value={studentId} />
          <input type="hidden" name="active" value={(!active).toString()} />
          <button
            type="submit"
            className={
              active
                ? "rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-red-600 uppercase tracking-wide hover:bg-red-50"
                : "rounded-full border border-green-200 px-3 py-1 text-xs font-bold text-green-700 uppercase tracking-wide hover:bg-green-50"
            }
          >
            {active ? "Deactivate" : "Activate"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowReset((v) => !v)}
          className="rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-navy uppercase tracking-wide hover:bg-background"
        >
          Reset password
        </button>

        <Link
          href={`/students/${studentId}/edit`}
          className="rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-navy uppercase tracking-wide hover:bg-background"
        >
          Edit details
        </Link>
      </div>

      {showReset && (
        <form
          action={resetAction}
          key={resetState.success ? "done" : "idle"}
          className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-2.5"
        >
          <input
            name="newPassword"
            type="text"
            placeholder="New temporary password (min 8 chars)"
            required
            minLength={8}
            className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue focus:outline-none"
          />
          <button
            type="submit"
            disabled={resetPending}
            className="rounded-full bg-cta px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
          >
            {resetPending ? "Saving..." : "Set password"}
          </button>
          {resetState.error && (
            <p className="w-full text-xs text-red-600">{resetState.error}</p>
          )}
          {resetState.success && (
            <p className="w-full text-xs text-green-700">
              Password updated.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
