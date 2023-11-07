import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { UploadFileGoogleDrive } from "../../../../backend/controllers/uploadFileGoogleDrive";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const uploadFileGoogleDrive = new UploadFileGoogleDrive();

    const [clientsPhoto, clientsAudio] = await Promise.allSettled([
      uploadFileGoogleDrive.getByIdFolder(process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID as string),
      uploadFileGoogleDrive.getByIdFolder(
        process.env.NEXT_PUBLIC_GOOGLE_DRIVE_AUDIO_FOLDER_ID as string
      ),
    ]);

    res.status(200).json(
      ResponseHandler.onSuccess({
        data: {
          clientsPhoto: clientsPhoto.status === "fulfilled" ? clientsPhoto.value : [],
          clientsAudio: clientsAudio.status === "fulfilled" ? clientsAudio.value : [],
        },
      })
    );
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
