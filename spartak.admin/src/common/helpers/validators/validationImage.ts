import { IAttributesImage } from "common/constants/formsConstantsValidation";

export const validationSourceFormat = async (file: File) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = () => {
      const type = /jpg|jpeg|png|gif/.test(file.type);
      URL.revokeObjectURL(img.src);
      resolve(!type);
    };
  });
};

export const validationSourceSizes = async (
  file: File,
  config: IAttributesImage = { width: 180, height: 180, size: 2048 }
) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onload = function () {
      const sizeCheck =
        img.height === config.height && img.width === config.width;
      URL.revokeObjectURL(url);
      resolve(file.size < config.size && sizeCheck);
    };
  });
};
