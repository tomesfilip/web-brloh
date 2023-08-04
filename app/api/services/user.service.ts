import { db } from '@/app/configs/db.config';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const getUser = async (
  id: string | null,
  email: string | null,
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id: id || undefined,
      email: email || undefined,
    },
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return db.user.create({
    data: {
      email: email,
      name: name,
      password: hash,
    },
  });
};
