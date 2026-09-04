"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type CreateStudentState = {
  error: string | null;
  successAt: number;
};

export async function createStudent(
  prevState: CreateStudentState,
  formData: FormData,
): Promise<CreateStudentState> {
  const session = await auth();
  if (!session || session.user.role !== "STAFF") {
    throw new Error("Not authorized");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  const gender = String(formData.get("gender") ?? "").trim();

  if (
    !name ||
    !email ||
    password.length < 8 ||
    !phone ||
    !dateOfBirth ||
    !gender
  ) {
    return {
      error: "Please fill in every field (password needs at least 8 characters).",
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
    data: {
      name,
      email,
      passwordHash,
      role: "STUDENT",
      phone,
      dateOfBirth: new Date(dateOfBirth),
      gender,
    },
  });

  revalidatePath("/students");
  return { error: null, successAt: Date.now() };
}

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "STAFF") {
    throw new Error("Not authorized");
  }

  const reflectionId = String(formData.get("reflectionId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const studentId = String(formData.get("studentId") ?? "");
  if (!content || !reflectionId) return;

  await prisma.comment.create({
    data: {
      reflectionId,
      staffId: session.user.id,
      content,
    },
  });

  revalidatePath(`/students/${studentId}`);
  revalidatePath("/reflections");
}
