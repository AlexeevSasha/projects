import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { IStory } from "../../../../api/dto/content/IStory";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { StyledTooltip } from "../../../commonComponents";
import { PublishDataStory } from "./PublishDataStory";

export const generateColumnsStory = (access: boolean, handlers: Record<string, Function>): ColumnsType<IStory> => {
  const titleId: ColumnType<IStory> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text, entity) => (
      <>
        <a title={text} onClick={() => handlers.showDescriptionStory(entity)}>
          {text}
        </a>
      </>
    )
  };

  const titleColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading"),
    dataIndex: "name",
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false
  };

  const titlePreviewColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading") + " " + handlers.translation("marketing.story.preview"),
    dataIndex: "additionalInfo",
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => text?.previewTitle
  };

  const autoPlayStoryColumn: ColumnType<IStory> = {
    title: handlers.translation("marketing.story.autoPlay"),
    dataIndex: "additionalInfo",
    key: "isAutoPlayStory",
    width: "10%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (entity) => <Checkbox checked={entity?.isAutoPlayStory} disabled />
  };

  const templateStoryColumn: ColumnType<IStory> = {
    title: handlers.translation("marketing.story.crmTemplate"),
    dataIndex: "additionalInfo",
    key: "isTemplate",
    width: "10%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (entity) => <Checkbox checked={entity?.isTemplate} disabled />
  };

  const columnDate: ColumnType<IStory> = {
    title: handlers.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    ellipsis: true,
    render: (text) => getFormatedDate(text)
  };

  const publishDate: ColumnType<IStory> = {
    title: handlers.translation("marketing.publishBefore"),
    dataIndex: "publishBefore",
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    ellipsis: true,
    render: (text, entity) => (
      <PublishDataStory
        isAccess={true}
        updatePublishDataCurrentStoryWithToken={handlers.updatePublishDataCurrentStoryWithToken}
        text={text}
        entity={entity}
      />
    )
  };

  const columnActions: ColumnType<IStory> = {
    title: handlers.translation("common.action"),
    key: "operation",
    align: "center",
    fixed: "right",
    width: "8%",
    ellipsis: true,
    render: (entity) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledTooltip title={handlers.translation("common.buttonsText.hide")}>
          <Button type="link" icon={<EyeInvisibleOutlined />} onClick={() => handlers.showUpdateModal("Hidden", entity)} />
        </StyledTooltip>
        <StyledTooltip title={handlers.translation("common.buttonsText.edit")}>
          <Button type="link" icon={<EditOutlined />} onClick={() => handlers.showStoryForm(entity)} />
        </StyledTooltip>
      </div>
    )
  };

  const colums = [titleId, titleColumn, titlePreviewColumn, autoPlayStoryColumn, templateStoryColumn, publishDate, columnDate];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
