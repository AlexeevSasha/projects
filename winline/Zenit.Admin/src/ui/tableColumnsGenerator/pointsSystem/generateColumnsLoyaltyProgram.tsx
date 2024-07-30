import { Button, Tag } from "antd";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { ILoyaltyProgram } from "../../../api/dto/pointsSystem";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

export const generateColumnsLoyaltyProgram = (access: boolean, handlers: Record<string, Function>): ColumnsType<ILoyaltyProgram> => {
  const columnTitle: ColumnType<ILoyaltyProgram> = {
    title: handlers.translation("common.title"),
    ellipsis: true,
    sorter: false,
    showSorterTooltip: false,
    fixed: "left",
    width: 300,
    render: (entity: ILoyaltyProgram) => {
      return <a onClick={() => handlers.showDescription(entity)}>{handlers.translation(`pointsSystem.loyalty.${entity?.type}`)}</a>;
    }
  };
  const columnParticipantsNumber: ColumnType<ILoyaltyProgram> = {
    title: handlers.translation("pointsSystem.participantsNumber"),
    dataIndex: "participantsNumber",
    sorter: false,
    width: 150,
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnStartDate: ColumnType<ILoyaltyProgram> = {
    title: handlers.translation("common.startDate"),
    dataIndex: "startDate",
    showSorterTooltip: false,
    sorter: false,
    width: 150,
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnEndDate: ColumnType<ILoyaltyProgram> = {
    title: handlers.translation("common.endDate"),
    dataIndex: "endDate",
    showSorterTooltip: false,
    sorter: false,
    width: 150,
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnStatus: ColumnType<ILoyaltyProgram> = {
    title: handlers.translation("common.status"),
    dataIndex: "status",
    sorter: false,
    width: 100,
    showSorterTooltip: false,
    render: (status) => {
      status = status.toLowerCase();

      return (
        <>
          <Tag color={status === "active" ? "green" : "default"}>{handlers.translation(`common.statuses.neutral.${status}`)}</Tag>
        </>
      );
    }
  };

  const columnActions: ColumnType<ILoyaltyProgram> = access
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
                disabled={entity.status === "hidden"}
              />
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => handlers.downloadReport(entity)}
                title={handlers.translation(`pointsSystem.downloadReport`)}
                disabled={entity.status === "waiting"}
              />
            </div>
          );
        }
      }
    : {};

  const colums = [columnTitle, columnParticipantsNumber, columnStartDate, columnEndDate, columnStatus];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
