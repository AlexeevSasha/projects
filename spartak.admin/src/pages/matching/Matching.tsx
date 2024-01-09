import { Layout, Card, Table, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from "store";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getMatchingColumns } from "./matchingColumns";
import { MatchingFilters } from "./MatchingFilters";
import { Redirect } from "../../ui/Redirect";
import { MatchingFiltersType, MatchingItem } from "../../common/interfaces/matching";
import { getMatchingListByFilter } from "../../store/matching/matchingActionAsync";
import { useSelector } from "react-redux";
import {
  matchingCountSelector,
  matchingListSelector,
  matchingLoadingSelector,
} from "../../store/matching/matchingSelector";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { FilterChangeValue } from "common/interfaces/common";
import moment from "moment";

const MatchingForm = lazy(async () =>
  import("./MatchingForm").then((module) => ({
    default: module.MatchingForm,
  }))
);

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  //MatchType: "InStat",
  sorting: "MatchStartDateTime desc",
  MatchStartFromDate: moment(),
  withOutDeletedUtc: true,
};

interface IProps {
  access: boolean;
}

export const Matching = ({ access }: IProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<MatchingFiltersType>(initialValues);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(matchingLoadingSelector);
  const count = useSelector(matchingCountSelector);
  const matchList = useSelector(matchingListSelector);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(() => getMatchingColumns({ access }), [access]);

  const getMatches = () => dispatch(getMatchingListByFilter(filters));

  useEffect(() => {
    getMatches();
  }, [filters]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("matching.title")}</CardTitle>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <MatchingFilters
            onChange={changeFilters}
            resetFilters={() => setFilters(initialValues)}
            getMatchesByClick={getMatches}
          />

          <Table
            columns={columns}
            dataSource={matchList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<MatchingItem, MatchingFiltersType>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1320 }}
          />
        </Card>
      </Content>

      <Routes>
        {access && <Route path={routePaths.form.edit()} element={<MatchingForm filters={filters} />} />}
        {pathname !== `/${routePaths.matching}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.matching}`} />} />
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
