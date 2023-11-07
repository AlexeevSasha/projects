import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { EmailController } from "../../../../backend/controllers/emailController";
import { HtmlReadFilesController } from "../../../../backend/controllers/htmlReadFileController";
import { HtmlEnum } from "../../../../backend/interfaces/html";
import { AuthFromManualHtml } from "../../../../backend/utils/htmlEmail";
import { replaceHtmlString } from "../../../../backend/utils/replaceHtmlString";
import { prisma } from "../../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { EMail, shp_form } = req.body;

      const manual = await prisma.manualTransaction.findFirst({
        where: { transactionId: shp_form },
      });

      const email = manual?.email || EMail;

      await Promise.all([
        new EmailController().sendEmail({
          to: email,
          subject: "Вам подарок! Доступ в ваш личный кабинет",
          html: AuthFromManualHtml({
            url: `${process.env.NEXTAUTH_URL}/redirect/auto-login?email=${email}&manual=true`,
            host: String(process.env.NEXTAUTH_URL),
          }),
        }),
        new EmailController().sendEmail({
          to: email,
          subject: "Скачать методическое пособие Олега Торсунова",
          html: replaceHtmlString(
            new HtmlReadFilesController().readFile(HtmlEnum.DOWNLOAD_METHODOLOGY),
            ["name", "gift"],
            [
              email || "",
              `${process.env.NEXTAUTH_URL}/redirect/auto-login?email=${email}&manual=true`,
            ]
          ),
        }),
      ]);

      if (manual) {
        await prisma.manualTransaction.delete({
          where: {
            id: manual.id,
          },
        });
      }

      res.status(200).json({});
    } catch (e) {
      res.status(200).json(ResponseHandler.onError({ data: { send: false } }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
