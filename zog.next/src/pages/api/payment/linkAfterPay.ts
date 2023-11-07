import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import axios from "axios";
import { SendEmailEnum } from "../../../common/interfaces/SendEmail";

/**
 * отправка уникальной ссылки после оптлаты на почту
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { utm, form, email, id } = req.query;

    try {
      const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/email/getUniqToken`, {
        utm,
        form,
        id,
      });

      await Promise.allSettled([
        axios.post(`${process.env.NEXTAUTH_URL}/api/email/sendEmail`, {
          type: SendEmailEnum.FORM_AFTER_PAY,
          details: {
            url: data.url,
          },
          email,
        }),
        axios.post(`${process.env.NEXTAUTH_URL}/api/email/sendEmail`, {
          type: SendEmailEnum.FORM_AFTER_PAY_ADMIN,
          details: {
            url: data.url,
            email: email,
          },
          email: process.env.EMAIL_ADMIN_AFTER_PAY,
        }),
      ]);

      res.status(200).json({ send: true });
    } catch (e) {
      res.status(200).json({ send: false });
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
