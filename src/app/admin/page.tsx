import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { CreateUserForm } from "./create-user-form";
import { MentorSelect } from "./mentor-select";
import { deleteUser } from "./actions";

export default async function AdminPage() {
  const session = await auth();
  if (!session) return null;

  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
    include: { mentor: { select: { name: true } } },
  });
  const mentors = users.filter((u) => u.role === "MENTOR");
  const students = users.filter((u) => u.role === "STUDENT");
  const admins = users.filter((u) => u.role === "ADMIN");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin" userName={session.user.name ?? ""} />

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-medium text-gray-900">
            Create account
          </h2>
          <CreateUserForm
            mentors={mentors.map((m) => ({ id: m.id, name: m.name }))}
          />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium text-gray-900">
            Students ({students.length})
          </h2>
          <div className="space-y-2">
            {students.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {s.name}
                  </p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MentorSelect
                    studentId={s.id}
                    currentMentorId={s.mentorId}
                    mentors={mentors.map((m) => ({ id: m.id, name: m.name }))}
                  />
                  <DeleteButton userId={s.id} />
                </div>
              </div>
            ))}
            {students.length === 0 && (
              <p className="text-sm text-gray-500">No students yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium text-gray-900">
            Mentors ({mentors.length})
          </h2>
          <div className="space-y-2">
            {mentors.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {m.name}
                  </p>
                  <p className="text-xs text-gray-500">{m.email}</p>
                </div>
                <DeleteButton userId={m.id} />
              </div>
            ))}
            {mentors.length === 0 && (
              <p className="text-sm text-gray-500">No mentors yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium text-gray-900">
            Admins ({admins.length})
          </h2>
          <div className="space-y-2">
            {admins.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {a.name}
                    {a.id === session.user.id && (
                      <span className="ml-2 text-xs text-gray-400">(you)</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{a.email}</p>
                </div>
                {a.id !== session.user.id && <DeleteButton userId={a.id} />}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function DeleteButton({ userId }: { userId: string }) {
  return (
    <form action={deleteUser}>
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
      >
        Remove
      </button>
    </form>
  );
}
