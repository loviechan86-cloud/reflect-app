"use client";

import { updateStudentMentor } from "./actions";

export function MentorSelect({
  studentId,
  currentMentorId,
  mentors,
}: {
  studentId: string;
  currentMentorId: string | null;
  mentors: { id: string; name: string }[];
}) {
  return (
    <form
      action={updateStudentMentor}
      className="flex items-center gap-2"
      onChange={(e) => {
        (e.currentTarget as HTMLFormElement).requestSubmit();
      }}
    >
      <input type="hidden" name="studentId" value={studentId} />
      <select
        name="mentorId"
        defaultValue={currentMentorId ?? ""}
        className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-gray-900 focus:outline-none"
      >
        <option value="">No mentor</option>
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </form>
  );
}
