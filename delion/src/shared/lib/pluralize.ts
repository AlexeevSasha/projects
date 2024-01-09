export const pluralize = (value: number, words: string[]): string => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const pluralizeYears = (value: number) => {
  return pluralize(value, ['год', 'года', 'лет']);
};

export function pluralizedDreamersCount(value = 0) {
  return `${value} ${pluralize(value, ['мечтатель', 'мечтателя', 'мечтателей'])}`;
}

export function pluralizedWishesCount(value = 0) {
  return pluralize(value, ['желание', 'желаний', 'желаний']);
}
