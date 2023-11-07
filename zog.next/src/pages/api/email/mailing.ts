import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { MailingController } from "../../../backend/controllers/mailingController";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const message = await new MailingController(req.body).init();
      res.status(200).json(ResponseHandler.onSuccess({ message }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось отправить письмо" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
