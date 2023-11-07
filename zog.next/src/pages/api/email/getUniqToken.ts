import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import crypto from "crypto";
import { prisma } from "../../../server/db/client";
import { generateQuery } from "../../../common/constants/generateQuery";

/**
 * отправка уникальной ссылки после оптлаты на почту
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { form, utm, id } = req.body;

    const checkExists = await prisma.uniqTokenForm.findFirst({
      where: { session_id: id },
    });

    if (checkExists)
      return res.status(400).json(ResponseHandler.onError({ message: "Ссылка уже существует" }));

    const { token } = await prisma.uniqTokenForm.create({
      data: { token: crypto.randomUUID(), session_id: id },
    });

    const query = generateQuery({ form, utm }).replace("?", "&");
    res
      .status(200)
      .json({ url: `${process.env.NEXTAUTH_URL}/redirect/check-email?token=${token}${query}` });
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
