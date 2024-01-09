import { useEffect, useRef } from "react";

export const usePrevious = <T,>(value: T) => {
  const prevValueRef = useRef(value);

  useEffect(() => {
    prevValueRef.current = value;
  });

  return prevValueRef;
};
