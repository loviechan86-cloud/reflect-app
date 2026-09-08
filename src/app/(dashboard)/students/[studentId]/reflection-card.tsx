"use client";

import { useActionState, useState } from "react";
import {
  addComment,
  updateReflection,
  deleteReflection,
  updateComment,
  deleteComment,
  type UpdateContentState,
} from "../actions";

const initialState: UpdateContentState = { error: null, success: false };

type CommentData = { id: string; content: string; staffName: string };

// Closes the edit form the moment an update succeeds, without an effect:
// derives the transition during render and adjusts state right away.
function useCloseOnSuccess(success: boolean, close: () => void) {
  const [seen, setSeen] = useState(success);
  if (success !== seen) {
    setSeen(success);
    if (success) close();
  }
}

export function ReflectionCard({
  studentId,
  reflectionId,
  weekLabel,
  content,
  comments,
}: {
  studentId: string;
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs font-bold text-blue uppercase tracking-wide hover:text-navy"
            >
              Edit
            </button>
            <form
              action={deleteReflection}
              onSubmit={(e) => {
                if (
                  !confirm(
                    "Delete this reflection? This also removes any feedback on it.",
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <input type="hidden" name="reflectionId" value={reflectionId} />
              <input type="hidden" name="studentId" value={studentId} />
              <button
                type="submit"
                className="text-xs font-bold text-red-600 uppercase tracking-wide hover:text-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>

      {editing ? (
        <form action={formAction} className="space-y-2">
          <input type="hidden" name="studentId" value={studentId} />
          <textarea
            name="content"
            defaultValue={content}
            rows={3}
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
            <CommentRow key={c.id} studentId={studentId} comment={c} />
          ))}
        </div>
      )}

      <form
        action={addComment}
        className="mt-4 space-y-2 border-t border-gray-100 pt-3"
      >
        <input type="hidden" name="reflectionId" value={reflectionId} />
        <input type="hidden" name="studentId" value={studentId} />
        <textarea
          name="content"
          rows={2}
          placeholder="Write staff feedback..."
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-cta px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wide hover:bg-cta-dark"
        >
          Save feedback
        </button>
      </form>
    </div>
  );
}

function CommentRow({
  studentId,
  comment,
}: {
  studentId: string;
  comment: CommentData;
}) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateComment.bind(null, comment.id);
  const [state, formAction, pending] = useActionState(
    boundUpdate,
    initialState,
  );

  useCloseOnSuccess(state.success, () => setEditing(false));

  if (editing) {
    return (
      <form action={formAction} className="space-y-1.5">
        <input type="hidden" name="studentId" value={studentId} />
        <textarea
          name="content"
          defaultValue={comment.content}
          rows={2}
          required
          className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:border-blue focus:outline-none"
        />
        {state.error && <p className="text-xs text-red-600">{state.error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-cta px-3 py-1 text-xs font-bold text-white uppercase tracking-wide hover:bg-cta-dark disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-navy uppercase tracking-wide hover:bg-background"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <p>
        <span className="font-bold text-navy">{comment.staffName}:</span>{" "}
        <span className="text-gray-700">{comment.content}</span>
      </p>
      <div className="flex shrink-0 items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-xs font-bold text-blue uppercase hover:text-navy"
        >
          Edit
        </button>
        <form
          action={deleteComment}
          onSubmit={(e) => {
            if (!confirm("Delete this feedback?")) e.preventDefault();
          }}
        >
          <input type="hidden" name="commentId" value={comment.id} />
          <input type="hidden" name="studentId" value={studentId} />
          <button
            type="submit"
            className="text-xs font-bold text-red-600 uppercase hover:text-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
