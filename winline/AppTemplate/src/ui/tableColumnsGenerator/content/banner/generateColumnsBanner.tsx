import { PublishDataStory } from "../story/PublishDataStory";
import { Button } from "antd";
import { IBanner } from "../../../../api/dto/content/IBanner";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { StyledTooltip } from "../../../commonComponents";

export const generateColumnsBanner = (isPublished: boolean, access: boolean, handlers: Record<string, Function>): ColumnsType<IBanner> => {
  const titleId: ColumnType<IBanner> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text, entity) => (
      <>
        <a title={text} onClick={() => handlers.showDescriptionBanner(entity)}>
          {text}
        </a>
        <a>{text}</a>
      </>
    )
  };

  const titleBanner: ColumnType<IBanner> = {
    title: handlers.translation("common.title"),
    width: isPublished ? "15%" : "20%",
    dataIndex: "name",
    ellipsis: true,
    showSorterTooltip: false
  };

  const columnBannerCreatedUtc: ColumnType<IBanner> = {
    title: handlers.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    showSorterTooltip: false,
    ellipsis: true,
    width: isPublished ? "10%" : "15%",
    render: (text) => getFormatedDate(text)
  };

  const columsButtons: ColumnType<IBanner> = {
    title: handlers.translation("marketing.banner.table.columns.buttonsCount"),
    dataIndex: "bannerDataInfo",
    showSorterTooltip: false,
    width: isPublished ? "10%" : "15%",
    ellipsis: true,
    render: (_, entity) => (entity.additionalInfo?.bannerInfo?.length ? entity.additionalInfo.bannerInfo.length : 0)
  };

  const publishDate: ColumnType<IBanner> = {
    title: handlers.translation("marketing.publishBefore"),
    dataIndex: "publishBefore",
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    ellipsis: true,
    render: (text, entity) => (
      <PublishDataStory
        isAccess={true}
        updatePublishDataCurrentStoryWithToken={handlers.updatePublishDataCurrentBannerWithToken}
        text={text}
        entity={entity}
      />
    )
  };

  const columnActions: ColumnType<IBanner> = {
    title: handlers.translation("common.action"),
    key: "operation",
    align: "center",
    fixed: "right",
    width: "8%",
    ellipsis: true,
    render: (_, entity) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {entity.contentStatus === "Published" ? (
            <StyledTooltip title={handlers.translation("common.buttonsText.hide")}>
              <Button type="link" icon={<EyeInvisibleOutlined />} onClick={() => handlers.showUpdateModal("Hidden", entity)} />
            </StyledTooltip>
          ) : (
            <StyledTooltip title={handlers.translation("common.buttonsText.publish")}>
              <Button type="link" icon={<EyeOutlined />} onClick={() => handlers.showUpdateModal("Published", entity)} />
            </StyledTooltip>
          )}
          <StyledTooltip title={handlers.translation("common.buttonsText.edit")}>
            <Button type="link" icon={<EditOutlined />} onClick={() => handlers.showBannerForm(entity)} />
          </StyledTooltip>
          {entity.contentStatus !== "Published" && (
            <StyledTooltip title={handlers.translation("common.delete")}>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => handlers.showDeleteModal(entity.id)} />
            </StyledTooltip>
          )}
        </div>
      );
    }
  };

  const colums = isPublished
    ? [titleId, titleBanner, columsButtons, columnBannerCreatedUtc, publishDate]
    : [titleId, titleBanner, columsButtons, columnBannerCreatedUtc];

  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
