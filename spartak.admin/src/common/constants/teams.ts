import { accessNames } from "./accessNames";

export const getClubSection = (rights: string) => {
  const site = rights.includes(accessNames.clubSite) && "Site";
  const academy = rights.includes(accessNames.clubAcademy) && "Academy";

  if ((site && academy) || rights.includes(accessNames.fullAccess)) {
    return undefined;
  }

  return site || academy || undefined;
};
