import { api, setQueryParams } from "./baseApi";
import { CategoryRequestT, CategoryT } from "../modules/categories/interfaces/category";

export const getCategoriesSlider = () =>
  api.get<CategoryT[]>("categories?page=1&limit=10&parent=null");

export const getCategoryById = (id: string) => api.get<CategoryT[]>(`categories/${id}`);

export const getCategories = (props: CategoryRequestT) =>
  api.get<CategoryT>(`categories?${setQueryParams(props)}`);
