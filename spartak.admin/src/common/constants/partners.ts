import { accessNames } from "./accessNames";

export const getPartnersSection = (rights: string) => {
  const site = rights.includes(accessNames.partnerSite) && "Site";
  const academy = rights.includes(accessNames.partnerAcademy) && "Academy";

  if ((site && academy) || rights.includes(accessNames.fullAccess)) {
    return undefined;
  }

  return site || academy || undefined;
};
