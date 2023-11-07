import { AlphabetT } from "../interfaces/metaCatalogue";

export const alphabet = {
  ru: [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Э",
    "Ю",
    "Я",
  ],
  en: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  number: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
};

export const abbreviationAlphabet = {
  ru: "А - Я",
  en: "A - Z",
  number: "0 - 9",
} as const;

export const getKeyValueAlphabet = (search: string) => {
  const result: { alphabet: AlphabetT | ""; letter: string } = { alphabet: "", letter: "" };

  if (!search || typeof search !== "string") return result;

  for (let i = 0; i < Object.entries(alphabet).length; i++) {
    const [key, value] = Object.entries(alphabet)[i];
    const checkLetter = value.find((el: string) => el === search.charAt(0)?.toUpperCase());

    if (checkLetter) {
      result.alphabet = key as AlphabetT;
      result.letter = checkLetter;
      break;
    }
  }

  return result;
};
