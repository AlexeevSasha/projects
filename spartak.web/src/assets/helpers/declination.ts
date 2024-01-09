export const declination = (word: string, count: number) => {
  if (count > 10 && count < 21) {
    return word + "ов";
  }
  const lastDigit = count % 10;
  return word + (lastDigit === 1 ? "" : lastDigit > 1 && lastDigit < 5 ? "а" : "ов");
};
