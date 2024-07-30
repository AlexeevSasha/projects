import { ExtensionType, ImageResizeHelper, ResizeType } from "../../modules/winline.mobile.image";

const helper = new ImageResizeHelper({
  key: `${process.env.REACT_APP_API_RESIZER_KEY}`,
  salt: `${process.env.REACT_APP_API_RESIZER_SALT}`,
  baseResizerUrl: `${process.env.REACT_APP_API_RESIZER_URL}`
});

export const getResizedImage = (sourceUrl: string, width: number = 100, height: number = 100) => {
  return helper.getImageUrl({
    width,
    height,
    sourceUrl,
    extension: ExtensionType.PNG,
    resize: ResizeType.fit
  });
};
