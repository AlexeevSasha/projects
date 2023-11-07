import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));

    try {
      const { id } = req.query;

      const user = await prisma.orderAfterPay.findUnique({
        where: { id: id as string },
      });

      if (!user) res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));

      await prisma.orderAfterPay.delete({
        where: { id: user?.id },
      });

      res.status(200).json(ResponseHandler.onSuccess({ message: "Заявка удалена" }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось удалить заявку" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
