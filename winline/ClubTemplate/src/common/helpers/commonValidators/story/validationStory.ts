import moment from "moment";
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

export const validationEmpty = async () => Promise.resolve();

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

export const validationPublishDate = (start?: string, end?: string, type?: string) => {
  const startDateTime = moment(start);
  const endDateTime = moment(end);

  if (startDateTime.isAfter(endDateTime)) {
    if (type === "startPublish") {
      throw new Error(i18n.t("validations.invalidBeginPublishDate"));
    } else {
      throw new Error(i18n.t("validations.invalidEndPublishDate"));
    }
  }

  if (startDateTime > endDateTime) {
    if (type === "startPublish") {
      throw new Error(i18n.t("validations.invalidBeginPublishDate"));
    } else {
      throw new Error(i18n.t("validations.invalidEndPublishDate"));
    }
  }
};

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
