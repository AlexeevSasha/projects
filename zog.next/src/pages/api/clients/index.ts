import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]";
import {
  getOrderAfterPayOption,
  postOrderAfterPayOption,
} from "../../../backend/utils/getOrderAfterPayOption";
import { Prisma } from "@prisma/client";
import { IOrderSearchParams } from "../../../modules/order/interfaces/FilterT";

/**
 * Апи для получения списка заявок
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    let options: Prisma.OrderAfterPayFindManyArgs;
    if (req.method === "POST") {
      const { page } = req.query;
      const params = req.body as IOrderSearchParams;
      options = postOrderAfterPayOption(session?.user, Number(page), params);
      console.log(options);
    } else {
      options = getOrderAfterPayOption(session?.user);
    }

    const [totalPage, orders] = await Promise.allSettled([
      prisma.orderAfterPay.count({ where: { ...options?.where } }),
      prisma.orderAfterPay.findMany(options),
    ]);

    res.status(200).json(
      ResponseHandler.onSuccess({
        data: {
          orders: orders.status === "fulfilled" ? orders.value : [],
          totalPage: totalPage.status === "fulfilled" ? totalPage.value : 0,
        },
      })
    );
  } catch (e) {}
}
