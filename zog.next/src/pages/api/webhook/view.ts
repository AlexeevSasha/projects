import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { randomUUID } from "crypto";

const adminIps = ["185.15.62.111"];

export default async function webhookView(req: NextApiRequest, res: NextApiResponse) {
  let result: any = { ok: randomUUID() };
  const ipv4 = (req.headers["x-real-ip"] ?? req.socket.remoteAddress ?? "").toString();
  // if (adminIps.includes(ipv4)) {
  result = await prisma.webHook.findMany();
  // }
  //return response
  res.status(200).json(result);
}
