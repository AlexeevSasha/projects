export const validationSizeAndFilters = (value: string) => {
    if (value && value.length > 254) {
        return "filtersSizeError";
     } else if (value && !/^[a-zа-я'`\s]*$/i.test(value) && !/(\s\s|''|``|--|\.\.|[.])/.test(value)) {
       return "filtersError";
     } else {
        return "";
    }
};
