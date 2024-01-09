import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Player, PlayersFilters } from "common/interfaces/players";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { getClubsPlayersByFilter } from "store/clubsPlayers/clubsPlayersActionAsync";
import {
  clubsPlayersCountSelector,
  clubsPlayersLoadingSelector,
  clubsPlayersSelector,
} from "store/clubsPlayers/clubsPlayersSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getClubsPlayersColumns } from "./clubsPlayersColumns";
import { ClubsPlayersFilters } from "./ClubsPlayersFilters";
import { Redirect } from "../../ui/Redirect";
import i18n from "i18next";
import { rightsSelector } from "store/auth/authSelectors";
import { getClubSection } from "common/constants/teams";

const ClubsPlayersForm = lazy(async () =>
  import("./ClubsPlayersForm").then((module) => ({ default: module.ClubsPlayersForm }))
);

const { Header, Content } = Layout;
const { Title } = Typography;

interface IProps {
  access: boolean;
}

const getInitialFilter = (locale: string, SectionByTeam?: string) => ({
  pageSize: 10,
  pagination: 1,
  FullName: "",
  Status: "",
  sorting: `FullName/${locale} asc`,
  SectionByTeam,
});

export const ClubsPlayers = ({ access }: IProps) => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(clubsPlayersLoadingSelector);
  const count = useSelector(clubsPlayersCountSelector);
  const players = useSelector(clubsPlayersSelector);
  const rights = useSelector(rightsSelector);
  const [filters, setFilters] = useState<PlayersFilters>(() => getInitialFilter(locale, getClubSection(rights)));
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsPlayers);

  const changeFilters = useCallback(
    debounce(
      (value: FilterChangeValue) =>
        setFilters((prev) => ({
          ...prev,
          ...value,
          pagination: 1,
        })),
      400
    ),
    [setFilters]
  );

  const columns = useMemo(() => getClubsPlayersColumns({ access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getClubsPlayersByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("clubsPlayers.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("clubsPlayers.addPlayer")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsPlayersFilters
            onChange={changeFilters}
            resetFilters={() => setFilters(getInitialFilter(locale, getClubSection(rights)))}
          />

          <Table
            columns={columns}
            dataSource={players}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Player, PlayersFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsPlayersForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsPlayersForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsPlayers}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsPlayers}`} />} />
        )}
      </Routes>
    </>
  );
};

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;

const HeaderContent = styled(Header)`
  padding: 0 24px;
  background-color: ${theme.colors.white};
  flex-basis: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
