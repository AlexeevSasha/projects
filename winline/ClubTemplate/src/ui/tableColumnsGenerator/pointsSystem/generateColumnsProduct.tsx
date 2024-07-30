import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IProduct } from "../../../api/dto/pointsSystem";
import { DeleteAction } from "../../ActionsTable";
import SwitchWithModal from "../../SwitchWithModal";

export const generateColumnsProduct = (access: boolean, handlers: Record<string, Function>): ColumnsType<IProduct> => {
  const columnTitle: ColumnType<IProduct> = {
    title: handlers.translation("common.title"),
    dataIndex: "name",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: 300,
    render: (_, entity: IProduct) => {
      return <a onClick={() => handlers.showDescription(entity)}>{entity.name}</a>;
    }
  };
  const columnTotal: ColumnType<IProduct> = {
    title: handlers.translation("common.total"),
    dataIndex: "total",
    sorter: true,
    width: 150,
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnInStock: ColumnType<IProduct> = {
    title: handlers.translation("pointsSystem.products.inStock"),
    dataIndex: "inStock",
    sorter: true,
    width: 150,
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnIssued: ColumnType<IProduct> = {
    title: handlers.translation("pointsSystem.products.issuedNumber"),
    dataIndex: "issued",
    showSorterTooltip: false,
    sorter: true,
    width: 150
  };
  const columnPriceInPoints: ColumnType<IProduct> = {
    title: handlers.translation("pointsSystem.products.priceInPoints"),
    dataIndex: "priceInPoints",
    showSorterTooltip: false,
    sorter: true,
    width: 150
  };
  const columnVisible: ColumnType<IProduct> = {
    title: handlers.translation("pointsSystem.products.visible"),
    showSorterTooltip: false,
    width: 150,
    render: (entity) => {
      return (
        <SwitchWithModal
          title={handlers.translation("common.modal.title") + " " + handlers.translation("pointsSystem.products.modal.content.title")}
          status={entity.visible}
          content={handlers.translation(`pointsSystem.products.modal.content.${entity.visible ? "hide" : "show"}`)}
          changeVisibility={() => handlers.visibleModal({ id: entity.id, visible: !entity.visible })}
        />
      );
    }
  };

  const columnActions: ColumnType<IProduct> = access
    ? {
        title: handlers.translation("common.action"),
        key: "operation",
        fixed: "right",
        width: 110,
        render: (entity) => {
          return (
            <div>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handlers.showForm(entity)}
                title={handlers.translation("common.buttonsText.edit")}
              />
              <DeleteAction
                type="link"
                title={handlers.translation("common.delete")}
                icon={<DeleteOutlined />}
                onClick={() => handlers.deleteModal(entity.id)}
              />
            </div>
          );
        }
      }
    : {};

  const colums = [columnTitle, columnPriceInPoints, columnTotal, columnInStock, columnIssued];
  if (access) {
    colums.push(columnVisible, columnActions);
  }

  return colums;
};
