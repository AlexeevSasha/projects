import { useEffect, useState } from "react";
import { getTimeToTimer } from "../assets/constants/date";

type Props = {
  endTime: string;
  onEnd?: () => void;
  format?: string;
};

const getUtcDate = (endTime: string) => +new Date(endTime) - Date.now();

export const Timer = ({ endTime, onEnd, format = "mm:ss" }: Props) => {
  const [milliseconds, setMilliseconds] = useState(() => getUtcDate(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      if (milliseconds < 1000) onEnd?.();
      else setMilliseconds(milliseconds - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [milliseconds]);

  useEffect(() => {
    setMilliseconds(getUtcDate(endTime));
  }, [endTime]);

  return <span>{getTimeToTimer(milliseconds, format)}</span>;
};
