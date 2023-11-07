import { type NextApiRequest, type NextApiResponse } from "next";
import { getObjectPrimaryForm } from "../../../common/constants/getObjectPrimaryForm";
import { prisma } from "../../../server/db/client";
import { GoogleTableController } from "../../../backend/controllers/googleTableController";

const testPrimaryForm = {
  "utm": "68e5d495-fcd3-421e-975f-0247c9d1a5c3",
  "Name": "тестовый",
  "form": "idlj3y9fxomwjcylujir",
  "Email": "test@mail.ru",
  "Input": "воспалительные процессы инпут 1",
  "Phone": "7786783783",
  "formid": "form604936951",
  "tranid": "5489108:4802756061",
  "COOKIES":
    "tildauid=1683005070965.291836; TILDAUTM=utm_partner%3D48ef68a1-d25a-44f8-a369-59860bccfc4f%7C%7C%7C; _ym_uid=1683005071211222035; _ym_d=1686896228; utm_partner=ab9dd330-7322-400a-b09f-7b8b4957202d; tildasid=1687178345815.310247; previousUrl=consultation.torsunov.ru%2Fform; _ym_isad=2; _ym_visorc=w",
  "Input_2": "воспалительные процессы  инпут 2",
  "Input_3": "повышенное/пониженное давление  инпут 1",
  "Input_4": "повышенное/пониженное давление  инпут 2",
  "Input_5": "доброкачественные/злокачественные опухоли  инпут 1",
  "Input_6": "доброкачественные/злокачественные опухоли  инпут 2",
  "Input_7": "сердечно сосудистые заболевания инпут 1",
  "Input_8": "сердечно сосудистые заболевания инпут 2",
  "Input_9": "заболевания зрительного аппарата инпут 1",
  "Input_10": "заболевания зрительного аппарата инпут 2",
  "Input_11": "заболевания суставов  инпут 1",
  "Input_12": "заболевания суставов  инпут 2",
  "utm_partner": "48ef68a1-d25a-44f8-a369-59860bccfc4f",
  "Укажите_Ваш_часовой_пояс": "+3",
  "Укажите_удобный_мессенджер_для_связи": "Telegram",
  "1__Имеются_ли_у_Вас_на_данный_момент_воспалительные_процессы_в_организме": "не имеются",
  "2__Беспокоит_ли_Вас_повышенноепониженное_давление_или_какие_либо_наружные_и_внутренние_кровотечения":
    "не беспокоит",
  "6__Имеются_ли_у_Вас_заболевания_суставов_остеопороз_неокрепшие_костные_мозоли_разрывы_сухожилий_и_связок":
    "не имеются",
  "3__Имеются_ли_у_вас_доброкачественныезлокачественные_опухоли_и_новообразования_в_организме_миома_киста_аденома_и_т_д_":
    "не имеются",
  "4__Имеются_ли_у_Вас_сердечно_сосудистые_заболевания_аневризма_сердца_и_аорты_атеросклероз_эмболия_ишемическая_болезнь_сердца_и_т_д_":
    "имеются",
  "5__Имеются_ли_у_вас_заболевания_зрительного_аппарата_отслойка_сетчатки_прогрессирующая_миопия_дегенеративные_процессы_роговицы_и_т_д_":
    "имеются",
};

export default async function getAllClients(req: NextApiRequest, res: NextApiResponse) {
  try {
    let partner = "";
    const primaryForm = getObjectPrimaryForm(testPrimaryForm);
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
    res.status(200).json({ title: "verified" });
  } catch (e) {
    res.status(500).json({ title: "500 error" });
  }
}
