import { ThemeEnum } from "@/common/interfaces/theme";

export const getTheme = (): ThemeEnum => {
  const theme = window?.localStorage?.getItem("theme") as ThemeEnum | undefined;
  if (Object.values(ThemeEnum).includes(theme)) return theme;

  const userMedia = window.matchMedia("(prefers-color-scheme: light)");
  if (userMedia.matches) return ThemeEnum.LIGHT;

  return ThemeEnum.DARK;
};
