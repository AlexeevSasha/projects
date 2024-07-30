import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "../../../../common/helpers/phoneNumbersFormatted";
import type { IUser } from "../../../../api/dto/users/IUser";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { TFunction } from "react-i18next";
import type { ICity } from "../../../../api/dto/ICity";
import type { IClub } from "../../../../api/dto/IClub";
import { DeleteAction } from "../../../ActionsTable";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { DeleteOutlined } from "@ant-design/icons";

interface IHandlers {
  setUserDescription: Function;
  translation: TFunction<"translation">;
  cities: ICity[];
  clubs: IClub[];
  showDeleteModal: Function;
}

export const generateColumnsUserViewing = (access: boolean, handlers: IHandlers): ColumnsType<IUser> => {
  const columnId: ColumnType<IUser> = {
    title: handlers.translation("common.id"),
    showSorterTooltip: false,
    width: "15%",
    ellipsis: true,
    fixed: "left",
    render: (entity) => <a onClick={() => handlers.setUserDescription(entity)}>{entity.id}</a>
  };
  const columnPhone: ColumnType<IUser> = {
    title: handlers.translation("users.phone"),
    dataIndex: "phone",
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    ellipsis: true,
    render: (entity) => <span>{phoneNumberFormatted(entity)}</span>
  };
  const columnName: ColumnType<IUser> = {
    title: handlers.translation("users.lastName"),
    showSorterTooltip: false,
    width: "20%",
    ellipsis: true,
    render: (entity) =>
      entity?.lastName || entity?.firstName
        ? `${entity.lastName ? `${entity.lastName} ` : ""}${entity.firstName ? `${entity.firstName} ` : ""}${entity.middleName ?? ""}`
        : handlers.translation("common.missing")
  };
  const columnEmail: ColumnType<IUser> = {
    title: handlers.translation("common.email"),
    dataIndex: "email",
    width: "20%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (text) => text ?? handlers.translation("common.missing")
  };
  const columnCity: ColumnType<IUser> = {
    title: handlers.translation("users.city"),
    dataIndex: "cityId",
    width: "10%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (text) => handlers.cities.find((topic) => topic.id === text)?.nameRu ?? "отсутствует"
  };
  const columnProject: ColumnType<IUser> = {
    title: handlers.translation("common.project"),
    dataIndex: "clubId",
    width: "10%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (text) => handlers.clubs.find((club) => club.id === text)?.clubName ?? "отсутствует"
  };
  const columnCreated: ColumnType<IUser> = {
    title: handlers.translation("users.createdUtc"),
    dataIndex: "createdUtc",
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnActions: ColumnType<IUser> = {
    title: handlers.translation("common.action"),
    key: "operation",
    ellipsis: true,
    fixed: "right",
    width: "10%",
    render: (entity) => {
      return (
        <div>
          <DeleteAction
            type="link"
            title={handlers.translation("common.delete")}
            icon={<DeleteOutlined />}
            onClick={() => handlers.showDeleteModal?.(entity)}
          />
        </div>
      );
    }
  };

  const colums = [columnId, columnPhone, columnName, columnEmail, columnCity, columnProject, columnCreated];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
