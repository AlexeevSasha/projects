export interface INavFooterList {
  label: string;
  child?: {
    label: string;
    link: string;
  }[];
  secondBlock?: {
    label: string;
    child?: {
      label: string;
      link: string;
    }[];
  };
}

export const mockNav = (locale?: string): INavFooterList[] => [
  {
    label: "stadium",
    child: [
      { label: "aboutStadium", link: "/stadium/about" },
      { label: "services", link: "/stadium/services" },
      { label: "howToGet", link: "/stadium/howToGet" },
      { label: "staff", link: "/stadium/staff" },
      { label: "contacts", link: "/stadium/contacts" },
    ],
    secondBlock: {
      label: "media",
      child: [
        { label: "news", link: "/media/news" },
        { label: "gallery", link: "/media/gallery" },
        { label: "videos", link: "/media/videos" },
      ],
    },
  },
  {
    label: "teams",

    secondBlock: {
      label: "matches",
      child: [
        { label: "forthcoming", link: "/matches/forthcoming" },
        { label: "past", link: "/matches/past" },
        { label: "tournamentTable", link: "/matches/standings" },
      ],
    },
  },
  {
    label: "club",
    child: [
      { label: "seasonsResults", link: "/club/results" },
      { label: "history", link: "/club/history" },
      { label: "leaders", link: "/club/leaders" },
      { label: "partners", link: "/club/partners" },
      { label: "contacts", link: "/club/contacts" },
    ],
    secondBlock: {
      label: "tickets",
      child: [
        { label: "tickets", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches` },
        { label: "subscriptions", link: `${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/abonements` },
        { label: "vipLodges", link: "/stadium/services/vip" },
      ],
    },
  },
  {
    label: "more",
    child: [
      { label: "sokolniki", link: "https://sokolniki.spartak.com" },
      { label: "academy", link: "/academy/about" },
      { label: "legends", link: "/more/legends" },
      { label: "loyaltyProgram", link: "/more/loyalty/main" },
      { label: "subscriptions", link: "/more/subscriptions" },
      { label: "spartakKids", link: "/kids/spartakKids" },
      { label: "spartakForKids", link: "https://spartakforkids.com" },
      { label: "excursionTours", link: "/stadium/services/excursionTours " },
      { label: "toCorporationClients", link: "/more/toCorporationClients" },
      { label: "privacy", link: "/more/privacy" },
      { label: "documents", link: "/more/documents" },
    ],
  },
  {
    label: "shop",
  },
  {
    label: "paymentSystems",
    child: [
      { label: "Виза", link: "/" },
      { label: "Мастер", link: "/" },
      { label: "Сбер", link: "/" },
      { label: "Мир", link: "/" },
      { label: "Кипер", link: "/" },
    ],
  },
];
