import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkListSessionSelector } from "./registerCheckListSessionActionSelector";
import { RegisterCheckListSessionThunk } from "./registerCheckListSessionThunk";

export const useSessionCheckList = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const sessionIdList = useSelector(checkListSessionSelector);

  const dispatch = useDispatch();

  const tick = useCallback(() => {
    if (!timer) {
      if (sessionIdList.length > 0) {
        setTimer(
          setInterval(() => {
            dispatch(RegisterCheckListSessionThunk.callSessionInfo());
          }, 3000)
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

  return function(id: number, page: number, count: number, filter?: string, orderColumn?: string, orderAsc?: boolean) {
    dispatch(RegisterCheckListSessionThunk.addIdToSession(id, page, count, filter, orderColumn, orderAsc));
  };
};
