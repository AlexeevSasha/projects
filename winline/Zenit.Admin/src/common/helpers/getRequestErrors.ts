import i18next from "i18next";

export interface IError {
  errorCode: string;
  params: string[] | null;
}

export const getException = (msg: string) => {
  const val = `${process.env.REACT_APP_API_LOCALE_NS}:${msg}`;
  const withoutNamespace = val.split(":")[1];
  const arrayFromTypes = withoutNamespace.split(".");

  return arrayFromTypes.length == 3 && i18next.t(val) === withoutNamespace
    ? `${process.env.REACT_APP_API_LOCALE_NS}:${arrayFromTypes[0]}.${arrayFromTypes[1]}.Default`
    : val;
};
export const getValidation = (errors: Record<string, IError[]>) => {
  return Object.values(errors).map((error: any, i) =>
    error.map(
      (elem: { errorCode: any }) => Object.keys(errors)[i] + ": " + i18next.t(`${process.env.REACT_APP_API_LOCALE_NS}:${elem.errorCode}`)
    )
  );
};
