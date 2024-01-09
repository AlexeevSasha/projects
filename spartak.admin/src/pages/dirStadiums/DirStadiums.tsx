import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Stadium, StadiumFilters } from "common/interfaces/stadiums";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { getStadiumsByFilter } from "store/dirStadiums/dirStadiumActionAsync";
import {
  dirStadiumsCountSelector,
  dirStadiumsLoadingSelector,
  dirStadiumsSelector,
} from "store/dirStadiums/dirStadiumsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getStadiumColumns } from "./columns";
import { DirStadiumsFilters } from "./DirStadiumsFilters";
import { Redirect } from "../../ui/Redirect";

const DirStadiumForm = lazy(async () =>
  import(/* DirStadiumForm */ "./DirStadiumForm").then((module) => ({
    default: module.DirStadiumForm,
  }))
);

const { Header, Content } = Layout;
const { Title } = Typography;

type Props = {
  access: boolean;
};

const initialValues = {
  pagination: 1,
  FullName: "",
  sorting: "",
  pageSize: 10,
};

export const DirStadiums = ({ access }: Props) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<StadiumFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(dirStadiumsLoadingSelector);
  const count = useSelector(dirStadiumsCountSelector);
  const stadiums = useSelector(dirStadiumsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.dirStadiums);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );
  const columns = useMemo(() => getStadiumColumns({ access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getStadiumsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("dirStadiums.table.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <DirStadiumsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={stadiums}
            rowKey={(entity: Stadium) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Stadium, StadiumFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<DirStadiumForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<DirStadiumForm />} />,
        ]}
        {pathname !== `/${routePaths.dirStadiums}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.dirStadiums}`} />} />
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
