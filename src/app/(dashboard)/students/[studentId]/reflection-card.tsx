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

function EditIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.3 3.3a1.5 1.5 0 0 1 2.1 0l1.3 1.3a1.5 1.5 0 0 1 0 2.1L7 16.4l-3.5.8.8-3.5 8.9-9.4z" />
      <path d="M11.8 4.8l3.4 3.4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5h12" />
      <path d="M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" />
      <path d="M5.5 5.5l.6 9.4a1.5 1.5 0 0 0 1.5 1.4h4.8a1.5 1.5 0 0 0 1.5-1.4l.6-9.4" />
      <path d="M8.3 8.7v4.6M11.7 8.7v4.6" />
    </svg>
  );
}

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
                aria-label="Delete reflection"
                title="Delete"
                className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <TrashIcon />
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
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit feedback"
          title="Edit"
          className="rounded-lg p-1 text-blue hover:bg-background hover:text-navy"
        >
          <EditIcon />
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
            aria-label="Delete feedback"
            title="Delete"
            className="rounded-lg p-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <TrashIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
