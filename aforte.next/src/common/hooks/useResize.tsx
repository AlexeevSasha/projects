import { useEffect, useState } from "react";

type ResizeT = { width: number; height: number };

export const useResize = () => {
  const [size, setSize] = useState<ResizeT>({ width: 0, height: 0 });

  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
