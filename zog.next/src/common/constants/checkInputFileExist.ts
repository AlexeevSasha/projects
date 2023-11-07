export const checkInputFileExist = (files: File[]) => {
  return Array.from(new Map(files.flat().map((item) => [item["name"], item])).values());
};
