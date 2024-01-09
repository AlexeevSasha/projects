import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Tournament, TournamentFilter } from "common/interfaces/tournaments";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { getTournamentsByFilter } from "store/tournaments/tournamentsActionAsync";
import {
  tournamentsCountSelector,
  tournamentsLoadingSelector,
  tournamentsSelector,
} from "store/tournaments/tournamentSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getTournamentsColumns } from "./tournamentsColumns";
import { TournamentsFilters } from "./TournamentsFilters";

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  sorting: "",
  FullName: "",
  Status: "",
  Position: "",
  TournamentType: "Custom",
};

interface IProps {
  access: boolean;
}

export const TournamentsTable = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TournamentFilter>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(tournamentsLoadingSelector);
  const count = useSelector(tournamentsCountSelector);
  const tournaments = useSelector(tournamentsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.tournaments());

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(() => getTournamentsColumns({ access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getTournamentsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading && <Loader />}

      <HeaderContent>
        <CardTitle level={4}>{t("tournaments.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create + "/info")}>
            {t("allPages.buttonsText.create")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <TournamentsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={tournaments}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Tournament, TournamentFilter>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>
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
