"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "MENTOR") {
    throw new Error("Not authorized");
  }

  const reflectionId = String(formData.get("reflectionId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const studentId = String(formData.get("studentId") ?? "");
  if (!content || !reflectionId) return;

  const reflection = await prisma.reflection.findUnique({
    where: { id: reflectionId },
    select: { student: { select: { mentorId: true } } },
  });
  if (!reflection || reflection.student.mentorId !== session.user.id) {
    throw new Error("Not authorized");
  }

  await prisma.comment.create({
    data: {
      reflectionId,
      mentorId: session.user.id,
      content,
    },
  });

  revalidatePath(`/mentor/${studentId}`);
}
