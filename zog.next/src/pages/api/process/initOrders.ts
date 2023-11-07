import { prisma } from "../../../server/db/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getCookie } from "../../../backend/utils/getCookie";
import { InvoicePartnerController } from "../../../backend/controllers/invoicePartnerController";

export default async function getAllClients(req: NextApiRequest, res: NextApiResponse) {
  try {
    const medDocs: any[] = [];
    const photos: any[] = [];
    for (const [key, value] of Object.entries(testData)) {
      if (key === " about_photos") continue;
      if (key.includes("photos")) {
        photos.push(value); // Добавляет в массив все фотографии пользователя. Фотографии приходят в виде photos_0, photos_1, photos_2, ...
      }
      if (key.includes("med_files_")) {
        medDocs.push(value); // Добавляет в массив все медицинские документы пользователя. Они приходят в виде med_files_0, med_files_1, med_files_2, ...
      }
    }

    const utm_partner = getCookie(testData.COOKIES, "utm_partner") || "";

    const order = await prisma.orderAfterPay.create({
      data: {
        stage: "new",
        formid: testData.formid,
        formname: testData.formname,
        name: testData.name,
        birthdate: testData.birthdate,
        location: testData.location,
        illnesses: testData.illnesses,
        med_files: medDocs,
        health_state: testData.health_state,
        aims: testData.aims,
        hebits: testData.hebits,
        about_photos: testData.about_photos,
        photos: photos,
        phone: testData.phone,
        radio: testData.Radio,
        utm_partner: testData.utm_partner || utm_partner,
        email: testData.email,
      },
    });

    /**
     * Если у пользователя есть utm метка, то добавляет на счёт партнёра определённую сумму
     */
    if (order.utm_partner) {
      const money = Number(process.env.PARTNER_INVOICE_COUNT) || 0;
      const response = await new InvoicePartnerController(money).init(order.utm_partner);

      if (response.error) {
        res.status(400).json({ title: response.message, utm_partner: order.utm_partner });
        return;
      }
    }

    res.status(200).json({ title: "verified" });
  } catch (e) {
    res.status(500).json({ title: "500 error" });
  }
}

/** Тестовая заявка */
const testData: any = {
  aims: "тест",
  name: "Тестовая заявка",
  Radio: "Whatsapp",
  email: "a.alexeev@dextechnology.com",
  phone: "13477828393",
  formid: "form517733198",
  hebits: "тест",
  photos: "",
  tranid: "5489108:4856178461",
  COOKIES:
    "_ym_visorc=w; previousUrl=consultation.torsunov.ru%2Facceptzozh; tildasid=1688414435035.127265; tildauid=1688403815387.866932; _ym_isad=2; _ym_d=1688403818; _ym_uid=1688403818831115761",
  formname: "Онлайн - консультации ",
  location: "тест",
  birthdate: "09-12-1959",
  illnesses: "тест",
  health_state: "тест",
};
