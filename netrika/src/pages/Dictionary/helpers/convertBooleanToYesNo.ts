export const convertBooleanToYesNo = <T, K extends keyof T>(array: T[], fields: K | K[]): T[] => {
  const fieldsArray = Array.isArray(fields) ? fields : [fields];

  const items: (T & Record<K, string>)[] = [];

  array.forEach((item) => {
    const convert = {} as Record<K, string>;

    fieldsArray.forEach((field) => {
      const value = item[field];

      if (value !== undefined && typeof value === "boolean") {
        convert[field] = value ? "Есть" : "Нет";
      }
    });

    items.push({ ...item, ...convert });
  });

  return items;
};
