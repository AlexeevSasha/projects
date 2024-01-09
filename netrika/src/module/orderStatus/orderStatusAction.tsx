import { actionCreator } from "../../store/action/actionCreator";
import { IOrderStatus } from "../../common/interfaces/order/IOrderStatus";

export class OrderStatusAction {
  static status = actionCreator.async<null, IOrderStatus, Error>("Order/STATUS");
  static enableNsiOption = actionCreator<boolean>("Order/ENABLE_NSI_OPTION");
}
