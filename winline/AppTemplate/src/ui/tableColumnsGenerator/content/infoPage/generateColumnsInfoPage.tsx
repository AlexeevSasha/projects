import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { IInfoPage } from "../../../../api/dto/content/IInfoPage";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { StyledTooltip } from "../../../commonComponents";

export const generateColumnsInfoPage = (access: boolean, handlers: Record<string, Function>): ColumnsType<IInfoPage> => {
  const titleID: ColumnType<IInfoPage> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: 280,
    ellipsis: true,
    render: (text, entity) => (
      <>
        <a title={text} onClick={() => handlers.showDescriptionInfoPage(entity)}>
          {text}
        </a>
      </>
    )
  };

  const infoPageTitleColumn: ColumnType<IInfoPage> = {
    title: handlers.translation("common.title"),
    dataIndex: "name",
    width: 420,
    ellipsis: true
  };

  const infoPageTagColumn: ColumnType<IInfoPage> = {
    title: handlers.translation("marketing.infoPages.tag"),
    dataIndex: "tag",
    width: 360,
    ellipsis: true
  };

  const columnCreatedUtc: ColumnType<IInfoPage> = {
    title: handlers.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    showSorterTooltip: false,
    ellipsis: true,
    width: 360,
    render: (text) => getFormatedDate(text)
  };

  const columnActions: ColumnType<IInfoPage> = {
    title: handlers.translation("common.action"),
    key: "operation",
    align: "center",
    width: 200,
    ellipsis: true,
    render: (_, entity) => (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <StyledTooltip title={handlers.translation("common.buttonsText.edit")}>
          <Button type="link" icon={<EditOutlined />} onClick={() => handlers.showFormInfoPage(entity)} />
        </StyledTooltip>
        <StyledTooltip title={handlers.translation("common.delete")}>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handlers.showDeleteModal?.(entity.id)} />
        </StyledTooltip>
      </div>
    )
  };

  const colums = [titleID, infoPageTitleColumn, infoPageTagColumn, columnCreatedUtc];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
