export const formatPriceToRUB = (price?: string | number) => {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(Number(price));
};

export const formatAllPricesToRUB = (prices?: Record<string, number>) => {
  const formatted: Record<string, string> = {};

  for (const price in prices) {
    if (!formatted[price] && typeof prices[price] === 'number') {
      formatted[price] = formatPriceToRUB(prices[price]);
    }
  }

  return formatted;
};
