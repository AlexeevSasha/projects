import type { ColumnsType } from "antd/es/table";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { ILogUpdateChanges, LogType } from "common/interfaces/systemLog";
import i18n, { t } from "i18next";
import { isArray } from "lodash";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { isIsoDate } from "./SystemLogView";

type Props = {
  onPreview: (log: LogType) => void;
  onEmployeeVeiw: (log: LogType) => void;
};

export const getsystemLogColumns = ({ onPreview, onEmployeeVeiw }: Props): ColumnsType<LogType> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  const getChangesValue = (data?: Record<string, string> | string | null) => {
    return typeof data === "boolean"
      ? data
      : !data
      ? "-"
      : typeof data === "string" && isIsoDate(data)
      ? formatInMoscowDate(data, { withTime: true })
      : typeof data === "string" || typeof data === "number"
      ? data
      : JSON.stringify(data);
  };

  return [
    {
      title: <Title>{t("systemLog.rowId")}</Title>,
      dataIndex: "Id",
      sorter: true,
      showSorterTooltip: false,
      render: (text, log) => (
        <Link to="" onClick={() => onPreview(log)}>
          {text}
        </Link>
      ),
    },
    {
      title: <Title>{t("systemLog.employee")}</Title>,
      dataIndex: "UserName",
      sorter: true,
      showSorterTooltip: false,
      render: (text, log) => (
        <Link to="" onClick={() => onEmployeeVeiw(log)}>
          {text}
        </Link>
      ),
    },
    {
      title: <Title>{t("systemLog.entity")}</Title>,
      dataIndex: "TableName",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Title>{t("allPages.action")}</Title>,
      dataIndex: "ActionName",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Title>{t("systemLog.changedFields")}</Title>,
      dataIndex: "DataChanges",
      sorter: true,
      showSorterTooltip: false,
      width: 300,
      render: (_, entity) => {
        const parsedEntity = JSON.parse(entity.DataChanges);

        return entity.ActionName !== "Update" ? (
          <span>-</span>
        ) : parsedEntity && typeof parsedEntity !== "string" ? (
          <ParagraphChanges isOneItem={parsedEntity.length === 1}>
            {console.log("parsedEntity", parsedEntity)}
            {parsedEntity.map((item: ILogUpdateChanges) => {
              const oldValue = getChangesValue(item.OriginalValue)?.toString();
              const newValue = getChangesValue(item.NewValue)?.toString();

              return (
                <span key={item.ColumnName}>
                  <span translate="no">{`${item.ColumnName}: `}</span>
                  <span>{`
                      '${oldValue.length > 40 ? oldValue.slice(0, 41) + "..." : oldValue}'
                      → 
                      '${newValue.length > 40 ? newValue.slice(0, 41) + "..." : newValue}'`}</span>
                </span>
              );
            })}
          </ParagraphChanges>
        ) : (
          <ParagraphChanges isOneItem={false}>{entity.DataChanges}</ParagraphChanges>
        );
      },
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
  ];
};

const Title = styled.div`
  font-weight: 600;
`;

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
