import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "../../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));
    try {
      const { link, id, access } = req.body;
      await prisma.banners.update({ where: { id }, data: { link, access } });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Порядок баннеров успешно обновлён",
          data: { update: true },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Ошибка баннеров" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
