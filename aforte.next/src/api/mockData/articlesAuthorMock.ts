import { AuthorDetailsT } from "../../modules/articles/interfaces/author";

export const articlesAuthorMock: AuthorDetailsT = {
  author: {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/author.png",
    name: "Лариса Суркова",
    profession: "Детский психолог",
  },
  socialMedia: [
    { nameSocialMedia: "link", link: "info@aforte.ru", text: "info@aforte.ru" },
    { nameSocialMedia: "vk", link: "https://vk.com/polzaru_apteka" },
    { nameSocialMedia: "ok", link: "https://ok.ru/group/70000000115784" },
    { nameSocialMedia: "telegram", link: "https://t.me/polzaru_apteka" },
    { nameSocialMedia: "dzen", link: "https://zen.yandex.ru/polzaru_apteka" },
  ],
  description:
    "Кандидат психологических наук, мама 5 прекрасных детей, которыми она очень гордится и бесконечно любит. Её аккаунт в Instagram насчитывает более 2 миллионов подписчиков и является одним из самых посещаемых среди российских аккаунтов.",
};
