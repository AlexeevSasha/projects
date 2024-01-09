export class ImageError extends Error {
  constructor(message: string, data: Record<string, unknown>) {
    super(message);
    this.data = data;
  }
  data: Record<string, unknown>;
}

export type ImageValidation = {
  width: number;
  height: number;
  size: number;
  format: string[];
  exact?: boolean;
  validate?: (imgWidth: number, imgHeight: number) => boolean;
};

export const validateImage = async (file: File, validation: ImageValidation) => {
  if (file) {
    await validate(file, validation);
  } else {
    throw new Error("validations.noFile");
  }
};

const validate = (
  file: File,
  { width, height, size, format, exact, validate: validateFn }: ImageValidation
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!(file.size / 1024 <= size)) {
      reject(new ImageError("validations.wrongImgWeight", { size }));
    }

    if (!new RegExp(format.join("|")).test(file.type)) {
      reject(new ImageError("validations.wrongImgFormat", { format: file.type.split("/")[1] }));
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const resIsValid = validateFn
        ? validateFn(img.width, img.height)
        : exact
        ? img.height === height && img.width === width
        : img.height <= height && img.width <= width;

      if (!resIsValid) {
        reject(new ImageError("validations.wrongImgSize", { width: img.width, height: img.height }));
      }

      URL.revokeObjectURL(img.src);
      resolve();
    };
  });
