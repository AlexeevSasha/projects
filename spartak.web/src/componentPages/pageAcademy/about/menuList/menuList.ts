import { INavMenuList } from "../../../../components/header/component/getMenuItems";

export const academyMenuItems: INavMenuList[] = [
  { label: "academy/about", link: "/academy/about" },
  { label: "academy/employees", link: "/academy/employees" },
  { label: "academy/teams", link: "/academy/teams" },
  {
    label: "academy/media",
    link: "/academy/media",
    query: {
      mediaType: "All",
      month: new Date().getMonth().toString(),
      year: new Date().getFullYear().toString(),
    },
  },
  { label: "academy/infrastructure", link: "/academy/infrastructure" },
  { label: "academy/enter", link: "/academy/enter" },
  // { label: "academy/graduate", link: "/academy/graduate" },
  { label: "academy/contacts", link: "/academy/contacts" },
];
