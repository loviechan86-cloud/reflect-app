"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateStudentState = {
  error: string | null;
};

async function requireStaff() {
  const session = await auth();
  if (!session || session.user.role !== "STAFF") {
    throw new Error("Not authorized");
  }
  return session;
}

function optional(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

export async function createStudent(
  _prevState: CreateStudentState,
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
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  const paymentStatus = String(formData.get("paymentStatus") ?? "");
  const parentName = optional(formData, "parentName");
  const parentPhone = optional(formData, "parentPhone");
  const joinDate = String(formData.get("joinDate") ?? "");
  const emergencyContactName = optional(formData, "emergencyContactName");
  const emergencyContactPhone = optional(formData, "emergencyContactPhone");

  if (
    !name ||
    !email ||
    password.length < 8 ||
    !dateOfBirth ||
    !paymentStatus ||
    !parentName ||
    !parentPhone ||
    !joinDate ||
    !emergencyContactName ||
    !emergencyContactPhone
  ) {
    return {
      error:
        "Please fill in the required fields (marked *) — password needs at least 8 characters.",
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "STUDENT",
      phone: optional(formData, "phone"),
      dateOfBirth: new Date(dateOfBirth),
      gender: optional(formData, "gender"),
      paymentStatus: paymentStatus as "PENDING" | "PAID" | "WAIVED",
      team: optional(formData, "team"),
      joinDate: new Date(joinDate),
      parentName,
      parentPhone,
      parentEmail: optional(formData, "parentEmail"),
      school: optional(formData, "school"),
      gradeYear: optional(formData, "gradeYear"),
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation: optional(
        formData,
        "emergencyContactRelation",
      ),
      medicalConditions: optional(formData, "medicalConditions"),
      dietaryRestrictions: optional(formData, "dietaryRestrictions"),
    },
  });

  revalidatePath("/students");
  redirect("/students");
}

export async function updateStudent(
  studentId: string,
  _prevState: CreateStudentState,
  formData: FormData,
): Promise<CreateStudentState> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  const paymentStatus = String(formData.get("paymentStatus") ?? "");
  const parentName = optional(formData, "parentName");
  const parentPhone = optional(formData, "parentPhone");
  const joinDate = String(formData.get("joinDate") ?? "");
  const emergencyContactName = optional(formData, "emergencyContactName");
  const emergencyContactPhone = optional(formData, "emergencyContactPhone");

  if (
    !name ||
    !email ||
    !dateOfBirth ||
    !paymentStatus ||
    !parentName ||
    !parentPhone ||
    !joinDate ||
    !emergencyContactName ||
    !emergencyContactPhone
  ) {
    return { error: "Please fill in the required fields (marked *)." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== studentId) {
    return { error: "A user with that email already exists." };
  }

  await prisma.user.update({
    where: { id: studentId, role: "STUDENT" },
    data: {
      name,
      email,
      phone: optional(formData, "phone"),
      dateOfBirth: new Date(dateOfBirth),
      gender: optional(formData, "gender"),
      paymentStatus: paymentStatus as "PENDING" | "PAID" | "WAIVED",
      team: optional(formData, "team"),
      joinDate: new Date(joinDate),
      parentName,
      parentPhone,
      parentEmail: optional(formData, "parentEmail"),
      school: optional(formData, "school"),
      gradeYear: optional(formData, "gradeYear"),
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation: optional(
        formData,
        "emergencyContactRelation",
      ),
      medicalConditions: optional(formData, "medicalConditions"),
      dietaryRestrictions: optional(formData, "dietaryRestrictions"),
    },
  });

  revalidatePath(`/students/${studentId}`);
  revalidatePath("/students");
  redirect(`/students/${studentId}`);
}

export async function setActive(formData: FormData) {
  await requireStaff();

  const studentId = String(formData.get("studentId") ?? "");
  const active = formData.get("active") === "true";
  if (!studentId) return;

  await prisma.user.update({
    where: { id: studentId },
    data: { active },
  });

  revalidatePath(`/students/${studentId}`);
  revalidatePath("/students");
}

export async function updatePaymentStatus(formData: FormData) {
  await requireStaff();

  const studentId = String(formData.get("studentId") ?? "");
  const paymentStatus = String(formData.get("paymentStatus") ?? "");
  if (!studentId || !paymentStatus) return;

  await prisma.user.update({
    where: { id: studentId, role: "STUDENT" },
    data: { paymentStatus: paymentStatus as "PENDING" | "PAID" | "WAIVED" },
  });

  revalidatePath(`/students/${studentId}`);
  revalidatePath("/students");
}

export type ResetPasswordState = { error: string | null; success: boolean };

export async function resetPassword(
  studentId: string,
  _prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  await requireStaff();

  const newPassword = String(formData.get("newPassword") ?? "");
  if (newPassword.length < 8) {
    return {
      error: "New password must be at least 8 characters.",
      success: false,
    };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: studentId },
    data: { passwordHash },
  });

  return { error: null, success: true };
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
