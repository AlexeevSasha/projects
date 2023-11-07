import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { EmailController } from "../../../backend/controllers/emailController";

/**
 * изменяет статус заявки на выплату на "Обработано"
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await prisma.partnerPayment.update({
        where: { id: req.body.id },
        data: { ...req.body, status: "ApprovedAdmin" },
      });

      // После изменения заявки, обновляем информация о счёте партнёра
      if (response.id) {
        const info = await prisma.partnerInvoice.findFirst({
          where: {
            partnerId: req.body.partnerId,
          },
        });
        if (info) {
          await prisma.partnerInvoice.update({
            where: { id: info.id },
            data: {
              //   balance: (Number(info?.balance) - Number(req.body.count)).toString(),
              underReview: (Number(info?.underReview) - Number(req.body.count)).toString(),
              approve: (Number(info?.approve) + Number(req.body.count)).toString(),
            },
          });
        }
        /**************************** */

        // Отправляем письмо на почту клиента, чтобы он видел что заявка была одобрена
        await new EmailController().sendEmail({
          to: req.body.partnerEmail,
          subject: `Заявка на выплату для партнёра: ${req.body.partnerEmail}`,
          html: `<p style="font-size:16px">Заявка на выплату для партнёра: ${req.body.partnerEmail}<br/>На сумму: ${req.body.count} ₽</p><p style="color:green;font-size:24px">Одобрено</p>`,
        });

        res.status(200).json(
          ResponseHandler.onSuccess({
            message: "Заявка о выплате одобрена",
            data: response,
          })
        );
      } else {
        res.status(400).json(ResponseHandler.onError({ message: "На счету недостаточно средств" }));
      }
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ data: e }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
