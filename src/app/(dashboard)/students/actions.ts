"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
