export interface INavMenuList {
  label: string;
  link?: string;
  query?: { [key: string]: string };
  child?: INavMenuList[];
  withoutLocale?: boolean;
}

export const getMenuItems = (locale: string, mainTeamId = ""): INavMenuList[] => [
  { label: "media", link: "/media/news" },
  { label: "matches", link: "/matches/forthcoming" },
  { label: "club", link: "/club/results" },
  { label: "teams", link: `/teams${mainTeamId}` },
  { label: "shop", link: `${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/${locale}`, withoutLocale: true },
  {
    label: "tickets",
    link: "/tickets/matches",
    child: [
      { label: "tickets/matches", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches` },
      { label: "tickets/abonements", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/abonements` },
      { label: "tickets/excursion", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/excursions` },
      //{ label: "tickets/parking", link: "/tickets/parking" },
      { label: "tickets/info", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/info` },
    ],
  },
  { label: "stadium", link: "/stadium/about" },
  { label: "academy", link: "/academy/about" },
  {
    label: "more",
    link: "/more/sokolniki/aboutFields",
    child: [
      { label: "sokol", link: "https://sokolniki.spartak.com/", withoutLocale: true },
      { label: "more/abonements", link: "/more/subscriptions" },
      { label: "more/legends", link: "/more/legends" },
      { label: "more/loyalty/main", link: "/more/loyalty/main" },
      { label: "kids/spartakKids", link: "/kids/spartakKids" },
      { label: "kids/spartakForKids", link: "https://spartakforkids.com" },
      { label: "excursionTours", link: "/stadium/services/excursionTours " },
      { label: "more/toCorporationClients", link: "/more/toCorporationClients" },
    ],
  },
];
