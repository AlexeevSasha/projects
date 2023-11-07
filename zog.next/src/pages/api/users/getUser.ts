import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const [totalPage, users] = await Promise.allSettled([
        prisma.user.count(),
        prisma.user.findMany({
          orderBy: [{ emailVerified: "desc" }],
          include: {
            mainPartner: true,
            subjectPartners: true,
          },
          skip: 0,
          take: paginatePageSize,
        }),
      ]);
      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Пользователи найдены",
          data: {
            userList: users.status === "fulfilled" ? users.value : [],
            totalPage: totalPage.status === "fulfilled" ? totalPage.value : 0,
          },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
