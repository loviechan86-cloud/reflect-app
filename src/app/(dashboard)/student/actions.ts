"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weekStart } from "@/lib/week";
import { revalidatePath } from "next/cache";

export async function submitReflection(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "STUDENT") {
    throw new Error("Not authorized");
  }

  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  const currentWeek = weekStart(new Date());

  await prisma.reflection.upsert({
    where: {
      studentId_weekOf: {
        studentId: session.user.id,
        weekOf: currentWeek,
      },
    },
    update: { content },
    create: {
      studentId: session.user.id,
      weekOf: currentWeek,
      content,
    },
  });

  revalidatePath("/student");
}

export type UpdateReflectionState = { error: string | null; success: boolean };

export async function updateReflection(
  reflectionId: string,
  _prevState: UpdateReflectionState,
  formData: FormData,
): Promise<UpdateReflectionState> {
  const session = await auth();
  if (!session || session.user.role !== "STUDENT") {
    throw new Error("Not authorized");
  }

  const content = String(formData.get("content") ?? "").trim();
  if (!content) {
    return { error: "Reflection can't be empty.", success: false };
  }

  const { count } = await prisma.reflection.updateMany({
    where: { id: reflectionId, studentId: session.user.id },
    data: { content },
  });
  if (count === 0) {
    return { error: "You can only edit your own reflection.", success: false };
  }

  revalidatePath("/student");
  return { error: null, success: true };
}

export async function deleteReflection(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "STUDENT") {
    throw new Error("Not authorized");
  }

  const reflectionId = String(formData.get("reflectionId") ?? "");
  if (!reflectionId) return;

  await prisma.reflection.deleteMany({
    where: { id: reflectionId, studentId: session.user.id },
  });

  revalidatePath("/student");
}
