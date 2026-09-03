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
