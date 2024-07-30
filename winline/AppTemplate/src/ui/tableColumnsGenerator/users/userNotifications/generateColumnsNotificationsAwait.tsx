import { DeleteAction } from "../../../ActionsTable";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { TUnionNotification } from "../../../../api/dto/users/INotificationAwait";
import { TFunction } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { Button } from "antd";

interface IHandlers {
  showDescriptionNotification: Function;
  showFormNotification?: Function;
  showDeleteModal?: Function;
  translation: TFunction<"translation">;
}

export const generateColumnsNotificationsAwait = (
  access: boolean,
  handlers: IHandlers,
  isHistory: boolean
): ColumnsType<TUnionNotification> => {
  const columnId: ColumnType<TUnionNotification> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    showSorterTooltip: false,
    width: "12%",
    ellipsis: true,
    fixed: "left",
    render: (text: string, entity: TUnionNotification) => <a onClick={() => handlers.showDescriptionNotification(entity)}>{text}</a>
  };
  const columnHeading: ColumnType<TUnionNotification> = {
    title: handlers.translation("common.heading"),
    dataIndex: "heading",
    showSorterTooltip: false,
    width: "25%",
    ellipsis: true,
    render: (text) => <span>{text ?? "-"}</span>
  };

  const columnText: ColumnType<TUnionNotification> = {
    title: handlers.translation("common.text"),
    dataIndex: "message",
    width: "36%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => text ?? handlers.translation("common.missing")
  };
  const columnType: ColumnType<TUnionNotification> = {
    title: handlers.translation("users.notifications.type"),
    dataIndex: "type",
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnDate: ColumnType<TUnionNotification> = {
    title: handlers.translation("common.sendTime"),
    dataIndex: "sendTime",
    sorter: true,
    showSorterTooltip: false,
    width: "17%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnActions: ColumnType<TUnionNotification> =
    access && !isHistory
      ? {
          title: handlers.translation("common.action"),
          key: "operation",
          fixed: "right",
          width: "12%",
          render: (entity) => {
            return access ? (
              <div>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handlers.showFormNotification?.(entity)}
                  title={handlers.translation("common.buttonsText.edit")}
                />
                <DeleteAction
                  type="link"
                  title={handlers.translation("common.delete")}
                  icon={<DeleteOutlined />}
                  onClick={() => handlers.showDeleteModal?.(entity)}
                />
              </div>
            ) : (
              <></>
            );
          }
        }
      : {};

  return [columnId, columnHeading, columnText, columnType, columnDate, columnActions];
};
