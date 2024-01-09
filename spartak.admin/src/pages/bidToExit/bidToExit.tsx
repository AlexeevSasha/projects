import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Table, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { BidToExitEntity, BidToExitFiltersEntity } from "common/interfaces/kids";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from "store";
import { getBidToExitsByFilter, updateBidToExit } from "store/bidToExit/bidToExitActionAsync";
import {
  bidToExitCountSelector,
  bidToExitListSelector,
  bidToExitLoadingSelector,
} from "store/bidToExit/bidToExitSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { theme } from "../../assets/theme/theme";
import { getBidToExitListColumns } from "./bidToExitColumns";
import { BidToExitFilters } from "./bidToExitFilters";

const BidToExitForm = lazy(async () => import("./bidToExitForm").then((module) => ({ default: module.BidToExitForm })));

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  withOutDeletedUtc: true,
};

interface IProps {
  access: boolean;
}

export const BidToExit = ({ access }: IProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<BidToExitFiltersEntity>(initialValues);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(bidToExitLoadingSelector);
  const count = useSelector(bidToExitCountSelector);
  const bidToExitList = useSelector(bidToExitListSelector);
  const needsListUpdate = pathname.endsWith(routePaths.kidsBidToExit);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const updateStatus = (item: BidToExitEntity) => {
    dispatch(updateBidToExit(item));
  };

  const columns = useMemo(() => getBidToExitListColumns({ access, updateStatus }), [access]);

  useEffect(() => {
    dispatch(getBidToExitsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <Container>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("kids.kidsTitle")}</CardTitle>

        <Button type="primary" icon={<ReloadOutlined />} onClick={() => dispatch(getBidToExitsByFilter(filters))}>
          {t("allPages.buttonsText.refresh")}
        </Button>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <BidToExitFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={bidToExitList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<BidToExitEntity, BidToExitFiltersEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1920 }}
          />
        </Card>
      </Content>

      <Routes>{access && <Route path={routePaths.form.edit()} element={<BidToExitForm />} />}</Routes>
    </Container>
  );
};

const Container = styled.div`
  & .ant-table .ant-table-body {
    min-height: 210px;
  }

  & .ant-table .ant-table-cell {
    overflow: unset;
  }
`;

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
