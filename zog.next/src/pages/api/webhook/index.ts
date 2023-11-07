import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      if (req.body.password === "zog") {
        const result = await prisma.webHook.findMany();

        res.status(200).json(ResponseHandler.onSuccess({ message: "", data: result }));
      } else {
        res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
      }
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
