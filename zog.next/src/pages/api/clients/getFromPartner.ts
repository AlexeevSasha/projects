import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Апи для получения списка заявокб что привязаны к его utm
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user?.userRole === "Partner" || session?.user?.isPartner) {
      const result = await prisma.orderAfterPay.findMany({
        where: {
          utm_partner: session?.user?.utm_partner,
        },
        orderBy: [{ createdAt: "desc" }],
      });
      res.status(200).json(ResponseHandler.onSuccess({ data: result }));
    } else {
      res.status(400).json(ResponseHandler.onError({ message: "У вас недостаточно прав" }));
    }
  } catch (e) {}
}
