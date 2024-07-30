import { Tag } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IOrder } from "../../../api/dto/pointsSystem";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "../../../common/helpers/phoneNumbersFormatted";

export const generateColumnsOrder = (access: boolean, handlers: Record<string, Function>): ColumnsType<IOrder> => {
  const columnTitle: ColumnType<IOrder> = {
    title: handlers.translation("pointsSystem.orders.table.user"),
    dataIndex: "name",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: 200,
    render: (_, entity: IOrder) => {
      return entity.user.name;
    }
  };
  const columnPhone: ColumnType<IOrder> = {
    title: handlers.translation("users.phone"),
    dataIndex: "phone",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: 150,
    render: (_, entity: IOrder) => <span> {phoneNumberFormatted(entity.user.phone)}</span>
  };
  const columnProductName: ColumnType<IOrder> = {
    title: handlers.translation("pointsSystem.orders.table.productTitle"),
    dataIndex: "product",
    sorter: true,
    width: 200,
    ellipsis: true,
    showSorterTooltip: false,
    render: (_, entity: IOrder) => {
      return entity.product.name;
    }
  };
  const columnDate: ColumnType<IOrder> = {
    title: handlers.translation("pointsSystem.orders.table.date"),
    dataIndex: "date",
    showSorterTooltip: false,
    sorter: true,
    width: 150,
    render: (text: string) => getFormatedDate(text)
  };
  const columnCode: ColumnType<IOrder> = {
    title: handlers.translation("pointsSystem.orders.table.code"),
    dataIndex: "orderCode",
    showSorterTooltip: false,
    sorter: true,
    width: 150,
    render: (code: IOrder["orderCode"]) => {
      return code ?? "-";
    }
  };

  const columnStatus: ColumnType<IOrder> = {
    title: handlers.translation("common.status"),
    dataIndex: "status",
    sorter: true,
    width: 100,
    showSorterTooltip: false,
    render: (status: IOrder["status"]) => {
      let color;
      switch (status) {
        case "New":
          color = "success";
          break;
        case "Approved":
          color = "geekblue";
          break;
        case "Rejected":
          color = "error";
          break;
        default:
          color = "default";
      }

      return (
        <>
          <Tag color={color} key={status}>
            {handlers.translation(`common.statuses.male.${status.toLowerCase()}`)}
          </Tag>
        </>
      );
    }
  };

  const columnActions: ColumnType<IOrder> = access
    ? {
        title: handlers.translation("common.action"),
        key: "operation",
        fixed: "right",
        width: 150,
        render: (entity: IOrder) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {(entity.status === "New" || entity.status === "Approved") && (
                <>
                  <a
                    onClick={() =>
                      handlers.handleChangeProductOrderStatus({ id: entity.id, status: entity.status === "New" ? "Approved" : "Issued" })
                    }
                  >
                    <CheckOutlined />{" "}
                    {handlers.translation(`pointsSystem.orders.buttonsText.${entity.status === "New" ? "approve" : "confirm"}`)}
                  </a>
                  <a onClick={() => handlers.handleChangeProductOrderStatus({ id: entity.id, status: "Rejected" })}>
                    <MinusOutlined /> {handlers.translation("common.buttonsText.reject")}
                  </a>
                </>
              )}
            </div>
          );
        }
      }
    : {};

  const colums = [columnPhone, columnTitle, columnProductName, columnDate, columnCode, columnStatus];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
