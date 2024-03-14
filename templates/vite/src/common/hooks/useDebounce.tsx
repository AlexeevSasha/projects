import { useEffect, useState } from "react";

export const useDebounce = <T extends string | number>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, delay]);

  return debounceValue;
};
