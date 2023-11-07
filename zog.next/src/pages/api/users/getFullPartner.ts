import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
      return res.status(400).json(ResponseHandler.onError({ message: "Вы не авторизованы" }));
    }
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: session?.user?.id,
        },
        include: {
          mainPartner: true,
          subjectPartners: true,
        },
      });

      const paysSubPartner = await prisma.paymentFromSubjectPartners.findMany({
        where: { partnerId: user?.id || "" },
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Партнёр успешно получен",
          data: {
            user,
            paysSubPartner,
          },
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
