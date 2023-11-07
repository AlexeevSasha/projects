import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.url?.split("/").slice(-1);

  if (id?.[0]) {
    const result = await prisma.orderAfterPay.findFirst({ where: { id: id[0] } });

    res.status(200).json(ResponseHandler.onSuccess({ data: result }));
  } else {
    res.status(400).json(ResponseHandler.onError({ message: "Такой заявки нет" }));
  }
}
