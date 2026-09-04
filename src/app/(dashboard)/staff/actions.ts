"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateStaffState = { error: string | null };

async function requireStaff() {
  const session = await auth();
  if (!session || session.user.role !== "STAFF") {
    throw new Error("Not authorized");
  }
  return session;
}

export async function createStaff(
  _prevState: CreateStaffState,
  formData: FormData,
): Promise<CreateStaffState> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    return {
      error:
        "Name, email, and a password of at least 8 characters are required.",
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash, role: "STAFF" },
  });

  revalidatePath("/staff");
  redirect("/staff");
}

export async function setStaffActive(formData: FormData) {
  const session = await requireStaff();

  const userId = String(formData.get("userId") ?? "");
  const active = formData.get("active") === "true";
  if (!userId || userId === session.user.id) return;

  await prisma.user.update({
    where: { id: userId, role: "STAFF" },
    data: { active },
  });

  revalidatePath("/staff");
  revalidatePath(`/staff/${userId}`);
}

export type UpdateStaffState = { error: string | null };

export async function updateStaff(
  staffId: string,
  _prevState: UpdateStaffState,
  formData: FormData,
): Promise<UpdateStaffState> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== staffId) {
    return { error: "A user with that email already exists." };
  }

  await prisma.user.update({
    where: { id: staffId, role: "STAFF" },
    data: { name, email, phone: phone || null },
  });

  revalidatePath(`/staff/${staffId}`);
  revalidatePath("/staff");
  redirect(`/staff/${staffId}`);
}

export type ResetStaffPasswordState = { error: string | null; success: boolean };

export async function resetStaffPassword(
  staffId: string,
  _prevState: ResetStaffPasswordState,
  formData: FormData,
): Promise<ResetStaffPasswordState> {
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
    where: { id: staffId, role: "STAFF" },
    data: { passwordHash },
  });

  return { error: null, success: true };
}
