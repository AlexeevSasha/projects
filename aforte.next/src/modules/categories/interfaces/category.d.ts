export type CategoryT = {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  slug: string;
  totalProduct: number;
  hasChildren: boolean;
};

export type CategoryRequestT = {
  page?: number;
  limit?: number;
  parent: string | null;
};
