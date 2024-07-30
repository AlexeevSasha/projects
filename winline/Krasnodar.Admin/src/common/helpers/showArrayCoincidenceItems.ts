export const showArrayCoincidenceItems = (allItems?: {label: string; value: string}[], coincidenceItem?: string[]) => {
  const isAllItems = coincidenceItem?.length === allItems?.length;
  const entityItem = !isAllItems
    ? allItems?.reduce((itemsInString, itemsIterable) =>
      itemsInString + (coincidenceItem?.includes(itemsIterable.value) ? `${itemsIterable.label}, ` : ""), "")
    : "Все";

  return entityItem?.includes("Все")
    ? entityItem
    : entityItem?.slice(0, entityItem?.length - 2);
};
