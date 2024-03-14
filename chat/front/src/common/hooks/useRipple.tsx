import { CSSProperties, RefObject, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/common/hooks/useDebounce";

interface IRippleOptions {
  delay?: number;
  background?: string;
}

const useRipple = <T extends HTMLElement>(ref: RefObject<T>, options?: IRippleOptions) => {
  const [ripples, setRipples] = useState<CSSProperties[]>([]);
  const debounce = useDebounce<number>(ripples.length, options?.delay || 1000);
  useEffect(() => {
    if (debounce) setRipples([]);
  }, [debounce]);

  const clickHandler = useCallback((e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect() as DOMRect;
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    const height = ref.current?.clientHeight || 0;
    const width = ref.current?.clientWidth || 0;
    const diameter = Math.max(width, height);

    setRipples((prev) => {
      return [
        ...prev,
        {
          top: top - diameter / 2,
          left: left - diameter / 2,
          height: diameter,
          width: diameter,
        },
      ];
    });
  }, []);

  useEffect(() => {
    ref.current?.addEventListener("click", clickHandler);
    return () => {
      ref.current?.removeEventListener("click", clickHandler);
    };
  }, [ref]);

  return ripples.map((style, i) => {
    return (
      <span
        key={i}
        className={"ripple"}
        style={{
          ...style,
          animation: `ripple ${options?.delay || 1000}ms linear`,
          background: options?.background || "#FFFFFF",
        }}
      />
    );
  });
};
export { useRipple };
