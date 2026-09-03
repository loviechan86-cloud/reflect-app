"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireStaff() {
  const session = await auth();
  if (!session || session.user.role !== "STAFF") {
    throw new Error("Not authorized");
  }
  return session;
}

export async function createUser(
  prevState: { error: string | null; successAt: number },
  formData: FormData,
): Promise<{ error: string | null; successAt: number }> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "STUDENT") as
    | "STAFF"
    | "STUDENT";

  if (!name || !email || password.length < 8) {
    return {
      error:
        "Name, email, and a password of at least 8 characters are required.",
      successAt: prevState.successAt,
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      error: "A user with that email already exists.",
      successAt: prevState.successAt,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  revalidatePath("/staff");
  return { error: null, successAt: Date.now() };
}

export async function deleteUser(formData: FormData) {
  const session = await requireStaff();

  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === session.user.id) return;

  await prisma.user.delete({ where: { id: userId } });

  revalidatePath("/staff");
}
