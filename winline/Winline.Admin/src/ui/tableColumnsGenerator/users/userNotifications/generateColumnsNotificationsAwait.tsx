import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteAction } from "../../../ActionsTable";
import type { TFunction } from "react-i18next";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { INotification } from "../../../../api/dto/users/INotificationAwait";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { Button } from "antd";

interface IHandlers {
  showDescriptionNotification: Function;
  showFormNotification?: Function;
  showDeleteModal?: Function;
  translation: TFunction<"translation">;
  projects: { label: string; value: string }[];
}

export const generateColumnsNotificationsAwait = (access: boolean, handlers: IHandlers, isHistory: boolean): ColumnsType<INotification> => {
  const columnId: ColumnType<INotification> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: "10%",
    ellipsis: true,
    fixed: "left",
    render: (text: string, entity: INotification) => <a onClick={() => handlers.showDescriptionNotification(entity)}>{text}</a>
  };
  const columnHeading: ColumnType<INotification> = {
    title: handlers.translation("common.heading"),
    dataIndex: "heading",
    width: "20%",
    ellipsis: true,
    render: (text) => <span>{text ?? "-"}</span>
  };
  const columnText: ColumnType<INotification> = {
    title: handlers.translation("common.text"),
    dataIndex: "message",
    width: "25%",
    ellipsis: true,
    render: (text) => text ?? handlers.translation("common.missing")
  };
  const columnProject: ColumnType<INotification> = {
    title: handlers.translation("common.project"),
    dataIndex: "projectId",
    width: "10%",
    ellipsis: true,
    render: (text) => (text ? handlers?.projects?.find((option) => option.value === text)?.label : "-")
  };
  const columnType: ColumnType<INotification> = {
    title: handlers.translation("common.type"),
    dataIndex: "type",
    width: "5%",
    ellipsis: true
  };
  const columnSuccessCounter: ColumnType<INotification> = {
    title: handlers.translation("users.notifications.successCounter"),
    dataIndex: "successCounter",
    fixed: "right",
    width: "10%",
    render: (text) => text
  };
  const columnDate: ColumnType<INotification> = {
    title: handlers.translation("common.sendTime"),
    dataIndex: "sendTime",
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnActions: ColumnType<INotification> = {
    title: handlers.translation("common.action"),
    key: "operation",
    fixed: "right",
    width: "10%",
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
  };

  const colums = [columnId, columnHeading, columnText, columnProject, columnType, columnDate];
  if (access && !isHistory) {
    colums.push(columnActions);
  }
  if (isHistory) {
    colums.push(columnSuccessCounter);
  }

  return colums;
};
