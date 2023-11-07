import { alphabet } from "../utils/alphabetArray";
import { LetterAlphabet } from "./LetterAlphabet";

type Props = {
  type: "ru" | "en" | "number";
  active: string;
  setActiveLetter: (v: string) => void;
};

export const Alphabet = ({ type, active, setActiveLetter }: Props) => {
  return (
    <>
      {alphabet[type]?.map((el) => (
        <LetterAlphabet onClick={() => setActiveLetter(el)} isActive={active === el} key={el}>
          {el}
        </LetterAlphabet>
      ))}
    </>
  );
};
