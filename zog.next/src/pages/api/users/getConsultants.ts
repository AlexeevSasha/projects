import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const userList = await prisma.user.findMany({
        where: { userRole: "Consultant" },
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "пользователь найден",
          data: userList,
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else if (req.method === "GET") {
    const consultantList = await prisma.user.findMany({
      where: { userRole: "Consultant" },
    });

    res.status(200).json(
      ResponseHandler.onSuccess({
        message: "консультанты найдены",
        data: consultantList,
      })
    );
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
