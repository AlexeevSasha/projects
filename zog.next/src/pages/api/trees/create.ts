import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await prisma.personalTrees.create({
        data: {
          orderAfterPayId: req.body.orderAfterPayId,
          trees: req.body.trees,
        },
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Деревья добавлены",
          data: { id: response.id },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ data: e }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
