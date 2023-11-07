import { PrimaryOrderTable } from "./PrimaryOrderTable";
import { PrimaryOrderDetails } from "./PrimaryOrderDetails";
import { DeletePrimaryOrder } from "./DeletePrimaryOrder";
import { GeneratePayPrimaryOrder } from "./GeneratePayPrimaryOrder";
import { FilterPrimaryOrders } from "./filterPrimaryOrders/filterPrimaryOrders";
import { CommentPrimaryOrder } from "./comment/CommentPrimaryOrder";

export const PrimaryOrder = () => <></>;

PrimaryOrder.PrimaryOrderTable = PrimaryOrderTable;
PrimaryOrder.PrimaryOrderDetails = PrimaryOrderDetails;
PrimaryOrder.DeletePrimaryOrder = DeletePrimaryOrder;
PrimaryOrder.GeneratePayPrimaryOrder = GeneratePayPrimaryOrder;
PrimaryOrder.FilterPrimaryOrders = FilterPrimaryOrders;
PrimaryOrder.CommentPrimaryOrder = CommentPrimaryOrder;
