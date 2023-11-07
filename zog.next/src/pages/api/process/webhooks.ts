// import type { WebHook } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

//new webhook helper
const webHookQuery = async (key?: string) => {
  const where: any = { status: "new" };
  if (key) where.key = key;
  return await prisma.webHook.findMany({ where });
};

/**
 * преобразуем json в object
 * @param jsonVal
 */
const jsonObjectForce = (jsonVal: any) => {
  if (!jsonVal || typeof jsonVal !== "object") return {};
  return jsonVal;
};

/**
 * парсим данные из входящего вебхука в ассоциативный объект
 * @param webhookId
 * @param createdAt
 * @param ipv4
 * @param rec
 */
const tildaFormData = ({ id: webhookId, createdAt, ipv4, ...rec }: any) => {
  //parse json
  let cookies = jsonObjectForce(rec.cookies);
  const headers = jsonObjectForce(rec.headers);
  const post = jsonObjectForce(rec.post);

  //combine cookies
  if (post.COOKIES) {
    cookies = { ...cookies, ...parseCookie(post.COOKIES) };
    delete post.COOKIES;
  }
  const { referer = null } = headers;
  return {
    webhookId,
    createdAt,
    ipv4,
    referer,
    cookies,
    ...post,
  };
};

/**
 * создает сделку с минимумом параметров
 * @param title
 * @param data
 * @param statusId
 * @param order
 */
const createLead = async (title: string, data: any, statusId = 1, order = 1) => {
  const status = await prisma.pipelineStatus.findUniqueOrThrow({ where: { id: statusId } });
  const pipelineId = status.pipelineId;
  return await prisma.lead.create({
    data: {
      title,
      data: jsonObjectForce(data),
      order,
      statusId,
      pipelineId,
    },
  });
};

/**
 * Преобразует куки строку в объект
 * @param str
 */
const parseCookie = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: any, v: any[]) => {
      if (v[0] && v[1]) acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export default async function processWebHooks(req: NextApiRequest, res: NextApiResponse) {
  let leads = 0;
  // const input=JSON.parse("[{\"id\":\"cldugq7w00002k801dg3p9q55\",\"createdAt\":\"2023-02-07T16:34:58.800Z\",\"updatedAt\":\"2023-02-07T16:34:58.908Z\",\"key\":\"zozhLead\",\"status\":\"new\",\"error\":null,\"method\":\"POST\",\"query\":{\"webhookParams\":[\"zozhLead\"]},\"post\":{\"test\":\"test\"},\"headers\":{\"host\":\"amrita-center.ru\",\"accept\":\"*/*\",\"connection\":\"close\",\"user-agent\":\"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36 Tilda.cc/3740\",\"content-type\":\"application/x-www-form-urlencoded\",\"content-length\":\"9\",\"x-forwarded-for\":\"95.213.201.187\",\"x-forwarded-proto\":\"https\",\"x-forwarded-scheme\":\"https\"},\"cookies\":{},\"ipv4\":\"95.213.201.187\",\"result\":{\"ok\":\"cldugq7w00002k801dg3p9q55\"}},{\"id\":\"cldugs2lh0004k801xxw7pk9t\",\"createdAt\":\"2023-02-07T16:36:25.253Z\",\"updatedAt\":\"2023-02-07T16:36:25.270Z\",\"key\":\"zozhLead\",\"status\":\"new\",\"error\":null,\"method\":\"POST\",\"query\":{\"webhookParams\":[\"zozhLead\"]},\"post\":{\"Name\":\"callback\",\"Phone\":\"+79531166108\",\"formid\":\"form508388136\",\"tranid\":\"5489108:4282870741\",\"COOKIES\":\"tildauid=1669819412038.379201; _ym_uid=166981941248857364; _ym_d=1669819412; tmr_lvid=5f0c7bdf6c6e1afc02f3862382b87c2f; tmr_lvidTS=1675576268467; _ga=GA1.2.1591447729.1675576268; tildasid=1675786952647.498546; _ym_isad=1; previousUrl=consultation.torsunov.ru%2Fzozh; _ym_visorc=w\",\"Укажите_Ваш_часовой_пояс_\":\"3\",\"Укажите_удобный_мессенджер_для_связи\":\"Whats App\"},\"headers\":{\"host\":\"amrita-center.ru\",\"accept\":\"*/*\",\"referer\":\"https://consultation.torsunov.ru/zozh\",\"connection\":\"close\",\"user-agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36\",\"content-type\":\"application/x-www-form-urlencoded\",\"content-length\":\"751\",\"x-forwarded-for\":\"95.213.201.187\",\"x-forwarded-proto\":\"https\",\"x-forwarded-scheme\":\"https\"},\"cookies\":{},\"ipv4\":\"95.213.201.187\",\"result\":{\"ok\":\"cldugs2lh0004k801xxw7pk9t\"}}]");
  // const records=input.map(tildaFormData)
  // res.status(200).json(records);

  /**
   *
   */
  const zozhLeads = await webHookQuery("zozhLead");
  for (const i in zozhLeads) {
    const leadData = tildaFormData(zozhLeads[i]!);
    //create lead from parsed tilda form data
    let title = "Заявка ЗОЖ";
    let statusId = 2;
    if (leadData.formid !== "form536688758") {
      title = "Звонок ЗОЖ";
      statusId = 1;
    }

    const lead = await createLead(title, leadData, statusId);
    if (lead) {
      await prisma.webHook.update({
        where: { id: zozhLeads[i]!.id },
        data: {
          status: "done",
          result: {
            ...jsonObjectForce(zozhLeads[i]!.result),
            leadId: lead.id,
          },
        },
      });
      leads++;
    } else
      await prisma.webHook.update({
        where: { id: zozhLeads[i]!.id },
        data: {
          status: "error",
          error: "can't creating lead",
        },
      });
  }

  const other = await webHookQuery();

  res.status(200).json({
    zozhLeads: zozhLeads.length ?? 0,
    other: other.length ?? 0,
    // zl:zozhLeads.map(tildaFormData),
    leads,
  });
}
