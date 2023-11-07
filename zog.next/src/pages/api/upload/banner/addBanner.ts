import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { UploadFileGoogleDrive } from "../../../../backend/controllers/uploadFileGoogleDrive";
import { prisma } from "../../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface IFields {
  [key: string]: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    if (session?.user?.userRole !== "Admin")
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "У вас нет прав для данной операции" }));
    try {
      const uploadFileGoogleDrive = new UploadFileGoogleDrive();
      const result = await uploadFileGoogleDrive.parseForm<IFields>(req);
      const files = await uploadFileGoogleDrive.init(result.files, "banners");

      const role = Object.entries(result.fields)
        .filter(([key]) => /^role/i.test(key))
        .map(([_, value]) => value);

      const count = await prisma.banners.count();

      const prismaFiles = files.map((el, i) => ({
        public_id: el.id,
        url: `${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_URL_IMAGE}${el.id}`,
        access: role,
        order: count + i + 1,
        link: result.fields.link || "",
      }));

      await prisma.banners.createMany({ data: prismaFiles });
      const banners = await prisma.banners.findMany();

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Баннеры успешно добавлены", data: banners }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Ошибка при загрузки файла" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
