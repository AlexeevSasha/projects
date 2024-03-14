export const debounce = (func: () => void, time: number) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), time);
  };
};
