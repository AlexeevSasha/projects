import { RefObject, useEffect } from "react";

type Props = {
  getPercent: (v: number) => number;
  minVal: number;
  maxVal: number;
  ref: RefObject<HTMLDivElement>;
};

export const usePercentRange = ({ getPercent, minVal, maxVal, ref }: Props) => {
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (ref.current) {
      ref.current.style.left = `${minPercent}%`;
      ref.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);
};
