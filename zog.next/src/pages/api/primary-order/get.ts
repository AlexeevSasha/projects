import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));

    try {
      const options: Prisma.PrimaryFormFindManyArgs = {
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: paginatePageSize,
      };

      const [totalPage, primaryOrders] = await Promise.allSettled([
        prisma.primaryForm.count(),
        prisma.primaryForm.findMany(options),
      ]);

      res.status(200).json(
        ResponseHandler.onSuccess({
          data: {
            primaryOrders: primaryOrders.status === "fulfilled" ? primaryOrders.value : [],
            totalPage: totalPage.status === "fulfilled" ? totalPage.value : 0,
          },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось получить заявки" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
