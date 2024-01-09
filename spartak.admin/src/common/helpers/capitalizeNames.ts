export const capitalizeItem = (item: string) => {
  if (/^\w\.\w\.$/i.test(item)) {
    return item.toUpperCase();
  }

  return item;
};

export const capitalizeNames = (items: string) => {
  const itemsList = items.split(/\s|_/).filter((item) => item);
  const formattedItemsList = itemsList.map(capitalizeItem);

  return formattedItemsList.join(" ");
};
