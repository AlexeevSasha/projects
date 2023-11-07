import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { InvoicePartnerController } from "../../../backend/controllers/invoicePartnerController";
import { getCookie } from "../../../backend/utils/getCookie";
import { checkUniqToken } from "../../../backend/utils/checkUniqToken";
import { getObjectPrimaryForm } from "../../../common/constants/getObjectPrimaryForm";
import { GoogleTableController } from "../../../backend/controllers/googleTableController";

/**
 * Записывает все входящие запросы в БД (все формы в тильде отправляют данные сюда)
 * @param req
 * @param res
 */
export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  //parsing request
  const { method, query, headers, cookies, ...r } = req;
  //getting url, params
  const { webhookParams, ...params } = query;
  const key = (webhookParams as string[]).join("/"); //like url, but without params
  //parse ipv4
  const ipv4 = (
    req.headers["x-real-ip"] ??
    req.headers["x-forwarded-for"] ??
    req.socket.remoteAddress ??
    ""
  ).toString();
  //parse post
  const post = req.body ?? {};
  //clean headers
  for (const k of [
    "cookie",
    "x-real-ip",
    "x-forwarded-for",
    "content-length",
    "connection",
    "x-forwarded-scheme",
    "sec-ch-ua-mobile",
    "dnt",
    "sec-fetch-mode",
  ])
    delete headers[k];

  //write webhook to db
  const hook = await prisma.webHook.create({
    data: {
      key,
      method,
      query: params,
      post,
      headers,
      cookies,
      ipv4,
      result: {},
    },
  });

  //prepair output
  const result = {
    ok: hook.id,
    // method,key,params,headers,cookies,ipv4,post
  };
  //save output
  await prisma.webHook.update({
    where: {
      id: hook.id,
    },
    data: {
      result,
    },
  });

  /**
   * Первичная форма
   * id формы в тильде form604936951
   */
  if (post?.formid === "form604936951") {
    let partner = "";
    const primaryForm = getObjectPrimaryForm(post);
    await prisma.primaryForm.create({ data: primaryForm });

    if (primaryForm.utm) {
      const user = await prisma.user.findFirst({ where: { utm_partner: primaryForm.utm } });
      if (user) {
        partner = `${user.name ? user.name + " / " : ""}${user.email}`;
      }
    }
    const tableRow = [
      `${primaryForm.name} / ${primaryForm.phone}`,
      "",
      primaryForm.messenger,
      "",
      "",
      partner,
    ];
    await new GoogleTableController().writeToTable(String(process.env.GOOGLE_TABLE_ID), tableRow);
  }

  /**
   * Если данные пришли из формы, которая отправляется после оплаты, то её данные нужно записать в таблицу заявок
   * id формы в тильде form517733198
   */
  if (post?.formid === "form517733198") {
    //проверка уникальности анкеты
    const checkToken = checkUniqToken(post?.token || "");
    const medDocs: string[] = [];
    const photos: string[] = [];
    for (const [key, value] of Object.entries(post)) {
      if (key === " about_photos") continue;
      if (key.includes("photos")) {
        photos.push(String(value)); // Добавляет в массив все фотографии пользователя. Фотографии приходят в виде photos_0, photos_1, photos_2, ...
      }
      if (key.includes("med_files")) {
        medDocs.push(String(value)); // Добавляет в массив все медицинские документы пользователя. Они приходят в виде med_files_0, med_files_1, med_files_2, ...
      }
    }

    //todo удалить когда перейдём на новую оплату
    const utm_partner = getCookie(post.COOKIES, "utm_partner") || "";

    const order = await prisma.orderAfterPay.create({
      data: {
        stage: "new",
        formid: post.formid,
        formname: post.formname,
        name: post.name,
        birthdate: post.birthdate,
        location: post.location,
        illnesses: post.illnesses,
        med_files: medDocs,
        health_state: post.health_state,
        aims: post.aims,
        hebits: post.hebits,
        about_photos: post.about_photos,
        photos: photos,
        phone: post.phone,
        radio: post.Radio,
        utm_partner: post?.utm_partner || utm_partner,
        email: post.email,
        type: "free",
        audio_comment: "",
      },
    });

    /**
     * Если у пользователя есть utm метка, то добавляет на счёт партнёра определённую сумму
     */
    if (order.utm_partner) {
      const money = Number(process.env.PARTNER_INVOICE_COUNT) || 0;
      if (!money) {
        res.status(400).json({
          title: "Недостаточно денег для начисления партнёру",
          utm_partner,
        });
        return;
      }

      const response = await new InvoicePartnerController(money).init(order.utm_partner);

      if (response.error) {
        res.status(400).json({ title: response.message, utm_partner: order.utm_partner });
        return;
      }
    }
  }

  res.status(200).json(result);
}
