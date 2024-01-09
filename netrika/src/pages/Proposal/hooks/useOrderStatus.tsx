import { useSelector } from "react-redux";
import { authorizationSelector } from "../../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../../module/orderStatus/orderStstusSelector";
import { useMemo } from "react";
import { orderAccess } from "../helpers/access";

export const useOrderStatus = () => {
  const { login } = useSelector(authorizationSelector);
  const { orderStatus } = useSelector(orderStatusSelector);

  return useMemo(() => {
    return orderAccess(login, orderStatus);
  }, [login, orderStatus]);
};
