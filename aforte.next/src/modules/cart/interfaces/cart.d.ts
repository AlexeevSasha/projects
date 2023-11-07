export type CartT = {
  count: number;
  price: number;
  discount: number;
  delivery: "free" | number;
  points: number;
  totalPrice: number;
};
