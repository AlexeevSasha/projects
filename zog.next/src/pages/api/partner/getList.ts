import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user?.userRole === "Admin") {
      let users = [];
      if (req.body.email) {
        // Поиск пользователей по части слова
        users = await prisma.user.findMany({
          where: { email: { contains: req.body.email }, userRole: "Partner" },
          orderBy: [{ emailVerified: "desc" }],
        });
      } else {
        users = await prisma.user.findMany({
          where: { userRole: "Partner" },
          orderBy: [{ emailVerified: "desc" }],
        });
      }

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "пользователь найден", data: users || [] }));
    } else {
      res.status(403).json(ResponseHandler.onError({ message: "доступ запрещён" }));
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}
