import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import axios from "axios";
import { generateQuery } from "../../../common/constants/generateQuery";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { EMail, shp_form, shp_id, shp_utm } = req.body;

    const query = generateQuery({ form: shp_form, utm: shp_utm, id: shp_id, email: EMail });
    await axios.get(`${process.env.NEXTAUTH_URL}/api/payment/linkAfterPay${query}`);
    res.status(200).json(ResponseHandler.onSuccess({ message: "Письмо отправлено" }));
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
