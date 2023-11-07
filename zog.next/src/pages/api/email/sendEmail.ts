import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { SendEmailEnum } from "../../../common/interfaces/SendEmail";
import { EmailController } from "../../../backend/controllers/emailController";
import {
  consultantHtml,
  consultantToClientHtml,
  consultConductedHtml,
  formAfterPay,
  formAfterPayAdmin,
} from "../../../backend/utils/htmlEmail";

export interface SendEmailBody {
  email: string;
  type: SendEmailEnum;
  details?: { [key: string]: string };
}

/**
 * отправка письма на почту
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, type, details } = req.body as SendEmailBody;

    if (!email) return res.status(200).json({ send: false });

    try {
      await new EmailController().sendEmail({
        to: email,
        subject: subject(type, details),
        html: html(type, details),
      });
      res.status(200).json(ResponseHandler.onSuccess({ message: "Письмо отправлено" }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось отправить письмо" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}

const subject = (type: SendEmailBody["type"], details: SendEmailBody["details"]) => {
  switch (type) {
    case SendEmailEnum.CONSULTANT:
      return "Вас назначили консультантом";
    case SendEmailEnum.CONSULTANT_TO_CLIENT:
      return "Вам назначили консультанта";
    case SendEmailEnum.FORM_AFTER_PAY:
      return "Ссылка на анкету";
    case SendEmailEnum.FORM_AFTER_PAY_ADMIN:
      return `Ссылка на анкету для пользователя - ${details?.email}`;
    case SendEmailEnum.CONSULTATION_CONDUCTED:
      return `Обратная связь для ${process.env.NEXTAUTH_URL}`;
  }
};

const html = (type: SendEmailBody["type"], details: SendEmailBody["details"]) => {
  switch (type) {
    case SendEmailEnum.CONSULTANT:
      return consultantHtml(details);
    case SendEmailEnum.CONSULTANT_TO_CLIENT:
      return consultantToClientHtml(details);
    case SendEmailEnum.FORM_AFTER_PAY:
      return formAfterPay(details);
    case SendEmailEnum.FORM_AFTER_PAY_ADMIN:
      return formAfterPayAdmin(details);
    case SendEmailEnum.CONSULTATION_CONDUCTED:
      return consultConductedHtml(details);
  }
};
