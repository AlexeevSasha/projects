import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { RobokassaController } from "../../../backend/controllers/robokassaController";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { utm, form, price } = req.query;

    const sum = Number(price) || 1;

    const url = new RobokassaController({
      utm,
      form,
      price: String(sum),
    }).init("Личная диагностика и консультация");
    return res.status(200).json({ url });
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
