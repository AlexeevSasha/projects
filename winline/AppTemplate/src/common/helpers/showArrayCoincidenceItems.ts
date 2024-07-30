import type { IEmployee } from "../../api/dto/employees/IEmployee";

type ISomething = IEmployee;

export const showArrayCoincidenceItems = <T extends ISomething>(allItems: T[], coincidenceItem: ISomething['id'][]) => {
  const isAllItems = coincidenceItem?.length === allItems?.length;
  const entityItem = !isAllItems
    ? allItems?.reduce((itemsInString, itemsIterable) =>
      itemsInString + (coincidenceItem?.includes(itemsIterable.id) ? `${itemsIterable.name}, ` : ""), "")
    : "Все";

  return entityItem?.includes("Все")
    ? entityItem
    : entityItem?.slice(0, entityItem?.length - 2);
};
