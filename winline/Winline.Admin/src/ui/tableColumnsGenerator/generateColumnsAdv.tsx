import { getFormatedDate } from "../../common/helpers/getFormatedDate";
import { DeleteAction } from "../ActionsTable";
import { Button, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IAdv } from "../../api/dto/adv/IAdv";
import { formsConstantsValidation } from "../../common/constants/formsConstantsValidation";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const generateColumnsAdv = (access: boolean, handlers: Record<string, Function>, actionFlag: boolean = false): ColumnsType<IAdv> => {
  const columnTitle: ColumnType<IAdv> = {
    title: handlers.translation("common.title"),
    ellipsis: true,
    sorter: false,
    showSorterTooltip: false,
    fixed: "left",
    width: "25%",
    render: (entity: IAdv) => {
      return <a onClick={() => handlers.showDescriptionAdv(entity)}>{entity.name}</a>;
    }
  };
  const columnPlace: ColumnType<IAdv> = {
    title: handlers.translation("common.place"),
    dataIndex: "locationName",
    sorter: true,
    width: "25%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnStatus: ColumnType<IAdv> = {
    title: handlers.translation("common.status"),
    dataIndex: "status",
    sorter: false,
    width: "10%",
    showSorterTooltip: false,
    render: (status, record) => {
      let color = "default";
      if (record.status == "scheduled") {
        color = "warning";
      }
      if (record.status == "published") {
        color = "green";
      }

      return (
        <>
          <Tag color={color} key={color}>
            {handlers.translation(`common.statuses.neutral.${record.status}`)}
          </Tag>
        </>
      );
    }
  };
  const columnProject: ColumnType<IAdv> = {
    title: handlers.translation("common.project"),
    dataIndex: "clubName",
    sorter: true,
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnStartDate: ColumnType<IAdv> = {
    title: handlers.translation("adv.table.columns.startDate"),
    dataIndex: "startPublish",
    showSorterTooltip: false,
    sorter: true,
    width: "10%",
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnEndDate: ColumnType<IAdv> = {
    title: handlers.translation("adv.table.columns.endDate"),
    dataIndex: "endPublish",
    showSorterTooltip: false,
    sorter: true,
    width: "10%",
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };

  const columnActions: ColumnType<IAdv> = {
    title: handlers.translation("common.action"),
    key: "operation",
    fixed: "right",
    width: "10%",
    render: (entity) => {
      return (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handlers.showFormAdv(entity)}
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
  };
  const colums = [columnTitle, columnPlace, columnStatus, columnProject, columnStartDate, columnEndDate];
  if (access && actionFlag) {
    colums.push(columnActions);
  }

  return colums;
};
