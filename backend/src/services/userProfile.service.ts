import prisma from '../client';

export const getUserProfile = async (userId: string) => {
  prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};
