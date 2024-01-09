export const validationSearchUserName = (value?: string) => {
  if (value && value.length > 256) {
    throw { isValidatorError: true, bodyError: { type: "filtersSizeError" } };
  }
};
