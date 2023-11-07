import { type NextApiRequest, type NextApiResponse } from "next";
import { StripeController } from "../../../../backend/controllers/stripeController";
import { IStripePayment } from "../../../../backend/interfaces/stripe";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { price, utm, form, currency, successUrl } = req.query;

    const success = typeof successUrl === "string" && successUrl ? successUrl : null;

    const options: IStripePayment = {
      success_url: success || `${process.env.NEXTAUTH_URL}/redirect/stripe/after-pay`,
      price: Number(price) || 60,
      currency: typeof currency === "string" ? currency : "eur",
      utm: typeof utm === "string" ? utm : "",
      form: typeof form === "string" ? form : "",
    };

    try {
      const stripe = await new StripeController().createPayment(options);
      res.status(200).json(ResponseHandler.onSuccess({ data: { url: stripe.url } }));
    } catch (e) {
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "Не удалось создать оплату", data: { url: "" } }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
