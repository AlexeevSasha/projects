// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// const partners = {
//   name: process.env.NEXT_PUBLIC_BACK_URL
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // res = 1;
  res.status(200).json({ url: process.env.NEXT_PUBLIC_BACK_URL });
}
