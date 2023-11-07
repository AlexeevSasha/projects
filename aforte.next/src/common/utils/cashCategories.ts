import { getCategories } from "../../api/categoriesApi";
import { CategoryT } from "../../modules/categories/interfaces/category";

const CashCategories = () => {
  const mapCash = new Map();

  return async (id: string | null, initialCategories?: CategoryT[]): Promise<CategoryT[]> => {
    if (initialCategories) {
      mapCash.set(null, initialCategories);
      return mapCash.get(null);
    }
    if (mapCash.has(id)) {
      return mapCash.get(id);
    } else {
      const category = await getCategories({ parent: id });
      mapCash.set(id, category.data.items);
      return mapCash.get(id);
    }
  };
};

export const getCategoriesCash = CashCategories();
