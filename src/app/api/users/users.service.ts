import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const createUser = async (data: {
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}) => {
  const { password, ...rest } = data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await prisma.users.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};

export const getUsers = async () => {
  return await prisma.users.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: {
    email?: string;
    password?: string;
    name?: string;
    firstname?: string;
    lastname?: string;
  }
) => {
  const { password, ...rest } = data;

  let updateData = { ...rest };
  let hashedPassword;

  if (password) {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  return await prisma.users.update({
    where: { id },
    data: {
      ...updateData,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.users.delete({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};
