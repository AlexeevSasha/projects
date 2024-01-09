import { OrderStatusEnum } from "../interfaces/order/OrderStatusEnum";

export const orderStatusMap = new Map();

orderStatusMap.set(OrderStatusEnum.New, "Новая заявка");
orderStatusMap.set(OrderStatusEnum.Validation, "В обработке");
orderStatusMap.set(OrderStatusEnum.Completed, "Регистр готов");
orderStatusMap.set(OrderStatusEnum.Editing, "Редактирование");
