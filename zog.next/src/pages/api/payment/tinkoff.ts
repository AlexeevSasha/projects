import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { ITinkoffResponse } from "../../../backend/interfaces/tinkoff";
import { prisma } from "./../../../server/db/client";
import { leaveOnlyNumbers } from "../../../backend/utils/leaveOnlyNumbers";
import { generateQuery } from "../../../common/constants/generateQuery";
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body as ITinkoffResponse;

    if (body.status !== "signed") {
      res.status(400).json(ResponseHandler.onError({ message: "Договор не подписан" }));
      return;
    }

    const allForms = await prisma.primaryForm.findMany();
    const form = allForms.find((el) => {
      const phone = leaveOnlyNumbers(el.phone) === leaveOnlyNumbers(body.phone);
      const email = el.email === body?.email;
      return phone || email;
    });

    if (!form) {
      res.status(400).json(
        ResponseHandler.onError({
          message: "К сожалению не удалось найти заявку на обзвон по email и телефону ",
        })
      );
      return;
    }

    const query = generateQuery({
      form: form.form,
      utm: form.utm,
      id: body.id,
      email: body?.email || form.email,
    });

    await axios.get(`${process.env.NEXTAUTH_URL}/api/payment/linkAfterPay${query}`);

    res.status(200).json(ResponseHandler.onSuccess({ message: "Письмо отправлено" }));
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
