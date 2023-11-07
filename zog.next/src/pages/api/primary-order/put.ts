import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { IPrimaryOrder } from "../../../modules/primary-order/interfaces/PrimaryOrder";

/**
 * Апи для получения списка заявок
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "PUT") {
      const { id, ...arg } = req.body as IPrimaryOrder;

      const order = await prisma.primaryForm.update({
        where: { id },
        data: { ...(arg as any) },
      });

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Статус успешно обновлён", data: order }));
    }
  } catch (e) {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
