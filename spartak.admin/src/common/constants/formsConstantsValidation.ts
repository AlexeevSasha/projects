export interface IAttributesImage {
  width: number;
  height: number;
  size: number;
}
export const formsConstantsValidation = {
  inputImage: {
    files: {} as any,
  },
  default: {
    min: 3,
    max: 254,
  },
  password: {
    min: 8,
    max: 20,
  },
  textarea: {
    max: 300,
  },
  entity: {
    default: {
      min: 3,
      wmax: 3,
      max: 50,
    },
    story: {
      max: 25,
      image: {
        small: {
          width: 10000,
          height: 10000,
        },
        big: {
          width: 1920,
          height: 1080,
        },
        size: 104857600,
      },
    },
    adv: {
      max: 25,
      image: {
        width: 51000,
        height: 5000,
        size: 1048576,
      },
    },
  },
  dateFormat: "DD-MM-YYYY HH:mm",
};
