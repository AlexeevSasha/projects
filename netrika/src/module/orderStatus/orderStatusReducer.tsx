import { reducerWithInitialState } from "typescript-fsa-reducers";
import { OrderStatusAction } from "./orderStatusAction";
import { IOrderStatus } from "../../common/interfaces/order/IOrderStatus";

export interface IState {
  status: IOrderStatus;
  enableNsiOption: boolean;
}

export const InitialState: IState = {
  status: {} as IOrderStatus,
  enableNsiOption: false,
};

export const orderStatusReducer = reducerWithInitialState(InitialState)
  .case(OrderStatusAction.status.started, (state) => ({
    ...state,
    status: state.status,
  }))
  .case(OrderStatusAction.status.done, (state, payload) => ({
    ...state,
    status: payload.result,
  }))
  .case(OrderStatusAction.status.failed, (state) => ({
    ...state,
    status: { orderName: "Ошибка" } as IOrderStatus,
  }))

  .case(OrderStatusAction.enableNsiOption, (state, payload) => ({
    ...state,
    enableNsiOption: payload,
  }))

  .build();
