import { signOut } from "@/lib/auth";

export function Header({
  title,
  userName,
}: {
  title: string;
  userName: string;
}) {
  return (
    <header className="bg-blue">
      <div className="bg-navy px-6 py-1.5 text-right text-xs font-medium text-white/80">
        APPRENTICE
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-extrabold tracking-wide text-white uppercase">
            {title}
          </h1>
          <p className="text-sm text-white/80">Signed in as {userName}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-blue hover:bg-white/90"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
