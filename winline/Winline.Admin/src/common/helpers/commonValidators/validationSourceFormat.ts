export const validationSourceFormat = async (file: File, mini?: boolean) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  return new Promise((resolve => {
    img.onload = function () {
      const type = mini
        ? /jpeg|png/.test(file.type)
        : /jpg|jpeg|png|gif/.test(file.type);
      URL.revokeObjectURL(url);
      resolve(!type);
    };
  }));
};
