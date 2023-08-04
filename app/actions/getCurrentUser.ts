import { getServerSession } from 'next-auth/next';
import { getUser } from '../api/services/user.service';
import { authOptions } from '../lib/auth';

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

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
