import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { UploadFileGoogleDrive } from "../../../backend/controllers/uploadFileGoogleDrive";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));

    try {
      const { id, photoName, photoId } = req.query;

      await new UploadFileGoogleDrive().delete(photoId as string);

      const order = await prisma.orderAfterPay.findFirst({
        where: { id: id as string },
      });

      const photos = order?.photos as [];

      const index = photos.findIndex((el) => el === photoName);
      const newPhotos = [...photos.slice(0, index), ...photos.slice(index + 1)];

      //change db
      await prisma.orderAfterPay.update({
        where: { id: id as string },
        data: { photos: newPhotos },
      });

      res.status(200).json(ResponseHandler.onSuccess({ message: "Фотограяфия  удалена" }));
    } catch (e) {
      console.log(e);
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось удалить фотография" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
