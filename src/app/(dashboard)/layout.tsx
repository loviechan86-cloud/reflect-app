import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <Sidebar role={session.user.role} userName={session.user.name ?? ""} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
