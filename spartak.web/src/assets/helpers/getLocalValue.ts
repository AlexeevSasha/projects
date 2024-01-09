import { LocaleType } from "../../api/dto/LocaleType";

export const getLocalValue = (value: LocaleType | string | undefined, lang: string | undefined) =>
  typeof value === "string" ? value : (lang === "en" ? value?.En : value?.Ru) || "";
