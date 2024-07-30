import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "../../../../common/helpers/phoneNumbersFormatted";
import type { IUser } from "../../../../api/dto/users/IUser";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { TFunction } from "react-i18next";
import type { ICity } from "../../../../api/dto/ICity";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";

interface IHandlers {
  setUserDescription: Function;
  translation: TFunction<"translation">;
  cities: ICity[];
}

export const generateColumnsUserViewing = (access: boolean, handlers: IHandlers): ColumnsType<IUser> => {
  const columnId: ColumnType<IUser> = {
    title: handlers.translation("common.id"),
    showSorterTooltip: false,
    width: "10%",
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
    width: "15%",
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
  const columnOs: ColumnType<IUser> = {
    title: handlers.translation("users.os"),
    dataIndex: "mobilePlatforms",
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => (text?.length ? text.join(",") : "-")
  };
  const columnPoints: ColumnType<IUser> = {
    title: handlers.translation("pointsSystem.loyalty.points"),
    dataIndex: "points",
    width: "10%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => text ?? "-"
  };
  const columnCreated: ColumnType<IUser> = {
    title: handlers.translation("users.createdUtc"),
    dataIndex: "createdUtc",
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };

  return [columnId, columnPhone, columnName, columnEmail, columnCity, columnOs, columnPoints, columnCreated];
};
