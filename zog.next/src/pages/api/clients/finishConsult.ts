import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";
import { SendEmailEnum } from "../../../common/interfaces/SendEmail";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));

    try {
      const order = await prisma.orderAfterPay.findMany({ where: { stage: "finish" } });
      const send = order.map((el) =>
        axios.post(`${process.env.NEXTAUTH_URL}/api/email/sendEmail`, {
          email: el.email,
          type: SendEmailEnum.CONSULTATION_CONDUCTED,
          details: {
            name: el.name,
          },
        })
      );
      await Promise.all(send);

      res.status(200).json(ResponseHandler.onSuccess({ message: "Всё отправлено", data: order }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
