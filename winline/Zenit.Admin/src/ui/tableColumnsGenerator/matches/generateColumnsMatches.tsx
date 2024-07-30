import { Button } from "antd";
import { EditOutlined, NotificationOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { IMatch } from "../../../api/dto/IMatch";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

export const generateColumnsMatches = (access: boolean, handlers: Record<string, Function>): ColumnsType<IMatch> => {
  const columnHomeTeam: ColumnType<IMatch> = {
    title: handlers.translation("matches.homeTeamName"),
    dataIndex: "homeTeamName",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: "20%"
  };
  const columnGuestTeam: ColumnType<IMatch> = {
    title: handlers.translation("matches.guestTeamName"),
    dataIndex: "guestTeamName",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: "20%"
  };
  const columnTournament: ColumnType<IMatch> = {
    title: handlers.translation("matches.tournament"),
    dataIndex: "tournament",
    sorter: true,
    width: "20%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnStartDate: ColumnType<IMatch> = {
    title: handlers.translation("common.createdDateTime"),
    dataIndex: "dateTimeStart",
    showSorterTooltip: false,
    sorter: true,
    width: access ? "20%" : "30%",
    render: (text: string) => getFormatedDate(text, formsConstantsValidation.dateTimeFormat)
  };
  const columnWinline: ColumnType<IMatch> = {
    title: handlers.translation("matches.table.columns.winline"),
    dataIndex: "winlineOddsEventId",
    sorter: false,
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (value) => value ?? "-"
  };
  const columnBiletka: ColumnType<IMatch> = {
    title: handlers.translation("matches.table.columns.biletka"),
    dataIndex: "ticketsEventId",
    sorter: false,
    width: "15%",
    ellipsis: true,
    showSorterTooltip: false,
    render: (value) => value ?? "-"
  };

  const columnActions: ColumnType<IMatch> = {
    title: handlers.translation("common.action"),
    key: "operation",
    fixed: "right",
    width: "12%",
    render: (entity) => {
      return (
        <div style={{ display: "flex" }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handlers.showForm(entity.id)}
            title={handlers.translation("common.buttonsText.edit")}
          />
          <Button
            type="link"
            icon={<NotificationOutlined />}
            onClick={() => handlers.handleSendTicketsNotification(entity.statisticEventId)}
            title={handlers.translation("matches.sendPush")}
            disabled={!entity.ticketsEventId}
          />
        </div>
      );
    }
  };

  const colums = [columnHomeTeam, columnGuestTeam, columnTournament, columnStartDate, columnWinline, columnBiletka];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
