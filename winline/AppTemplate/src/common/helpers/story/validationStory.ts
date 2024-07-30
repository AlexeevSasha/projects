import i18n from "i18next";

export const validationTitle = async (_: unknown, value: string) => {
  await validationAllFunction(value, 50);
};

export const validationText = async (_: unknown, value: string) => {
  await validationAllFunction(value, 300);
};

export const validationTextButton = async (_: unknown, value: string) => {
  await validationAllFunction(value, 24);
};

const validationAllFunction = async (value: string, length: number) => {
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18n.t("validations.required")));
  } else if (!/^[^\s]/.test(value)) {
    return Promise.reject(new Error(i18n.t("validations.startBySpace")));
  } else if (value.length > length) {
    return Promise.reject(new Error(i18n.t("validations.maxLengthExceededLocal")));
  }

  return Promise.resolve();
};

export const validationEmpty = async () => Promise.resolve();

export const validationSourceFormat = async (file: File, mini?: boolean) => {
  const url = URL.createObjectURL(file);
  const img = new Image();

  img.src = url;

  return new Promise((resolve) => {
    img.onload = function () {
      const type = mini ? /jpeg|png|jpg/.test(file.type) : /jpg|jpeg|png|gif/.test(file.type);
      URL.revokeObjectURL(url);
      resolve(!type);
    };
    img.onerror = function () {
      resolve(true);
    };
  });
};

export const validationSourceSizes = async (file: File, mini?: boolean, bannerImg?: boolean) => {
  const size = file.size;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onload = function () {
      const sizeCheck = mini
        ? img.width === 400 && img.height === 400
        : bannerImg
        ? img.width === 2048
        : img.width === 1080 && img.height === 1920;
      URL.revokeObjectURL(url);
      // 104857600 (100MB)
      resolve(size < 104857600 && sizeCheck);
    };
    img.onerror = function () {
      resolve(false);
    };
  });
};
