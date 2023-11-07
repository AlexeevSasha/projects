import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

export default async function processWebHooks(req: NextApiRequest, res: NextApiResponse) {
  // // pipelines
  // const pipelines = await prisma.pipeline.count();
  // if (!pipelines)
  //   await prisma.pipeline.create({
  //     data: {
  //       title: "Лиды",
  //       order: 0,
  //     },
  //   });

  // //pipeline statuses
  // const pipelineStatuses = await prisma.pipelineStatus.count();
  // if (!pipelineStatuses)
  //   await prisma.pipelineStatus.create({
  //     data: {
  //       title: "Новые",
  //       order: 1,
  //       pipelineId: 1,
  //     },
  //   });
  // if (pipelineStatuses == 1)
  //   await prisma.pipelineStatus.create({
  //     data: {
  //       title: "Заявки",
  //       order: 2,
  //       pipelineId: 1,
  //     },
  //   });

  //roles
  // let roleAdmin = await prisma.role.findFirst({ where: { title: "Admin" } });
  // if (!roleAdmin) roleAdmin = await prisma.role.create({ data: { title: "Admin" } });

  // const roleConsultant = await prisma.role.findFirst({
  //   where: { title: "Consultant" },
  // });
  // if (!roleConsultant) await prisma.role.create({ data: { title: "Consultant" } });

  // const rolePartner = await prisma.role.findFirst({
  //   where: { title: "Partner" },
  // });
  // if (!rolePartner) await prisma.role.create({ data: { title: "Partner" } });

  // const roleClient = await prisma.role.findFirst({
  //   where: { title: "Client" },
  // });
  // if (!roleClient) await prisma.role.create({ data: { title: "Client" } });

  // const roleWorker = await prisma.role.findFirst({ where: { title: "Worker" } });
  // if (!roleWorker) await prisma.role.create({ data: { title: "Worker" } });

  // const roleManager = await prisma.role.findFirst({
  //   where: { title: "Manager" },
  // });
  // if (!roleManager) await prisma.role.create({ data: { title: "Manager" } });

  // const roleExpert = await prisma.role.findFirst({
  //   where: { title: "Expert" },
  // });
  // if (!roleExpert) await prisma.role.create({ data: { title: "Expert" } });

  //give me admin
  // const me = await prisma.user.findFirst({
  //   where: { email: "curlychap@gmail.com" },
  // });
  // if (me) {
  //   if (
  //     !(await prisma.userRole.findFirst({
  //       where: { userId: me.id, roleId: roleAdmin.id },
  //     }))
  //   )
  //     await prisma.userRole.create({
  //       data: { userId: me.id, roleId: roleAdmin.id },
  //     });
  // }

  //return response
  res.status(200).json("Success init");
}
