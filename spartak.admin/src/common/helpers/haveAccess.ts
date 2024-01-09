import { IMenu } from "ui/Sidebar/SidebarList";

export const haveAccess = (rights: string, access: IMenu["policy"]) =>
  (Array.isArray(access) ? access.some((item) => rights.includes(item)) : rights.includes(access)) ||
  rights.includes("fullAccess");
