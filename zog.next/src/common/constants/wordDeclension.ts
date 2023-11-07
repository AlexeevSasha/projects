// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
//В text нужно ввести массив слов:
//Первое слово отвечает за - 1, 21, 31, 41 и т.д.
//Второе слово отвечает за - 2, 3, 4, 22, 23, 24, 32, 33, 34 ... 102, 103, 104, 122, 123, 124  и т.д.
//Третье слово отвечает за -  5, 6, 7, ... 27, 28, 29, 30, 35 и т.д.

export const wordDeclension = (number: number, text: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return text[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};
