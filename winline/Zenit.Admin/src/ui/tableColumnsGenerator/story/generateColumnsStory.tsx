import type { ColumnsType, ColumnType } from "antd/es/table";
import { PublishDataStory } from "../../../common/helpers/story/PublishDataStory";
import { Button, Checkbox } from "antd";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, MenuOutlined } from "@ant-design/icons";
import { DeleteAction } from "../../ActionsTable";
import type { IStory } from "../../../api/dto/content/story/story";
import { SortableHandle } from "react-sortable-hoc";

export const generateColumnsStory = (access: boolean, handlers: Record<string, Function>): ColumnsType<IStory> => {
  const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: "grab" }} />);
  const dndColumn: ColumnType<IStory> = {
    title: handlers.translation("story.table.columns.sort"),
    dataIndex: "sort",
    className: "drag-visible",
    width: "5%",
    render: () => <DragHandle />
  };

  const sortColumn: ColumnType<IStory> = {
    title: handlers.translation("story.table.columns.number"),
    key: "index",
    className: "drag-visible",
    width: "4%",
    showSorterTooltip: false,
    render: (text, entity, index) => <span>{index + 1}</span>
  };

  const titleColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading"),
    className: "drag-visible",
    width: "9%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity) => <a onClick={() => handlers.showDescriptionStory(entity)}>{entity.name}</a>
  };

  const titlePreviewColumn: ColumnType<IStory> = {
    title: handlers.translation("common.heading") + " " + handlers.translation("story.preview").toLowerCase(),
    dataIndex: "additionalInfo",
    className: "drag-visible",
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity) => entity.previewTitle
  };

  const autoPlayStoryColumn: ColumnType<IStory> = {
    title: handlers.translation("story.autoPlay"),
    dataIndex: "additionalInfo",
    className: "drag-visible",
    width: "4%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (entity) => <Checkbox checked={entity.isAutoPlayStory} disabled />
  };

  const publishDate: ColumnType<IStory> = {
    title: handlers.translation("story.beginningPublishDate"),
    dataIndex: "beginningPublication",
    className: "drag-visible",
    width: "7%",
    showSorterTooltip: false,
    render: (text, entity) => (
      <PublishDataStory
        isAccess={access}
        type="begin"
        updateBeginningPublicationDate={handlers.updateBeginningPublicationDate}
        text={text}
        entity={entity}
      />
    )
  };

  const endDate: ColumnType<IStory> = {
    title: handlers.translation("story.endPublishDate"),
    dataIndex: "endPublication",
    className: "drag-visible",
    showSorterTooltip: false,
    width: "7%",
    render: (text, entity) => (
      <PublishDataStory
        isAccess={access}
        type="end"
        updateEndPublicationDate={handlers.updateEndPublicationDate}
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
    width: "5%",
    render: (entity) => {
      return (
        <div style={{ display: "flex" }}>
          <Button
            type="link"
            icon={<EyeInvisibleOutlined />}
            onClick={() => handlers.showUpdateModal("Hidden", entity)}
            title={handlers.translation("story.table.actions.hide")}
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

  const colums = [dndColumn, sortColumn, titleColumn, titlePreviewColumn, autoPlayStoryColumn, publishDate, endDate];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
