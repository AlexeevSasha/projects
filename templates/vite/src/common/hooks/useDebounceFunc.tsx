import { useMemo } from "react";
import { debounce } from "@/common/utils/debounce";
import { usePrevious } from "@/common/hooks/usePrevious";

export const useDebounceFunc = <Fn extends (...args: unknown[]) => unknown>(callback: Fn, time: number) => {
  const previous = usePrevious<Fn>(callback);

  return useMemo(() => debounce((...args) => previous.current(...args), time), [time]);
};
