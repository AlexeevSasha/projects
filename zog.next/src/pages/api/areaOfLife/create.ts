import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await prisma.areaOfLife.create({
        data: {
          orderAfterPayId: req.body.orderAfterPayId,
          pittaFirst: req.body.pitta[0],
          pittaSecond: req.body.pitta[1],
          wataFirst: req.body.wata[0],
          wataSecond: req.body.wata[1],
          kaphaFirst: req.body.kapha[0],
          kaphaSecond: req.body.kapha[1],
        },
      });

      res
        .status(200)
        .json(
          ResponseHandler.onSuccess({ message: "Распределение создано", data: { id: response.id } })
        );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ data: e }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
