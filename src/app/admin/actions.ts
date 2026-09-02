"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }
  return session;
}

export async function createUser(
  prevState: { error: string | null; successAt: number },
  formData: FormData
): Promise<{ error: string | null; successAt: number }> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "STUDENT") as
    | "ADMIN"
    | "MENTOR"
    | "STUDENT";
  const mentorId = String(formData.get("mentorId") ?? "") || null;

  if (!name || !email || password.length < 8) {
    return {
      error: "Name, email, and a password of at least 8 characters are required.",
      successAt: prevState.successAt,
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists.", successAt: prevState.successAt };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      mentorId: role === "STUDENT" ? mentorId : null,
    },
  });

  revalidatePath("/admin");
  return { error: null, successAt: Date.now() };
}

export async function updateStudentMentor(formData: FormData) {
  await requireAdmin();

  const studentId = String(formData.get("studentId") ?? "");
  const mentorId = String(formData.get("mentorId") ?? "") || null;
  if (!studentId) return;

  await prisma.user.update({
    where: { id: studentId, role: "STUDENT" },
    data: { mentorId },
  });

  revalidatePath("/admin");
}

export async function deleteUser(formData: FormData) {
  const session = await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === session.user.id) return;

  await prisma.user.delete({ where: { id: userId } });

  revalidatePath("/admin");
}
