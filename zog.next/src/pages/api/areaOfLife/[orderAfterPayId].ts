import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const orderAfterPayId = req.url?.split("/").slice(-1);

  try {
    if (orderAfterPayId?.[0]) {
      const result = await prisma.areaOfLife.findFirst({
        where: { orderAfterPayId: orderAfterPayId?.[0] },
      });

      if (result) {
        res.status(200).json(
          ResponseHandler.onSuccess({
            data: {
              id: result.id,
              orderAfterPayId: result.orderAfterPayId,
              pitta: [result.pittaFirst, result.pittaSecond],
              wata: [result.wataFirst, result.wataSecond],
              kapha: [result.kaphaFirst, result.kaphaSecond],
            },
          })
        );
      } else {
        res.status(200).json(
          ResponseHandler.onSuccess({
            data: { orderAfterPayId: orderAfterPayId?.[0] },
          })
        );
      }
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ data: e }));
  }
}
