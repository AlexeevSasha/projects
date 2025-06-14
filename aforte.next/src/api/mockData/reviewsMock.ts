import {
  ProductReviewsT,
  StoryAllReviewsT,
  StoryReviewsT,
} from "../../modules/reviews/interfaces/reviews";

export const storyReviewsMock: StoryReviewsT[] = new Array(10).fill({
  id: Math.floor(Math.random() * 5400).toString(32),
  image: "/mockImages/reviewAuthor.png",
  star: 5,
  title: "Отличный магазин",
  description:
    " Если сейчас вы думаете какой витамин Д купить ребенку, то однозначно рекомендую\n" +
    "          Аквадетрим. Даю ребенку уже год этот витамин, болели за это время всего один раз. Для\n" +
    "          иммунитета, то что надо." +
    " Если сейчас вы думаете какой витамин Д купить ребенку, то однозначно рекомендую\n" +
    "          Аквадетрим. Даю ребенку уже год этот витамин, болели за это время всего один раз. Для\n" +
    "          иммунитета, то что надо." +
    "Ключевая ценность нашей компании — это забота о вашем здоровье. Мы не продвигаем дорогие лекарства и всегда готовы объяснить преимущества и недостатки оригинальных препаратов и дженериков, а также разных товаров с одинаковым действующим веществом. Для нас важно правильно сориентировать вас в широком спектре современных фармпрепаратов и способов поддержания здоровья с учетом ваших запросов и возможностей.\n" +
    "\n" +
    "Культура профилактики заболеваний, возможно, пока что не так сильно развита в нашей стране. Однако мы прикладываем все усилия, чтобы в первую очередь концентрироваться на предупреждении болезней и пропагандируем этот подход как наиболее рациональный и здоровый метод сохранения телесного и психического благополучия.",
  author: "Екатерина Синдеева",
});

export const productReviewsMock: ProductReviewsT[] = new Array(10).fill({
  id: Math.floor(Math.random() * 5400).toString(32),
  star: 3.5,
  advantages: "натуральный, безопасный состав, большой флакон и удобный дозатор",
  disadvantages: "нет",
  commentary:
    "Если сейчас вы думаете какой витамин Д купить ребенку, то однозначно рекомендую Аквадетрим. Даю ребенку уже год этот витамин, болели за это время всего один раз. Для иммунитета, то что надо",
  author: "Александр В.",
  date: "21 мая 2022",
  isAnonim: false,
});

export const storyAllReviewsMock: StoryAllReviewsT = {
  reviews: new Array(10).fill({
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/reviewAuthor.png",
    star: 5,
    title: "Отличный магазин",
    description:
      " Если сейчас вы думаете какой витамин Д купить ребенку, то однозначно рекомендую\n" +
      "          Аквадетрим. Даю ребенку уже год этот витамин, болели за это время всего один раз. Для\n" +
      "          иммунитета, то что надо." +
      " Если сейчас вы думаете какой витамин Д купить ребенку, то однозначно рекомендую\n" +
      "          Аквадетрим. Даю ребенку уже год этот витамин, болели за это время всего один раз. Для\n" +
      "          иммунитета, то что надо." +
      "Ключевая ценность нашей компании — это забота о вашем здоровье. Мы не продвигаем дорогие лекарства и всегда готовы объяснить преимущества и недостатки оригинальных препаратов и дженериков, а также разных товаров с одинаковым действующим веществом. Для нас важно правильно сориентировать вас в широком спектре современных фармпрепаратов и способов поддержания здоровья с учетом ваших запросов и возможностей.\n" +
      "\n" +
      "Культура профилактики заболеваний, возможно, пока что не так сильно развита в нашей стране. Однако мы прикладываем все усилия, чтобы в первую очередь концентрироваться на предупреждении болезней и пропагандируем этот подход как наиболее рациональный и здоровый метод сохранения телесного и психического благополучия.",
    author: "Екатерина Синдеева",
    date: "4.11.2022",
  }),
  ratings: [
    {
      total: 123,
      star: 5,
    },
    {
      total: 640,
      star: 4,
    },
    {
      total: 23,
      star: 3,
    },
    {
      total: 3,
      star: 2,
    },
    {
      total: 6,
      star: 1,
    },
  ],
};
