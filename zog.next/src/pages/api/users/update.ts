import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, ...details } = req.body;
    try {
      await prisma.user.update({
        where: { id },
        data: details,
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Данные успешно обновлены",
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось изменить профиль" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
