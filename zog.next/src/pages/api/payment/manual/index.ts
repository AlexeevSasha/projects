import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { RobokassaController } from "../../../../backend/controllers/robokassaController";
import { generateId } from "../../../../common/constants/generateId";
import { prisma } from "../../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { price, email } = req.query;

    const sum = Number(price) || 1;

    const formId = generateId();

    const url = new RobokassaController({
      form: formId,
      price: String(sum),
      type: "manual",
    }).init("Оплата методического пособия");

    await prisma.manualTransaction.create({
      data: {
        transactionId: formId,
        email: typeof email === "string" ? email : "",
      },
    });

    try {
      res.status(200).json(ResponseHandler.onSuccess({ data: { url } }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось создать оплату" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
