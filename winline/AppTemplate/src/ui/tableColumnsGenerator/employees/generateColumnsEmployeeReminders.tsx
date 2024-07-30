import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IEmployeeReminder } from "../../../api/dto/employees/IEmployeeReminder";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { TFunction } from "react-i18next";

interface IHandler {
  showDescriptionReminder: Function;
  setShowEmployees: Function;
  translation: TFunction<"translation">;
}

export const generateColumnsEmployeeReminders = (access: boolean, handlers: IHandler): ColumnsType<IEmployeeReminder> => {
  const idReminder: ColumnType<IEmployeeReminder> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: "15%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    render: (text, entity: IEmployeeReminder) => <a onClick={() => handlers.showDescriptionReminder(entity)}>{text}</a>
  };
  const titleColumn: ColumnType<IEmployeeReminder> = {
    title: handlers.translation("common.heading"),
    dataIndex: "title",
    sorter: true,
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const textColumn: ColumnType<IEmployeeReminder> = {
    title: handlers.translation("common.text"),
    dataIndex: "text",
    sorter: true,
    width: "25%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const employees: ColumnType<IEmployeeReminder> = {
    title: handlers.translation("common.employees"),
    dataIndex: "employees",
    width: "25%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => handlers.setShowEmployees(text)
  };
  const dateColumn: ColumnType<IEmployeeReminder> = {
    title: handlers.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    sorter: true,
    width: "20%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (text) => getFormatedDate(text)
  };

  return [idReminder, titleColumn, textColumn, employees, dateColumn];
};
