export const checkImgFunk = (img?: string) => {
  return img && /https?:\/\/|http?:\/\//.test(img);
};
