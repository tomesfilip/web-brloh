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
  userData: Pick<User, 'username' | 'email' | 'password'>,
): Promise<User> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(userData.password, salt);

  return db.user.create({
    data: {
      email: userData.email,
      username: userData.username,
      password: hash,
    },
  });
};
