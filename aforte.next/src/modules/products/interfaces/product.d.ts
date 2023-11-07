export type LabelProductT = {
  title: string;
  color: string;
};

export type DescriptionSection = {
  header: string;
  content: string;
};

export type AttributeProduct = {
  name: string;
  slug: string;
  value: string;
};

export type Variations = {
  id: string;
  sku: string;
  name: string;
  images: string[];
  regularPrice: number;
  salePrice: null | number;
  discount: string | null;
  inStock: boolean;
  dosage: string;
  model: string;
  labels: LabelProductT[];
};

export type ProductT = {
  id: string;
  sku: string;
  name: string;
  vendor: string;
  dosage: string;
  country: string;
  model: string;
  activeIngredient: string | null;
  regularPrice: number;
  salePrice: number | null;
  inStock: boolean;
  quantity: number;
  images: string[];
  description: string | null;
  descriptionSections: DescriptionSection[] | [];
  shortDescription: null;
  permalink: null;
  attributes: AttributeProduct[] | [];
  groupedProducts: [];
  relatedIds: [];
  tags: [];
  analogs: Variations[];
  variations: Variations[];
  isFeatured: boolean;
  category: { id: string; name: string } | null;
  categories: { id: string; name: string }[];
  reviews: [];
  tagline: null;
  rating: null;
  totalReview: null;
  averageRating: null;
  ratingCount: null;
  labels: LabelProductT[];
  discount: string | null;
};
