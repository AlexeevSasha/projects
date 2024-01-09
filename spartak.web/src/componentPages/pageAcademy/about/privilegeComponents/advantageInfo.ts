import { LocaleType } from "../../../../api/dto/LocaleType";

interface AdvantageInfo {
  icon: string;
  title: LocaleType;
  text: LocaleType;
}

export const advantageInfo: AdvantageInfo[] = [
  {
    icon: "iconPrivilege1.svg",
    title: { Ru: "Передовые <br/> методики", En: "Best <br/> practices" },
    text: {
      Ru: "Учебно-тренировочная программа Академии уникальна",
      En: "The training program of the Academy is unique",
    },
  },
  {
    icon: "iconPrivilege2.svg",
    title: { Ru: "Опытные <br/> тренеры", En: "Experienced <br/> trainers" },
    text: {
      Ru: "Наставники Академии - квалифицированные специалисты",
      En: "Academy mentors are qualified specialists",
    },
  },
  {
    icon: "iconPrivilege3.svg",
    title: { Ru: "Победные <br/> традиции", En: "Victory <br/> Traditions" },
    text: {
      Ru: "«Спартак» -самый титулованный клуб  в России",
      En: "«Spartak»  is the most titled club in Russia",
    },
  },
  {
    icon: "iconPrivilege4.svg",
    title: { Ru: "Развитая <br/> партнерская сеть", En: "Developed <br/> partner network" },
    text: {
      Ru: "Школы-партнеры Spartak City Football Academy и сети «Спартак Юниор»",
      En: "Partner schools of Spartak City Football Academy and Spartak Junior network",
    },
  },
];
