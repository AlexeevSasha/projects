import { BrandT } from "../common/interfaces/brand";
import { brandsMock } from "./mockData/brandMock";

export const getBrands = async (): Promise<BrandT[]> => {
  return brandsMock;
};
