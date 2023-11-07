import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";
import { Prisma } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { page } = req.query;
      const { searchText, role } = req.body;
      const isPartner = role === "Partner" ? { isPartner: true } : {};

      const options: Prisma.UserFindManyArgs = {
        where: {
          AND: [
            {
              OR: [
                { email: { contains: searchText, mode: "insensitive" } },
                { name: { contains: searchText, mode: "insensitive" } },
              ],
            },
            {
              OR: [{ userRole: { contains: role } }, isPartner],
            },
          ],
        },
        orderBy: [{ emailVerified: "desc" }],
        include: {
          mainPartner: true,
          subjectPartners: true,
        },
        skip: Number(page) > 1 ? (Number(page) - 1) * paginatePageSize : 0,
        take: paginatePageSize,
      };

      const [totalPage, users] = await Promise.allSettled([
        prisma.user.count({ where: { ...options.where } }),
        prisma.user.findMany(options),
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
