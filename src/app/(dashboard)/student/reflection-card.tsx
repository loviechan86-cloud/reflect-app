"use client";

import { useActionState, useState } from "react";
import { updateReflection, type UpdateReflectionState } from "./actions";
import { EditIcon } from "@/components/icons";
import { DeleteReflectionButton } from "./delete-reflection-button";

const initialState: UpdateReflectionState = { error: null, success: false };

// Closes the edit form the moment an update succeeds, without an effect:
// derives the transition during render and adjusts state right away.
function useCloseOnSuccess(success: boolean, close: () => void) {
  const [seen, setSeen] = useState(success);
  if (success !== seen) {
    setSeen(success);
    if (success) close();
  }
}

type CommentData = { id: string; content: string; staffName: string };

export function StudentReflectionCard({
  reflectionId,
  weekLabel,
  content,
  comments,
}: {
  reflectionId: string;
  weekLabel: string;
  content: string;
  comments: CommentData[];
}) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateReflection.bind(null, reflectionId);
  const [state, formAction, pending] = useActionState(
    boundUpdate,
    initialState,
  );

  useCloseOnSuccess(state.success, () => setEditing(false));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold text-gray-500">{weekLabel}</p>
        {!editing && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Edit reflection"
              title="Edit"
              className="rounded-lg p-1.5 text-blue hover:bg-background hover:text-navy"
            >
              <EditIcon />
            </button>
            <DeleteReflectionButton reflectionId={reflectionId} />
          </div>
        )}
      </div>

      {editing ? (
        <form action={formAction} className="space-y-2">
          <textarea
            name="content"
            defaultValue={content}
            rows={4}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
          />
          {state.error && (
            <p className="text-xs text-red-600">{state.error}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-cta px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
            >
              {pending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-bold text-navy uppercase tracking-wide hover:bg-background"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="whitespace-pre-wrap text-sm text-gray-800">{content}</p>
      )}

      {comments.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
          {comments.map((c) => (
            <div key={c.id} className="text-sm">
              <span className="font-bold text-navy">{c.staffName}:</span>{" "}
              <span className="text-gray-700">{c.content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
