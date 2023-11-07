import { prisma } from "./../../../server/db/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { StatusPaymentOrder } from "../../../modules/partner/interfaces/StatusPaymentOrder";
import { EmailController } from "../../../backend/controllers/emailController";

/**
 * создаёт заявку на выплату
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);

      const info = await prisma.partnerInvoice.findFirst({
        where: {
          partnerId: session?.user?.id,
        },
      });
      // Проверка что баланс счёта может позволить выплату заданного размера
      if (info && Number(info?.balance) >= Number(req.body.count)) {
        const response = await prisma.partnerPayment.create({
          data: {
            ...req.body,
            status: StatusPaymentOrder.Created,
            partnerId: session?.user?.id,
            partnerEmail: session?.user?.email,
          },
        });

        // После создания заявки, обновляем информация о счёте партнёра
        if (response.id) {
          await prisma.partnerInvoice.update({
            where: { id: info.id },
            data: {
              balance: (Number(info?.balance) - Number(req.body.count)).toString(),
              underReview: (Number(info?.underReview) + Number(req.body.count)).toString(),
            },
          });
        }
        /**************************** */
        // Отправляем письмо на почту админа, чтобы он видел что была сделана заявка
        await new EmailController().sendEmail({
          to: process.env.EMAIL_ADMIN, // почта администратора
          subject: `Заявка на выплату от партнёра: ${session?.user?.email}`,
          text: `Заявка на выплату от партнёра: ${session?.user?.email}\n\nНа сумму: ${req.body.count} ₽`,
        });
        /**************************** */

        //TODO: Сохранение/удаление данных карты, если это нужно

        res.status(200).json(
          ResponseHandler.onSuccess({
            message: "Заявка о выплате отправлена администратору",
            data: { id: response.id },
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
