import { User } from '@prisma/client';
import { getUser } from '../api/services/user.service';
import { getAuthSession } from '../lib/auth';

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await getUser(null, session.user.email as string);

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
