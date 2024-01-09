export const capitalize = (value: string) => {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+7 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

export const textCut = (text: string, limit: number): [string, boolean] => {
  text = text.trim();
  if (text.length <= limit) return [text, false];
  text = text.slice(0, limit); // тупо отрезать по лимиту
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    // нашлась граница слов, ещё укорачиваем
    text = text.substring(0, lastSpace);
  }
  return [text + '...', true];
};
