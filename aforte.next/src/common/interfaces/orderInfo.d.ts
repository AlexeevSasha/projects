type OrderInfoBlockT = {
  title: string;
  descriptions: string;
};

export type OrderInfoT = {
  descriptions: string;
  children: {
    title: string;
    descriptions: string;
    smallDescriptions?: string;
    children: OrderInfoBlockT[];
  }[];
};
