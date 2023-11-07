import { MultiFilterT } from "../interfaces/filters";

function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export const getSearchArray = (
  filters: MultiFilterT[],
  number: number,
  search: string
) => {
  const searchArray = [];

  const regex = new RegExp(
    `^${escapeRegExp(search).toLowerCase().replace(/\s/g, "")}`
  );
  if (search) {
    for (let i = 0; i < filters.length; i++) {
      if (searchArray.length > number) {
        break;
      }

      if (regex.test(filters[i]?.name?.toLowerCase().replace(/\s/g, ""))) {
        searchArray.push(filters[i]);
      }
    }
  }
  return search ? searchArray : filters.slice(0, number);
};
