import i18next from "i18next";
import { formsConstantsValidation } from "../../constants/formsConstantsValidation";

export const validationStatistics = async (_: any, value: string) => {
  if (value && value.length > 5) {
    return Promise.reject(
      i18next.t("validations.maxLengthExceeded", {
        max: formsConstantsValidation.entity.player.statistics.max
      })
    );
  }
  if (!value || value.length === 0) {
    return Promise.reject(i18next.t("validations.required"));
  } else {
    return Promise.resolve();
  }
};
