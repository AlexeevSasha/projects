import { type NextApiRequest, type NextApiResponse } from "next";
import { StripeController } from "../../../../backend/controllers/stripeController";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== "string") throw new Error();

    try {
      const details = await new StripeController().getById(session_id);
      res.status(200).json(ResponseHandler.onSuccess({ data: details }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Произошла ошибка" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
