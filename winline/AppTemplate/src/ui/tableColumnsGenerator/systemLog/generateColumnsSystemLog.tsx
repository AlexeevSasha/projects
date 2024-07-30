import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import styled from "styled-components";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { theme } from "../../../assets/theme/theme";
import type { ISystemLogItem } from "../../../api/dto/systemLog/ISystemLog";
import { TFunction } from "react-i18next";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

interface IHandlers {
  showDescriptionLog: Function;
  showDescriptionEmployee: Function;
  translation: TFunction<"translation">;
}

export const generateColumnsSystemLog = (handlers: IHandlers): ColumnsType<ISystemLogItem> => {
  const idColumn: ColumnType<ISystemLogItem> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    width: "30%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    render: (text, entity) => <a onClick={() => handlers.showDescriptionLog(entity)}>{text}</a>
  };
  const userNameColumn: ColumnType<ISystemLogItem> = {
    title: handlers.translation("systemLog.employee"),
    dataIndex: "userName",
    sorter: true,
    showSorterTooltip: false,
    width: "20%",
    ellipsis: true,
    render: (text) => <a onClick={() => handlers.showDescriptionEmployee(text)}>{text}</a>
  };
  const tableColumn: ColumnType<ISystemLogItem> = {
    title: handlers.translation("systemLog.tableName"),
    dataIndex: "tableName",
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    ellipsis: true,
    render: (text) => <span translate="no">{text}</span>
  };
  const actionColumn: ColumnType<ISystemLogItem> = {
    title: handlers.translation("common.action"),
    dataIndex: "actionName",
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    ellipsis: true,
    render: (text) => <span translate="no">{text}</span>
  };
  const changesFields: ColumnType<ISystemLogItem> = {
    title: handlers.translation("systemLog.dataChanges"),
    dataIndex: "dataChanges",
    showSorterTooltip: false,
    ellipsis: true,
    width: "20%",
    render: (text, entity) =>
      entity.dataChanges && typeof entity.dataChanges !== "string" ? (
        <ParagraphChanges isOneItem={entity.dataChanges.length === 1}>
          {entity.dataChanges instanceof Array && Object.keys(entity.dataChanges?.[0])[0] !== 'Key'
            ? entity.dataChanges.map((item, i: number) =>
              i > 1 ? null : (
                <span key={item.ColumnName}>
                  <span translate="no">{`${item.ColumnName}: `}</span>
                  <span>{`'${item.OriginalValue}' → '${item.NewValue}'`}</span>
                  {i === 1 && <span>...</span>}
                </span>
              )
            )
            : Object.entries(entity.dataChanges).map(([column, value], i: number) =>
              i > 1 ? null : (
                <span key={column}>
                  <span translate="no">{`${column}: `}</span>
                  <span>{Object.entries(value).map(([key, val]) => val && <span>{Object.values(val)}: </span>)}</span>
                  {i === 1 && <span>...</span>}
                </span>
              )
            )}
        </ParagraphChanges>
      ) : (
        <ParagraphChanges isOneItem={false}>{entity.dataChanges}</ParagraphChanges>
      )
  };
  const columnDate: ColumnType<ISystemLogItem> = {
    title: handlers.translation("common.createdDateTime"),
    dataIndex: "createdUtc",
    sorter: true,
    showSorterTooltip: false,
    width: "20%",
    render: (text) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };

  return [idColumn, userNameColumn, tableColumn, actionColumn, changesFields, columnDate];
};

const ParagraphChanges = styled.p<{ isOneItem: boolean }>`
  margin-bottom: 0;
  font-size: 12px;
  line-height: 20px;
  padding: ${({ isOneItem }) => isOneItem && "10px 0"};

  & > span {
    display: block;
    margin-bottom: 0;
  }

  & > span span:first-child,
  & > span span:nth-child(3) {
    color: ${theme.colors.middleGray};
  }
`;
