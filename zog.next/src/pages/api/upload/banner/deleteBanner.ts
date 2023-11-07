import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "../../../../server/db/client";
import { UploadFileGoogleDrive } from "../../../../backend/controllers/uploadFileGoogleDrive";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "DELETE") {
    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));

    const { id } = req.query;

    try {
      const banner = await prisma.banners.findFirst({ where: { public_id: String(id) } });

      if (!banner)
        return res
          .status(400)
          .json(ResponseHandler.onError({ message: "Такого баннера не существует" }));

      await new UploadFileGoogleDrive().delete(banner.public_id);
      await prisma.banners.delete({ where: { id: banner.id } });
      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Баннер успешно удалён", data: true }));
    } catch (error) {
      res.status(400).json(ResponseHandler.onError({ message: "Не удалось удалить баннер" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
