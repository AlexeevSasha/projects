export const replaceHtmlString = (
  html: string,
  keys: string | string[],
  replacement: string | string[]
): string => {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  if (!Array.isArray(replacement)) {
    replacement = [replacement];
  }

  if (keys.length !== replacement.length) {
    throw new Error("Количество ключей и значений замены должно совпадать");
  }

  let modifiedHtml = html;

  keys.forEach((key, index) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    modifiedHtml = modifiedHtml.replace(regex, replacement[index] as string);
  });

  return modifiedHtml;
};
