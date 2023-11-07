export const getMaxPrice = (min: number, num: number, num1: number) =>
  Math.max(min, Math.min(num, num1));
export const getMinPrice = (max: number, num: number, num1: number) =>
  Math.min(max, Math.max(num, num1));
