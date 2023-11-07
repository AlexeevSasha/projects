import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { UploadFileGoogleDrive } from "../../../backend/controllers/uploadFileGoogleDrive";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const uploadFileGoogleDrive = new UploadFileGoogleDrive();
      const result = await uploadFileGoogleDrive.parseForm<{ id: string }>(req);

      const namePhotos: string[] = [];

      //add new photos to bd
      const paths = Object.values(result.files).map((el) => {
        namePhotos.push(el.originalFilename as string);
        return uploadFileGoogleDrive
          .saveFile(el, process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID)
          .then((data) => data.data);
      });
      await Promise.all(paths);

      //get by ID
      const data = await prisma.orderAfterPay.findFirst({
        where: { id: result.fields.id },
      });

      const photos =
        data?.photos && Array.isArray(data?.photos) ? [...data.photos, ...namePhotos] : namePhotos;

      const order = await prisma.orderAfterPay.update({
        where: { id: result.fields.id },
        data: { photos },
      });

      res.status(200).json(ResponseHandler.onSuccess({ message: "Статус обновлён", data: order }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
