import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { UploadFileGoogleDrive } from "../../../backend/controllers/uploadFileGoogleDrive";
import formidable from "formidable";
import { prisma } from "../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const uploadFileGoogleDrive = new UploadFileGoogleDrive();
      const result = await uploadFileGoogleDrive.parseForm<{ id: string; currentAudio: string }>(
        req
      );

      const file = await uploadFileGoogleDrive
        .saveFile(
          result.files.audio as formidable.File,
          process.env.NEXT_PUBLIC_GOOGLE_DRIVE_AUDIO_FOLDER_ID
        )
        .then((data) => data.data);

      const order = await prisma.orderAfterPay.update({
        where: { id: result.fields.id },
        data: { audio_comment: file.id },
      });

      if (result.fields.currentAudio) {
        await uploadFileGoogleDrive.delete(result.fields.currentAudio);
      }

      res.status(200).json(ResponseHandler.onSuccess({ message: "Аудио добавлено", data: order }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
