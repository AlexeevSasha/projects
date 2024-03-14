import { useEffect, useState } from "react";
import { getTheme } from "@/common/utils/getTheme";
import { ThemeEnum } from "@/common/interfaces/theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeEnum>(getTheme());

  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
