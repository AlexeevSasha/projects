import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { TFunction } from "react-i18next";
import type { ILoyalty, ILoyaltyType } from "../../../api/dto/loyalty/ILoyalty";
import { theme } from "../../../assets/theme/theme";
import { IClub } from "../../../api/dto/IClub";
import { routePaths } from "../../../common/constants/routePaths";
import { Button, Tag } from "antd";
import { DeleteOutlined, DownloadOutlined, EditOutlined, FlagOutlined } from "@ant-design/icons";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

interface IHandlers {
  translation: TFunction<"translation">;
  access: boolean;
  showDescriptionLoyalty: Function;
  showStopModal: Function;
  showDeleteModal: Function;
  types: string[];
  clubs: IClub[];
  showEntityStepper: Function;
  saveReport: (fileExtension: string, loyaltyId: string) => void;
  navigate: Function;
}

export const generateColumnLoyalty = (handlers: IHandlers): ColumnsType<ILoyalty> => {
  const promotionNameColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("loyalty.table.columns.promotionName"),
    dataIndex: "name",
    width: handlers.access ? "12%" : "22%",
    showSorterTooltip: false,
    fixed: "left",
    render: (text, entity) => <a onClick={() => handlers.showDescriptionLoyalty(entity)}>{text}</a>
  };
  const loyaltyProgramColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("loyalty.table.columns.rewardType"),
    dataIndex: "condition",
    sorter: (a, b) => a.condition.award.type.localeCompare(b.condition.award.type),
    showSorterTooltip: false,
    width: handlers.access ? "10%" : "17%",
    render: (entity) => <text>{handlers.translation(`loyaltyForm.thirdStep.awards.${entity.award.type}`)}</text>
  };
  const projectColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("common.project"),
    dataIndex: "club",
    showSorterTooltip: false,
    width: "10%",
    render: (entity) => entity.clubName
  };
  const participantsCountColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("loyalty.participantsCount"),
    dataIndex: "acceptUser",
    sorter: true,
    showSorterTooltip: false,
    width: "9%",
    render: (entity) => entity.total
  };
  const beginDateColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("loyalty.beginDate"),
    dataIndex: "startDate",
    sorter: true,
    showSorterTooltip: false,
    width: "12%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const endDateColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("loyalty.endDate"),
    dataIndex: "endDate",
    sorter: true,
    showSorterTooltip: false,
    width: "12%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const statusColumn: ColumnType<ILoyalty> = {
    title: handlers.translation("common.status"),
    dataIndex: "status",
    showSorterTooltip: false,
    width: "10%",
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
            {handlers.translation(`common.statuses.female.${record.status}`)}
          </Tag>
        </>
      );
    }
  };
  const actionColumn: ColumnType<ILoyalty> = handlers.access
    ? {
        title: handlers.translation("common.action"),
        dataIndex: "action",
        sorter: false,
        showSorterTooltip: false,
        width: "10%",
        fixed: "right",
        render: (text, entity) => {
          return (
            <div style={{ display: "flex" }}>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  handlers.showEntityStepper(entity);
                  handlers.navigate(
                    entity.status === "scheduled" || entity.status === "published"
                      ? routePaths.tableContent.loyalty.main + "/" + routePaths.tableContent.loyalty.newLoyalty
                      : routePaths.tableContent.loyalty.main
                  );
                }}
                style={{
                  color: entity.status === "scheduled" || entity.status === "published" ? theme.colors.default : theme.colors.lightGray
                }}
                title={handlers.translation("common.buttonsText.edit")}
              />
              <Button
                style={{
                  color: entity.status === "completed" || entity.status === "outofstock" ? theme.colors.default : theme.colors.lightGray,
                  cursor: "pointer"
                }}
                disabled={entity.status === "scheduled" || entity.status === "published" ? true : false}
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => handlers.saveReport("CSV", entity.id)}
                title={handlers.translation("common.buttonsText.save")}
              />
              <Button
                style={{
                  color: entity.status === "completed" || entity.status === "outofstock" ? theme.colors.lightGray : theme.colors.default,
                  cursor: "pointer"
                }}
                disabled={entity.status === "completed" || entity.status === "outofstock" ? true : false}
                type="link"
                icon={<FlagOutlined />}
                onClick={() => handlers.showStopModal(entity)}
                title={handlers.translation("common.buttonsText.stop")}
              />
              <Button
                type="link"
                icon={<DeleteOutlined />}
                title={handlers.translation("common.delete")}
                onClick={() => handlers.showDeleteModal(entity)}
              />
            </div>
          );
        }
      }
    : {};

  return [
    promotionNameColumn,
    loyaltyProgramColumn,
    projectColumn,
    participantsCountColumn,
    beginDateColumn,
    endDateColumn,
    statusColumn,
    actionColumn
  ];
};
