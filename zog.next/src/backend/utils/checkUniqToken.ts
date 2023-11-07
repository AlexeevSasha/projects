import { prisma } from "../../server/db/client";

export const checkUniqToken = async (token: string): Promise<boolean> => {
  if (!token) return false;
  const getToken = await prisma.uniqTokenForm.findFirst({
    where: { token },
  });

  if (getToken) {
    await prisma.uniqTokenForm.delete({
      where: { token },
    });
    return true;
  }
  return false;
};
