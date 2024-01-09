export interface IProduct {
  id: string;
  link: string;
  title: string;
  code: string;
  appearence: {
    title: string;
    xml: string;
    files: { type: string; src: string }[];
    list: {
      color: string;
      id: number;
      price: string;
      priceN: number;
      denarii: boolean;
      oldPrice?: string;
      discountPercent?: number;
      size: string;
    }[];
  }[];
}

export interface IProductCategory {
  label: string;
  link: string;
}

export interface IProductSearchResult {
  list: IProduct[];
  count: number;
}
