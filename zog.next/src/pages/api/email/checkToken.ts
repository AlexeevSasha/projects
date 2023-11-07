import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

/**
 * проверка, что токен есть в базе
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { token } = req.query as { token: string };

    if (!token) {
      return res.json({ redirect: false });
    }

    const isToken = await prisma.uniqTokenForm.findFirst({
      where: {
        token,
      },
    });

    if (!isToken) {
      return res.json({ redirect: false });
    } else {
      return res.json({ redirect: true });
    }
  } else {
    res.status(404).json({ redirect: false });
  }
}
