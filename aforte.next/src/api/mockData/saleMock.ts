import { SaleDetailsT, SaleT } from "../../modules/sale/interfaces/sale";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";

type SaleMockT = {
  categorySale: CategoryButtonT[];
  filtersSmall: any[];
  sales: SaleT[];
  saleDetails: SaleDetailsT;
  salePromoCodeDetails: SaleDetailsT;
};

export const saleMock: SaleMockT = {
  categorySale: [
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
  filtersSmall: [
    {
      name: "Формы выпуска",
      alias: "vendor",
      type: "multi",
      values: [
        {
          id: "Аэрозоль",
          name: "Аэрозоль",
          count: 1,
        },
        {
          id: "Аспиратор",
          name: "Аспиратор",
          count: 1,
        },
        {
          id: "Гель",
          name: "Гель",
          count: 1,
        },
        {
          id: "Гранулы",
          name: "Гранулы",
          count: 1,
        },
        {
          id: "Ауриола",
          name: "Ауриола",
          count: 1,
        },
        {
          id: "Микро-что-то",
          name: "Микро-что-то",
          count: 1,
        },
      ],
    },
    {
      name: "Заболевания",
      alias: "dosage",
      type: "multi",
      values: [
        {
          id: "Боль в горле",
          name: "Боль в горле",
          count: 1,
        },
        {
          id: "Кашель",
          name: "Кашель",
          count: 1,
        },
        {
          id: "Сухой кашель",
          name: "Сухой кашель",
          count: 1,
        },
        {
          id: "Мокрый кашель",
          name: "Мокрый кашель",
          count: 1,
        },
        {
          id: "Влажный кашель",
          name: "Влажный кашель",
          count: 1,
        },
        {
          id: "Остаточный кашель",
          name: "Остаточный кашель",
          count: 1,
        },
      ],
    },
  ],
  sales: new Array(8).fill({
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/sale-small.png",
    title: "Фарингосепт и Мирамистин со скидкой до 22%",
    date: "до 15 сентября",
    label: "Вместе дешевле",
  }),
  saleDetails: {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/sale-big.png",
    labels: [{ title: "До 15 июля", color: "#6DC47B" }],
    title: "Скидка на препараты с истекающим сроком годности",
    description:
      "<p>Постоянная обновляемая распродажа товаров с истекающим сроком годности: </p>" +
      "<ul>" +
      "<li>не менее 2-3 недель для лекарственных препаратов</li>" +
      "<li>не менее 1-1,5 месяца для уходовых средств</li>" +
      "</ul>",
    termsOfSale:
      "<h3>Условия проведения акции</h3>" +
      "<p>Рекламная акция «Скидка на препараты с истекающим сроком годности» (далее – «Акция»), проводится с целью привлечения внимания, формирования и поддержания интереса покупателей к товарам интернет-аптеки Polzaru. Принимая участие в Акции Участники полностью соглашаются с настоящими правилами (далее - «Правила»).</p>" +
      "<div>" +
      "<h4>Наименование Акци</h4>" +
      "<ol>" +
      "<li>Наименование Акции – «Скидка на препараты с истекающим сроком годности».</li>" +
      "<li>Акция не является стимулирующей лотереей, участие в ней не связано с внесением платы Участниками и не основано на риске.</li>" +
      "</ol>" +
      "</div>",
  },
  salePromoCodeDetails: {
    id: Math.floor(Math.random() * 5400).toString(32),
    image: "/mockImages/sale-big.png",
    labels: [{ title: "Бессрочно", color: "#6DC47B" }],
    title: "Промокод 20% на первый заказ",
    participation: "Участвуют все товары",
    description:
      "<p>Дарим промокод 20% на первый заказ на Polza.ru. Соберите корзину товаров и введите промокод FIRSTPOLZA. Промокод можно использовать один раз для заказов от 600 рублей.</p>",
    termsOfSale:
      "<h3>Условия проведения акции</h3>" +
      "<p>Рекламная акция «Скидка на препараты с истекающим сроком годности» (далее – «Акция»), проводится с целью привлечения внимания, формирования и поддержания интереса покупателей к товарам интернет-аптеки Polzaru. Принимая участие в Акции Участники полностью соглашаются с настоящими правилами (далее - «Правила»).</p>" +
      "<div>" +
      "<h4>Наименование Акци</h4>" +
      "<ol>" +
      "<li>Наименование Акции – «Скидка на препараты с истекающим сроком годности».</li>" +
      "<li>Акция не является стимулирующей лотереей, участие в ней не связано с внесением платы Участниками и не основано на риске.</li>" +
      "</ol>" +
      "</div>",
  },
};
