import { accessNames } from "./accessNames";

export const getMediaSection = (rights: string) => {
  const site = rights.includes(accessNames.mediaSite) && "Site";
  const academy = rights.includes(accessNames.mediaAcademy) && "Academy";

  if ((site && academy) || rights.includes(accessNames.fullAccess)) {
    return undefined;
  }

  return site || academy || undefined;
};
