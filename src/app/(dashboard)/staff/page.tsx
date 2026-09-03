import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateUserForm } from "./create-user-form";
import { deleteUser } from "./actions";

export default async function StaffPage() {
  const session = await auth();
  if (!session) return null;

  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });
  const staff = users.filter((u) => u.role === "STAFF");
  const students = users.filter((u) => u.role === "STUDENT");

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8 lg:py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-navy">
        Staff
      </h1>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 bg-cta" />
        <div className="p-6">
          <h2 className="mb-4 text-xs font-bold tracking-wide text-blue uppercase">
            Create account
          </h2>
          <CreateUserForm />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-wide text-blue uppercase">
          Staff ({staff.length})
        </h2>
        <div className="space-y-2">
          {staff.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-sm font-bold text-navy">
                  {s.name}
                  {s.id === session.user.id && (
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      (you)
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{s.email}</p>
              </div>
              {s.id !== session.user.id && <DeleteButton userId={s.id} />}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-wide text-blue uppercase">
          Students ({students.length})
        </h2>
        <div className="space-y-2">
          {students.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-sm font-bold text-navy">{s.name}</p>
                <p className="text-xs text-gray-500">{s.email}</p>
              </div>
              <DeleteButton userId={s.id} />
            </div>
          ))}
          {students.length === 0 && (
            <p className="text-sm text-gray-500">No students yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

function DeleteButton({ userId }: { userId: string }) {
  return (
    <form action={deleteUser}>
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-bold text-red-600 uppercase tracking-wide hover:bg-red-50"
      >
        Remove
      </button>
    </form>
  );
}
