import type { ColumnsType } from "antd/es/table";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "common/helpers/phoneNumbersFormatted";
import type { User } from "common/interfaces/user";
import React from "react";
import { TFunction } from "react-i18next";

interface IHandlers {
  setUserDescription: React.Dispatch<User | undefined>;
  translation: TFunction<"translation">;
}

export const getUserViewColumns = (handlers: IHandlers, access?: boolean): ColumnsType<User> => {
  return [
    {
      title: handlers.translation("usersView.table.columns.phone"),
      dataIndex: "phone",
      sorter: true,
      showSorterTooltip: false,
      width: "25%",
      ellipsis: true,
      fixed: "left",
      render: (text, entity) => <a onClick={() => handlers.setUserDescription(entity)}>{phoneNumberFormatted(text)}</a>,
    },
    {
      title: handlers.translation("allPages.fio"),
      dataIndex: "lastName",
      sorter: true,
      showSorterTooltip: false,
      width: "25%",
      ellipsis: true,
      render: (text, entity) =>
        `${
          entity.lastName || entity.firstName ? entity.lastName.trim() + " " + entity.firstName.trim() : "отсутствует"
        }`,
    },
    {
      title: handlers.translation("usersView.table.columns.email"),
      dataIndex: "email",
      width: "25%",
      ellipsis: true,
      sorter: true,
      showSorterTooltip: false,
      render: (text) => text ?? "отсутствует",
    },
    {
      title: handlers.translation("usersView.table.columns.createdUtc"),
      dataIndex: "createdUtc",
      sorter: true,
      showSorterTooltip: false,
      width: "25%",
      render: (text: string) => formatInMoscowDate(text),
    },
  ];
};
