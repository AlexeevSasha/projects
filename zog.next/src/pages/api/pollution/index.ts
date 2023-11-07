import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Удаление из таблицы элементов, которых нет в теле запроса
      const pollutions = await prisma.pollution.findMany({
        where: { orderAfterPayId: req.body.orderAfterPayId },
      });
      pollutions.forEach(async (elem: any) => {
        if (!req.body.data.find((bodyElem: any) => bodyElem.id === elem.id)) {
          await prisma.pollution.delete({ where: { id: elem.id } });
        }
      });

      const response = await Promise.allSettled(
        req.body.data.map((elem: any) => {
          if (elem.id) {
            return prisma.pollution.update({
              where: {
                id: elem.id,
              },
              data: { ...elem },
            });
          } else {
            return prisma.pollution.create({
              data: {
                orderAfterPayId: req.body.orderAfterPayId,
                ...elem,
              },
            });
          }
        })
      );

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Капхи обновлено",
          data: {
            pollutions: Object.values(response).map((item) =>
              item.status === "fulfilled" ? item.value : null
            ),
          },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({}));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
