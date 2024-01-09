import { UserRolesEnum } from "../../../common/interfaces/user/UserRolesEnum";
import { OrderStatusEnum } from "../../../common/interfaces/order/OrderStatusEnum";

export enum Access {
  View = "view",
  Edit = "edit",
}

export const orderAccess = (user: string, status: OrderStatusEnum) => {
  let result = Access.View;

  if (user === UserRolesEnum.RegistrySuperUsr) {
    result = Access.Edit;
  }

  if (
    user === UserRolesEnum.RegistryAdmin &&
    (status === OrderStatusEnum.Validation || status === OrderStatusEnum.New || status === OrderStatusEnum.Editing)
  ) {
    result = Access.Edit;
  }

  if (
    (user === UserRolesEnum.RegistryExpert || user === UserRolesEnum.RegistrySuperExpert) &&
    (status === OrderStatusEnum.New || status === OrderStatusEnum.Editing)
  ) {
    result = Access.Edit;
  }

  return result;
};
