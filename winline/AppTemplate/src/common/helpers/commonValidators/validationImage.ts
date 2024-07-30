import { IConfigImage } from "../../../api/dto/IConfigImage";

export const validationSourceFormat = async (file: File, mini?: boolean) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onload = function () {
      const type = /jpg|jpeg|png|gif/.test(file.type);
      URL.revokeObjectURL(url);
      resolve(!type);
    };
  });
};

export const validationSourceSizes = async (file: File, entity: IConfigImage, config: IConfigImage | null = null) => {
  const defaultSize = entity.size;
  const image = !config ? entity : config;
  const size = file.size;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onload = function () {
      const sizeCheck = image?.height && img.height === image.height && image?.width && img.width === image.width;
      URL.revokeObjectURL(url);
      resolve(size < defaultSize && sizeCheck);
    };
  });
};
