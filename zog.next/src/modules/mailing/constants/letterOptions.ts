import { LetterEnum } from "../interfaces/LetterEnum";

export const letterOptions = Object.entries(LetterEnum).map(([key, value]) => ({
  label: value,
  value: key,
}));
