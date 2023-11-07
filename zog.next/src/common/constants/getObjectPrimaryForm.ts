import { ITildaPrimaryForm } from "../interfaces/PrimaryForm";

const defaultPrimaryForm = {
  name: "",
  email: "",
  phone: "",
  timeZone: "",
  messenger: "",
  utm: "",
  form: "",
  inflammation: {},
  pressure: {},
  tumor: {},
  cardiovascular: {},
  vision: {},
  joints: {},
  status: "new",
};

const firstFormKeysTilda: { [key: string]: string } = {
  "Name": "name",
  "Email": "email",
  "Phone": "phone",
  "utm": "utm",
  "form": "form",
  "Укажите_Ваш_часовой_пояс": "timeZone",
  "Укажите_удобный_мессенджер_для_связи": "messenger",
  "1__Имеются_ли_у_Вас_на_данный_момент_воспалительные_процессы_в_организме": "inflammation",
  "2__Беспокоит_ли_Вас_повышенноепониженное_давление_или_какие_либо_наружные_и_внутренние_кровотечения":
    "pressure",
  "3__Имеются_ли_у_вас_доброкачественныезлокачественные_опухоли_и_новообразования_в_организме_миома_киста_аденома_и_т_д_":
    "tumor",
  "4__Имеются_ли_у_Вас_сердечно_сосудистые_заболевания_аневризма_сердца_и_аорты_атеросклероз_эмболия_ишемическая_болезнь_сердца_и_т_д_":
    "cardiovascular",
  "5__Имеются_ли_у_вас_заболевания_зрительного_аппарата_отслойка_сетчатки_прогрессирующая_миопия_дегенеративные_процессы_роговицы_и_т_д_":
    "vision",
  "6__Имеются_ли_у_Вас_заболевания_суставов_остеопороз_неокрепшие_костные_мозоли_разрывы_сухожилий_и_связок":
    "joints",
};

const onlyField = ["inflammation", "pressure", "tumor", "cardiovascular", "vision", "joints"];

const addMoreField = (form: any, key: string, value: string) => {
  const index = onlyField.indexOf(key);
  if (!~index) return value || "";

  const num = index * 2;

  return {
    indicate: value || "",
    description: num === 0 ? form["Input"] || "" : form[`Input_${num + 1}`] || "",
    diagnosis: form[`Input_${num + 2}`] || "",
  };
};

export const getObjectPrimaryForm = (form: ITildaPrimaryForm) => {
  const firstForm: any = {};

  Object.entries(form).forEach(([key, value]) => {
    const keyName = firstFormKeysTilda[key];
    if (keyName) firstForm[keyName] = addMoreField(form, keyName, value);
  });

  return { ...defaultPrimaryForm, ...firstForm };
};
