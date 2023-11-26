"use server";
import { formSchemaType } from "@schemas/form";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { formSchema } from "@/schemas/form";

class UserNotFoundErr extends Error {}
export async function GetFormStats() {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    throw new UserNotFoundErr();
  }
  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits: number = stats._sum.visits || 0;
  const submissions: number = stats._sum.submissions || 0;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  let bounceRate = 100 - submissions;
  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Form not valid");
  }
  const user = await currentUser();
  console.log(user.id);
  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.create({
    data: { userId: user.id, name: data.name, description: data.description },
  });
  if (!form) {
    throw new Error("something went Wrong!!");
  }
}
export async function Getforms() {
  const user = await currentUser();
  console.log(user.id);
  if (!user) {
    throw UserNotFoundErr();
  }
  const data = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function GetFormByid(id) {
  const user = await currentUser();
  console.log(user.id, id);
  if (!user) {
    throw UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}
