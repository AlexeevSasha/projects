import { LocaleType } from "../../api/dto/LocaleType";
import { ISearchInfo } from "../../api/dto/search";

type Section = {
  title: LocaleType;
  link: string;
};

export const infoSections: Record<ISearchInfo["Type"], Section> = {
  stadiumAbout: { title: { En: "About the Stadium", Ru: "О Стадионе" }, link: "/stadium/about" },
  stadiumStaff: { title: { En: "Staff", Ru: "Персонал" }, link: "	/stadium/staff" },
  stadiumHowToGet: { title: { En: "How to get there", Ru: "Как добраться" }, link: "/stadium/howToGet" },
  stadiumContacts: { title: { En: "Stadium - Contacts", Ru: "Стадион - Контакты" }, link: "/stadium/contacts" },
  clubContacts: { title: { En: "Club - Contacts", Ru: "Клуб - Контакты" }, link: "/club/contacts" },
  clubHistory: { title: { En: "Story", Ru: "История" }, link: "/club/history" },
  clubResults: { title: { En: "Season results", Ru: "Итоги сезонов" }, link: "/club/results" },
  servicesAdjacentTerritory: {
    title: { En: "About the Stadium", Ru: "Прилегающая территория" },
    link: "/stadium/services/adjacentTerritory",
  },
  servicesVip: { title: { En: "VIP boxes", Ru: "VIP-Ложи" }, link: "/stadium/services/vip" },
  academyEnter: { title: { En: "How to get into the academy", Ru: "Как попасть в академию" }, link: "/academy/enter" },
};
