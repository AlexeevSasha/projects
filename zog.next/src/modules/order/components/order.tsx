import { FilterOrders } from "./filterOrders/filterOrders";
import { TableOrders } from "./tableOrders/tableOrders";
import { ChangeImageOrder } from "./imageOrder/ChangeImageOrder";
import { AddImageOrder } from "./imageOrder/AddImageOrder";
import { DeleteImageOrder } from "./imageOrder/DeleteImageOrder";

const Orders = () => {
  return <></>;
};

Orders.TableOrders = TableOrders;
Orders.Filter = FilterOrders;
Orders.ChangeImageOrder = ChangeImageOrder;
Orders.AddImageOrder = AddImageOrder;
Orders.DeleteImageOrder = DeleteImageOrder;

export { Orders };
