import { votingEN } from "./votingEN";
import { votingRU } from "./votingRU";

export const langVoting: { [key: string]: typeof votingRU } = {
  ru: votingRU,
  en: votingEN,
};
