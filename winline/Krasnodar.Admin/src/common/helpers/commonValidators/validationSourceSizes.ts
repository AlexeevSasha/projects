import {formsConstantsValidation} from "../../constants/formsConstantsValidation";

export const validationSourceSizes = async (file: File, mini?: boolean) => {
    const image = formsConstantsValidation.inputImage.files;
    const size = file.size;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    return new Promise((resolve => {
        img.onload = function () {
            const sizeCheck = mini
              ? img.width === image.small.width && img.height === image.small.height
              : img.width === image.big.width && img.height === image.big.height;
            URL.revokeObjectURL(url);
            // 104857600 (100MB)
            resolve(size < image.size && sizeCheck);
        };
    }));
};
