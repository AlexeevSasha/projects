import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Select, Table } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IPlayer, IPlayerFilters } from "../../api/dto/IPlayer";
import { ISelect } from "../../api/dto/ISelect";
import { getPlayer, getPositions, getSeasons, getTeams } from "../../api/requests/players";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { StateType, useAppDispatch } from "../../core/redux/store";

import { deletePlayerThunk, getAllPlayersThunk } from "../../modules/players/playersActionAsync";
import { playersSelectorEntities } from "../../modules/players/playersSelector";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { FiltersInputTwoSelects } from "../../ui/customFilters/FiltersInputTwoSelects";
import { Loader } from "../../ui/Loader";
import { generateColumnsPlayers } from "../../ui/tableColumnsGenerator/players/generateColumnsPlayers";
import { PlayerDescription } from "./components/form/modal/PlayerDescription";
import { PlayerForm } from "./components/form/PlayerForm";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";

const { Option } = Select;

const initialFilterParams = { fullname: "", sorting: "", pagination: 1, position: "", team: "" };

export const PlayersTable = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer | null>(null);
  const [currentPlayerDesc, setCurrentPlayerDesc] = useState<IPlayer | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idEntityForm, setIdEntityForm] = useState<string | null>(null);
  const [idEntityDesc, setIdEntityDesc] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDesc, setVisibleDesc] = useState<boolean>(false);
  const [positions, setPositions] = useState<ISelect[]>([]);
  const [teams, setTeams] = useState<ISelect[]>([]);
  const [seasons, setSeasons] = useState<ISelect[]>([]);
  const [filterValues, setFilterValues] = useState<IPlayerFilters>(initialFilterParams);

  const playerForChanged = useSelector<StateType, IPlayer | undefined>((state: StateType): IPlayer | undefined =>
    idEntityForm ? state.players.entities[idEntityForm] : undefined
  );

  const playerForDesc = useSelector<StateType, IPlayer | undefined>((state: StateType): IPlayer | undefined =>
    idEntityDesc ? state.players.entities[idEntityDesc] : undefined
  );

  useEffect(() => {
    if (playerForChanged) {
      getPlayer(playerForChanged.id).then((value) => {
        setCurrentPlayer(value);
      });
    }
    if (playerForDesc) {
      getPlayer(playerForDesc.id).then((value) => {
        setCurrentPlayerDesc(value);
      });
    }
  }, [playerForChanged, playerForDesc, idEntityDesc, idEntityForm]);

  const players = useSelector(playersSelectorEntities);

  const { isLoading, count } = useSelector((state: StateType) => state.players);

  const deleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("players.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deletePlayerThunk(id)).then(() => dispatch(getAllPlayersThunk(filterValues)));
      }
    });
  };

  const showFormPlayer = (id = null) => {
    setIdEntityForm(id);
    setCurrentPlayer(null);
    if (id) {
      setTimeout(() => {
        setVisible(!visible);
      }, 300);
    } else {
      setVisible(!visible);
    }
  };

  const showDescriptionPlayer = (id = null) => {
    setIdEntityDesc(id);
    setCurrentPlayerDesc(null);
    if (id) {
      setTimeout(() => {
        setVisibleDesc(!visibleDesc);
      }, 200);
    } else {
      setVisibleDesc(!visibleDesc);
    }
  };

  const columns = generateColumnsPlayers(access, {
    idEntityForm: setIdEntityForm,
    showFormPlayer,
    showDescriptionPlayer,
    idEntityDesc: setIdEntityDesc,
    deleteModal,
    translation: t,
    setIsEdit
  });

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  useEffect(() => {
    getPositions().then((value) => setPositions(value));
    getTeams().then((value) => setTeams(value));
    getSeasons().then((value) => setSeasons(value));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...initialFilterParams, sorting: prev.sorting }));
  }, [setFilterValues]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllPlayersThunk(filterValues));
  }, [getAllPlayersThunk, filterValues.fullname, filterValues.pagination, filterValues.position, filterValues.sorting, filterValues.team]);

  const positionsOptions = useMemo(
    () =>
      positions.map((value) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      )),
    [positions]
  );

  const teamsOptions = useMemo(
    () =>
      teams.map((value) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      )),
    [teams]
  );

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderStyled>
        <TitleStyled level={4}>{t("players.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock>
            <FiltersInputTwoSelects
              inputPlaceholder={t("common.filters.placeholders.title")}
              inputName={"fullname"}
              firstSelectPlaceholder={t("players.filters.placeholders.position")}
              firstSelectValue={filterValues.position ? filterValues.position : undefined}
              firstSelectName={"position"}
              firstSelectOptions={positionsOptions}
              secondSelectPlaceholder={t("players.filters.placeholders.team")}
              secondSelectValue={filterValues.team ? filterValues.team : undefined}
              secondSelectName={"team"}
              secondSelectOptions={teamsOptions}
              onChange={changeFilters}
              resetFilters={resetFilters}
              isDisabledResetFilters={isLoading}
            />
            {access && (
              <Button type="primary" onClick={() => showFormPlayer()} icon={<PlusOutlined />}>
                {t("common.buttonsText.create")}
              </Button>
            )}
          </FiltersButtonBlock>
          <Table
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<IPlayer> | SorterResult<IPlayer>[]) => {
              onChangeDataTable<IPlayer, IPlayerFilters>(pagination, sorter, filterValues, setFilterValues);
            }}
            columns={columns}
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            dataSource={players}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
      </ContentStyled>
      <PlayerForm
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        data={currentPlayer}
        visible={visible}
        filters={filterValues}
        onClose={() => showFormPlayer()}
        seasons={seasons}
        positions={positions}
        teams={teams}
      />
      <PlayerDescription data={currentPlayerDesc} visible={visibleDesc} onClose={() => showDescriptionPlayer()} />
    </>
  );
};
