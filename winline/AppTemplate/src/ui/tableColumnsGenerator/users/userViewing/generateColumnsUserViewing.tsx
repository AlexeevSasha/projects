import React from "react";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "../../../../common/helpers/phoneNumbersFormatted";
import type { IUser } from "../../../../api/dto/users/IUser";
import type { ColumnsType } from "antd/es/table";
import { TFunction } from "react-i18next";

interface IHandlers {
  setUserDescription: React.Dispatch<IUser | undefined>;
  translation: TFunction<"translation">;
}

export const generateColumnsUserViewing = (access: boolean, handlers: IHandlers): ColumnsType<IUser> => {
  return [
    {
      title: handlers.translation("common.id"),
      showSorterTooltip: false,
      width: "15%",
      ellipsis: true,
      fixed: "left",
      render: (entity) => <a onClick={() => handlers.setUserDescription(entity)}>{entity.id}</a>
    },
    {
      title: handlers.translation("users.phone"),
      dataIndex: "phone",
      sorter: true,
      showSorterTooltip: false,
      width: "15%",
      ellipsis: true,
      render: (entity) => <span>{phoneNumberFormatted(entity)}</span>
    },
    {
      title: handlers.translation("users.lastName"),
      dataIndex: "lastName",
      showSorterTooltip: false,
      width: "25%",
      ellipsis: true,
      render: (text, entity) =>
        `${entity.lastName || entity.firstName
          ? entity?.lastName?.trim() + " " + entity?.firstName?.trim()
          : handlers.translation("common.missing")
        }`
    },
    {
      title: handlers.translation("common.email"),
      dataIndex: "email",
      width: "25%",
      ellipsis: true,
      sorter: true,
      showSorterTooltip: false,
      render: (text) => text ?? handlers.translation("common.missing")
    },
    {
      title: handlers.translation("users.createdUtc"),
      dataIndex: "createdUtc",
      sorter: true,
      showSorterTooltip: false,
      width: "25%",
      render: (text: string) => getFormatedDate(text)
    }
  ];
};
