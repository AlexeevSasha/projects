const queryVisible = [
  "minPrice",
  "maxPrice",
  "vendor",
  "model",
  "activeIngredient",
  "dosage",
  "country",
];

type QueryParams = {
  [key: string]: string | string[] | undefined;
};

export const getTagsFromQuery = (query: QueryParams) => {
  let price = query?.minPrice || query?.maxPrice ? "Цена: " : "";
  const filters: [string, string][] = [];

  Object.entries(query).forEach(([key, value]) => {
    if (!queryVisible.includes(key)) return;

    if (Array.isArray(value)) {
      value.forEach((el) => filters.push([key, el]));
    } else {
      if (key === "minPrice") {
        price += `от ${value} `;
        return;
      }
      if (key === "maxPrice") {
        price += `до ${value} `;
        return;
      } else value && filters.push([key, value]);
    }
  });

  price && filters.push(["price", price + "руб"]);

  filters.length > 1 && filters.push(["all", "Сбросить все"]);

  return filters;
};
