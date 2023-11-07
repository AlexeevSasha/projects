import { CategoryButtonT } from "../../common/interfaces/categoryButton";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { AuthorT } from "../../modules/articles/interfaces/author";

type ArticlesMockType = {
  articles: ArticleT[];
  tags: CategoryButtonT[];
  popularArticles: ArticleT[];
  popularAuthor: AuthorT[];
};

export const articlesMock: ArticlesMockType = {
  articles: new Array(12).fill({
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/article-small.png",
    title: "Симптомы и лечение цистита",
    date: "4.11.2022",
    time: "5 мин",
    view: "255",
    label: "Совет",
  }),
  tags: [
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      name: "Полезная информация",
      alias: "isHelpfulInfo",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      name: "Лекарства и БАДы",
      alias: "isMedicines",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      name: "Советы",
      alias: "isAdvice",
    },
  ],
  popularArticles: [
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/article-small.png",
      label: "Полезная информация",
      title: "Восстановление легких после пневмонии",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/article-small.png",
      label: "Новости",
      title: "Восстановление легких после пневмонии",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/article-small.png",
      label: "Новости",
      title: "Восстановление легких после пневмонии",
    },
  ],
  popularAuthor: [
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/author.png",
      profession: "Педиатр",
      name: "Albert Flores",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/author.png",
      profession: "Детский психолог",
      name: "Лариса Суркова",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/author.png",
      profession: "Педиатр",
      name: "Darlene Robertson",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      image: "/mockImages/author.png",
      profession: "Детский психолог",
      name: "Jane Cooper",
    },
  ],
};
