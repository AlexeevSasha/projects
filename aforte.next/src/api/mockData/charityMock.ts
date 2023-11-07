import { CharityDetailsT, CharityT } from "../../modules/charity/interfaces/charity";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";

export const charityMock: CharityT[] = [
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/charity.png",
    title: "Акция при покупке Омега-3 в пользу фонда «Подари жизнь» от ФК «Пульс»",
    date: "4.11.2022",
    time: "5 мин",
    view: "255",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/charity.png",
    title: "Благотворительная помощь «ПУЛЬС» в первом полугодии 2022 года",
    date: "4.08.2022",
    time: "12 мин",
    view: "1041",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/charity.png",
    title: "ФК ПУЛЬС проводит акцию в пользу благотворительного фонда ГАЛЧОНОК",
    date: "4.03.2022",
    time: "7 мин",
    view: "693",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/charity.png",
    title: "О новой акции в пользу «Подари жизнь» объявила ФК «Пульс»",
    date: "4.03.2022",
    time: "3 мин",
    view: "120",
  },
];
export const charityFilterMock: CategoryButtonT[] = [
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    name: "За все время",
    alias: "За все время",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    name: "2020 ",
    alias: "2020 ",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    name: "2021",
    alias: "2021",
  },
  {
    id: Math.floor(Math.random() * 5400).toString(32),
    name: "2022",
    alias: "2022",
  },
];

export const charityDetailsMock: CharityDetailsT = {
  id: Math.floor(Math.random() * 5400).toString(32),
  image: "/mockImages/charity-details.png",
  label: "Благотворительность",
  title: "Акция при покупке Омега-3 в пользу фонда «Подари жизнь» от ФК «Пульс»",
  description:
    "Фармацевтическая компания «Пульс» проводит новую благотворительную акцию в пользу фонда «Подари жизнь»: с 1 сентября по 1 декабря с каждой проданной упаковки Омега-3 от Тымлатского Рыбокомбината 1 рубль будет перечислен в помощь детям с тяжелыми заболеваниями.",
  date: "4.11.2022",
  time: "5 мин",
  view: "255",
};
