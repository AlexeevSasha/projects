import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { UploadFileGoogleDrive } from "../../../backend/controllers/uploadFileGoogleDrive";
import { IParamChangeImageOrder } from "../../../modules/order/interfaces/ImageOrder";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const result = await new UploadFileGoogleDrive().parseForm<
        Omit<IParamChangeImageOrder, "file" | "photos"> & { photos: string }
      >(req);

      const { name, photos, photoId, id } = result.fields;

      //save photo to google drive
      await new UploadFileGoogleDrive().saveFile(
        result.files.file as formidable.File,
        process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID
      );

      const photosArray = photos.split(",");
      const index = photosArray.findIndex((el) => el === name);

      const newPhotos = [
        ...photosArray.slice(0, index),
        (result?.files?.file as formidable.File).originalFilename as string,
        ...photosArray.slice(index + 1),
      ];

      //change db
      const data = await prisma.orderAfterPay.update({
        where: { id },
        data: { photos: newPhotos },
      });

      //delete image to google drive
      await new UploadFileGoogleDrive().delete(photoId);

      res.status(200).json(ResponseHandler.onSuccess({ message: "Статус обновлён", data }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
