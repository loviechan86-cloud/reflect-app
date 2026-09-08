"use client";

import { deleteReflection } from "./actions";
import { TrashIcon } from "@/components/icons";

export function DeleteReflectionButton({
  reflectionId,
}: {
  reflectionId: string;
}) {
  return (
    <form
      action={deleteReflection}
      onSubmit={(e) => {
        if (
          !confirm(
            "Delete this reflection? This also removes any staff feedback on it.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="reflectionId" value={reflectionId} />
      <button
        type="submit"
        aria-label="Delete reflection"
        title="Delete"
        className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <TrashIcon />
      </button>
    </form>
  );
}
