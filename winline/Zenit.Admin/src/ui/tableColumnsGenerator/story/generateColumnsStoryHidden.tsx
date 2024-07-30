import type { ColumnsType, ColumnType } from "antd/es/table";
import { Button, Checkbox } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DeleteAction } from "../../ActionsTable";
import type { IStory } from "../../../api/dto/content/story/story";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

export const generateColumnsStoryHidden = (access: boolean, handlers: Record<string, Function>): ColumnsType<IStory> => {
  const titleColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading"),
    dataIndex: "name",
    width: "25%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (entity) => <a onClick={() => handlers.showDescriptionStory(entity)}>{entity}</a>
  };

  const titlePreviewColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading") + " " + handlers.translation("story.preview").toLowerCase(),
    dataIndex: "additionalInfo",
    width: "40%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity) => entity.previewTitle
  };

  const autoPlayStoryColumn: ColumnType<IStory> = {
    title: handlers.translation("story.autoPlay"),
    dataIndex: "additionalInfo",
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity) => <Checkbox checked={entity.isAutoPlayStory} disabled />
  };

  const publishDate: ColumnType<IStory> = {
    title: handlers.translation("story.beginningPublishDate"),
    dataIndex: "beginningPublication",
    width: "12%",
    sorter: true,
    showSorterTooltip: false,
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateFormat)
  };

  const endDate: ColumnType<IStory> = {
    title: handlers.translation("story.endPublishDate"),
    dataIndex: "endPublication",
    sorter: true,
    showSorterTooltip: false,
    width: "12%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateFormat)
  };

  const columnActions: ColumnType<IStory> = {
    title: handlers.translation("common.action"),
    key: "operation",
    align: "center",
    fixed: "right",
    width: "8%",
    render: (entity) => {
      return (
        <div style={{ display: "flex" }}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handlers.showUpdateModal("Published", entity)}
            title={handlers.translation("story.table.actions.active")}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handlers.showStoryForm(entity)}
            title={handlers.translation("common.buttonsText.edit")}
          />
          <DeleteAction
            type="link"
            title={handlers.translation("common.delete")}
            icon={<DeleteOutlined />}
            onClick={() => handlers.showDeleteModal(entity)}
          />
        </div>
      );
    }
  };
  const colums = [titleColumn, titlePreviewColumn, autoPlayStoryColumn, publishDate, endDate];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
