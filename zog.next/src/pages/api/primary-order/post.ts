import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { Prisma } from "@prisma/client";
import { IPrimaryOrderSearchParams } from "../../../modules/primary-order/interfaces/PrimaryOrderSearchParams";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";

/**
 * Апи для получения списка заявок
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { page } = req.query;
      const params = req.body as IPrimaryOrderSearchParams;

      const rangeDate =
        params.endDate && params.startDate
          ? { createdAt: { lte: params.endDate, gte: params.startDate } }
          : {};

      const options: Prisma.PrimaryFormFindManyArgs = {
        where: {
          AND: [
            {
              OR: [
                { email: { contains: params.searchText, mode: "insensitive" } },
                { name: { contains: params.searchText, mode: "insensitive" } },
              ],
            },
            { status: { contains: params.status } },
            { ...rangeDate },
          ],
        },

        orderBy: { createdAt: "desc" },
        skip: Number(page) > 1 ? (Number(page) - 1) * paginatePageSize : 0,
        take: paginatePageSize,
      };
      const [totalPage, primaryOrders] = await Promise.allSettled([
        prisma.primaryForm.count({ where: { ...options?.where } }),
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
    }
  } catch (e) {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
