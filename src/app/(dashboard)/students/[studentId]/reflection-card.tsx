"use client";

import { useActionState, useState } from "react";
import {
  addComment,
  updateComment,
  deleteComment,
  type UpdateContentState,
} from "../actions";
import { EditIcon, TrashIcon } from "@/components/icons";

const initialState: UpdateContentState = { error: null, success: false };

type CommentData = {
  id: string;
  content: string;
  staffId: string;
  staffName: string;
};

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
  currentStaffId,
}: {
  studentId: string;
  reflectionId: string;
  weekLabel: string;
  content: string;
  comments: CommentData[];
  currentStaffId: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-2 text-xs font-bold text-gray-500">{weekLabel}</p>
      <p className="whitespace-pre-wrap text-sm text-gray-800">{content}</p>

      {comments.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
          {comments.map((c) => (
            <CommentRow
              key={c.id}
              studentId={studentId}
              comment={c}
              canManage={c.staffId === currentStaffId}
            />
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
  canManage,
}: {
  studentId: string;
  comment: CommentData;
  canManage: boolean;
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
      {canManage && (
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
      )}
    </div>
  );
}
