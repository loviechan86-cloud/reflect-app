import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const roleHome: Record<string, string> = {
  ADMIN: "/admin",
  MENTOR: "/mentor",
  STUDENT: "/student",
};

export default async function Home() {
  const session = await auth();
  redirect(session ? roleHome[session.user.role] : "/login");
}
