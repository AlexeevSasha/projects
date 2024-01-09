export interface IProductInfo {
  id: string;
  title: string;
  imgGeneral: string;
  imagesDescription?: string[];
  price: string;
  sale?: string;
  newPrice?: string;
  colors: string[];
  subCategory?: string;
  appearence: { color: string; sizes: string[] }[];
}

export interface IProductList {
  alert: boolean;
  code: string;
  color: string;
  denarii: boolean;
  id: number;
  link: string;
  loyalty: boolean;
  photo: string;
  predzakaz: boolean;
  price: string;
  priceN: string;
  product_id: string;
  quantity: number;
  size: string;
  title: string;
}

export interface IProductCart {
  denarii: boolean;
  list: IProductList[];
  total: string;
  totalN: string;
}
