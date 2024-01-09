export const cmsParser = <T>(value: string) => {
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return {} as T;
  }
};
