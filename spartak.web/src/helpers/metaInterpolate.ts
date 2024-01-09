import { LocaleType } from "../api/dto/LocaleType";
import { IMetaTags } from "../components/baseMeta/baseMeta";

const replacer = (substr: string[]) => {
  let count = 0;

  return () => substr[count++] || "";
};

export const metaInterpolate = (meta: Partial<IMetaTags>, ...params: (LocaleType | undefined)[]) => {
  const newMeta = { ...meta };

  const Ru = params.map(({ Ru } = { Ru: "", En: "" }) => Ru);
  const En = params.map(({ En } = { Ru: "", En: "" }) => En);

  const title = {
    Ru: newMeta.titleName?.Ru.replace(/\{[^}]*\}/g, replacer(Ru)) || "",
    En: newMeta.titleName?.En.replace(/\{[^}]*\}/g, replacer(En)) || "",
  };

  newMeta.titleName = title;
  newMeta.titleOg = title;
  newMeta.descriptionOg = {
    Ru: newMeta.descriptionOg?.Ru.replace(/\{[^}]*\}/g, replacer(Ru)) || "",
    En: newMeta.descriptionOg?.En.replace(/\{[^}]*\}/g, replacer(En)) || "",
  };

  return newMeta;
};
