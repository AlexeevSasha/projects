import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { UploadFileGoogleDrive } from "../../../../backend/controllers/uploadFileGoogleDrive";
import { IPaymentForm } from "../../../../modules/payment/interfaces/Payment";
import formidable from "formidable";
import { prisma } from "../../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));
    try {
      const uploadFileGoogleDrive = new UploadFileGoogleDrive();
      const result = await uploadFileGoogleDrive.parseForm<IPaymentForm>(req);
      const file = await uploadFileGoogleDrive
        .saveFile(
          result.files.file as formidable.File,
          process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PAYMENT_FOLDER_ID
        )
        .then((data) => data.data);

      const banner = await prisma.paymentBanners.create({
        data: {
          image_id: file.id,
          url: `${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_URL_IMAGE}${file.id}`,
          currency: result.fields.currency,
          sum: result.fields.sum,
          system: result.fields.system,
          successUrl: result.fields.successUrl,
        },
      });

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Баннеры успешно добавлены", data: banner }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Ошибка при загрузки файла" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
