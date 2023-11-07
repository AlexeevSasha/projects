import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

/**
 * изменяет статус заявки на выплату на "Подтверждён"
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await prisma.partnerPayment.update({
        where: { id: req.body.id },
        data: { ...req.body, status: "ApprovedPartner" },
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Заявка о выплате подтверждена",
          data: response,
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ data: e }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
