import { Button, Switch, Tag } from "antd";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IPoll } from "../../../api/dto/pointsSystem";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";
import { DeleteAction } from "../../ActionsTable";
import React from "react";

export const generateColumnsPoll = (access: boolean, handlers: Record<string, Function>): ColumnsType<IPoll> => {
  const columnTitle: ColumnType<IPoll> = {
    title: handlers.translation("common.type"),
    dataIndex: "type",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: 180,
    render: (_, entity) => (
      <a onClick={() => handlers.showDescription(entity)}>{handlers.translation(`pointsSystem.poll.${entity.type}`)}</a>
    )
  };
  const columnCountParticipants: ColumnType<IPoll> = {
    title: handlers.translation("pointsSystem.participantsNumber"),
    dataIndex: "participantsNumber",
    ellipsis: false,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: 100
  };
  const columnMatchName: ColumnType<IPoll> = {
    title: handlers.translation("common.match"),
    sorter: false,
    width: 200,
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity: IPoll) => {
      return entity.match.name;
    }
  };
  const columnStartDate: ColumnType<IPoll> = {
    title: handlers.translation("common.startDate"),
    dataIndex: "startDate",
    showSorterTooltip: false,
    sorter: true,
    width: 120,
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnEndDate: ColumnType<IPoll> = {
    title: handlers.translation("common.endDate"),
    dataIndex: "endPollDate",
    showSorterTooltip: false,
    sorter: true,
    width: 120,
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnEndPollDate: ColumnType<IPoll> = {
    title: handlers.translation("pointsSystem.poll.endDatePoll"),
    dataIndex: "endDate",
    showSorterTooltip: false,
    sorter: true,
    width: 120,
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnStatus: ColumnType<IPoll> = {
    title: handlers.translation("common.status"),
    dataIndex: "status",
    sorter: false,
    width: 100,
    showSorterTooltip: false,
    render: (status: IPoll["status"]) => {
      let color;
      switch (status) {
        case "Opened":
          color = "success";
          break;
        case "Created":
          color = "gold";
          break;
        case "Closed":
          color = "error";
          break;
        default:
          color = "default";
      }

      return (
        <>
          <Tag color={color} key={status}>
            {handlers.translation(`common.statuses.neutral.${status.toLowerCase()}`)}
          </Tag>
        </>
      );
    }
  };

  const columnResult: ColumnType<IPoll> = {
    title: handlers.translation("pointsSystem.poll.results"),
    showSorterTooltip: false,
    width: 110,
    render: (entity) => {
      return <Switch onClick={() => handlers.handleSetResults(entity)} checked={entity.hasResult} disabled={entity.hasResult} />;
    }
  };

  const columnActions: ColumnType<IPoll> = access
    ? {
        title: handlers.translation("common.action"),
        key: "operation",
        fixed: "right",
        width: 150,
        render: (entity: IPoll) => {
          return (
            <div>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handlers.showForm(entity)}
                title={handlers.translation("common.buttonsText.edit")}
                disabled={entity.status === "Finished"}
              />
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => handlers.downloadReport(entity)}
                title={handlers.translation(`pointsSystem.downloadReport`)}
                disabled={entity.status !== "Finished"}
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

  const colums = [columnTitle, columnCountParticipants, columnMatchName, columnStartDate, columnEndDate, columnEndPollDate, columnStatus];
  if (access) {
    colums.push(columnResult, columnActions);
  }

  return colums;
};
