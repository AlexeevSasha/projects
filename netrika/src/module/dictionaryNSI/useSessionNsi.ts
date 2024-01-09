import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryNSISelector } from "./dictionaryNSISelector";
import { DictionaryNSIThunk } from "./dictionaryNSIThunk";

export const useSessionNsi = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { sessionIdList } = useSelector(dictionaryNSISelector);

  const dispatch = useDispatch();
  const tick = useCallback(() => {
    if (!timer) {
      if (sessionIdList.length > 0) {
        setTimer(
          setInterval(() => {
            dispatch(DictionaryNSIThunk.callSessionInfo());
          }, 5000)
        );
      } else {
        clearInterval(timer);
      }
    } else {
      if (sessionIdList.length === 0) {
        clearInterval(timer);
        setTimer(undefined);
      }
    }
  }, [sessionIdList, timer, dispatch]);

  useEffect(() => {
    tick();
  }, [sessionIdList, tick]);

  useEffect(() => {
    return () => timer && clearInterval(timer);
  }, [timer]);

  return function(dictionaryOid: string) {
    if (!sessionIdList.find((item) => item.id === dictionaryOid))
      dispatch(DictionaryNSIThunk.saveDictionaryNSI(dictionaryOid));
  };
};
