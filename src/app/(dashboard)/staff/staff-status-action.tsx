"use client";

import { setStaffActive } from "./actions";

export function StaffStatusAction({
  userId,
  active,
}: {
  userId: string;
  active: boolean;
}) {
  return (
    <form
      action={setStaffActive}
      onSubmit={(e) => {
        if (
          active &&
          !confirm(
            "Deactivate this staff account? They won't be able to sign in until reactivated.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="userId" value={userId} />
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
  );
}
