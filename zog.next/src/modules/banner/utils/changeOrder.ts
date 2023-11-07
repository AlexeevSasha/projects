import { IBanner } from "../interfaces/banner";

export const changeOrder = (banners: IBanner[], sourceInd: number, destinationInd: number) => {
  const [reorderedItem] = banners.splice(sourceInd, 1);
  banners.splice(destinationInd, 0, reorderedItem as IBanner);
  return banners.map((el, i) => ({ ...el, order: i + 1 }));
};

export const changeOrderDelete = (id: string, banners: IBanner[]) => {
  const idn = banners.findIndex((el) => el.public_id === id);
  return [...banners.slice(0, idn), ...banners.slice(idn + 1)].map((el, i) => ({
    ...el,
    order: i + 1,
  }));
};
