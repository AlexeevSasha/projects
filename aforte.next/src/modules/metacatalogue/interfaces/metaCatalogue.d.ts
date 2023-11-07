import { DescriptionSection, ProductT } from "../../products/interfaces/product";
import { ProductReviewsT } from "../../reviews/interfaces/reviews";

export type AlphabetSearchResultT = {
  title: string;
  children: {
    id: string;
    title: string;
  }[];
};

export type ActiveIngredientsT = {
  id: string;
  name: string;
};

export type AlphabetT = "ru" | "en" | "number";

export type MetaCatalogueT = {
  id: string;
  sku: string;
  name: string;
  text: string;
  dosage: string;
  vendor: string;
  country: string;
  model: string;
  quantity: number;
  category: { id: string; name: string } | null;
  categories: { id: string; name: string }[];
  products: ProductT[];
  shortDescription: string | null;
  description: string | null;
  descriptionSections: DescriptionSection[] | [];
  images: string[];
  certificate: string[];
  activeIngredients: ActiveIngredientsT[] | null;
  reviews: ProductReviewsT[];
  totalReview: null | number;
};
