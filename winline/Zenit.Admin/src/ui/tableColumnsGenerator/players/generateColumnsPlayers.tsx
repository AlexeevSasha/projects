import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { IPlayer } from "../../../api/dto/IPlayer";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { DeleteAction } from "../../ActionsTable";

export const generateColumnsPlayers = (access: boolean, handlers: Record<string, Function>): ColumnsType<IPlayer> => {
  const columnIdPlayer: ColumnType<IPlayer> = {
    title: handlers.translation("common.id"),
    dataIndex: "id",
    ellipsis: true,
    sorter: false,
    showSorterTooltip: false,
    fixed: "left",
    width: "12%",
    render: (entity: IPlayer) => {
      return (
        <a
          onClick={() => {
            handlers.showDescriptionPlayer(entity);
            handlers.idEntityDesc(entity);
          }}
        >
          {entity}
        </a>
      );
    }
  };
  const columnLastName: ColumnType<IPlayer> = {
    title: handlers.translation("players.table.columns.lastName"),
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    render: (entity: IPlayer) => {
      return <div>{entity.firstName + " " + entity.lastName}</div>;
    }
  };
  const columnSeason: ColumnType<IPlayer> = {
    title: handlers.translation("players.season"),
    dataIndex: "season",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "10%",
    render: (entity) => {
      return <div>{entity ? entity.name : ""}</div>;
    }
  };
  const columnBirthDate: ColumnType<IPlayer> = {
    title: handlers.translation("players.birthday"),
    dataIndex: "birthday",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    render: (text: string) => getFormatedDate(text)
  };
  const columnPosition: ColumnType<IPlayer> = {
    title: handlers.translation("players.position"),
    dataIndex: "position",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "13%",
    render: (entity) => {
      return <div>{entity ? entity.name : ""}</div>;
    }
  };
  const columnSquadNumber: ColumnType<IPlayer> = {
    title: handlers.translation("players.squadNumber"),
    dataIndex: "number",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "10%"
  };
  const columnTeam: ColumnType<IPlayer> = {
    title: handlers.translation("players.team"),
    dataIndex: "team",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    width: "15%",
    render: (entity) => {
      return <div>{entity ? entity.name : ""}</div>;
    }
  };
  const columnActions: ColumnType<IPlayer> = {
    title: handlers.translation("common.action"),
    key: "operation",
    fixed: "right",
    width: "10%",
    render: (entity) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              handlers.showFormPlayer(entity);
              handlers.idEntityForm(entity.id);
              handlers.setIsEdit(true);
            }}
            title={handlers.translation("common.buttonsText.edit")}
          />
          <DeleteAction
            type="link"
            title={handlers.translation("common.delete")}
            icon={<DeleteOutlined />}
            onClick={() => handlers.deleteModal(entity.id)}
          />
        </div>
      );
    }
  };

  const colums = [columnIdPlayer, columnLastName, columnSeason, columnBirthDate, columnPosition, columnSquadNumber, columnTeam];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};
