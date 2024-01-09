import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getGraduateSectionsColumns } from "./graduateSectionsColumns";
import { GraduateSection, GraduateSectionsFiltersEntity } from "common/interfaces/graduateSections";
import {
  graduateSectionsCountSelector,
  graduateSectionsLoadingSelector,
  graduateSectionsSelector,
} from "store/graduateSections/graduateSectionsSelectors";
import {
  deleteGraduateSections,
  getGraduateSectionsByFilter,
} from "store/graduateSections/graduateSectionsActionAsync";
import { GraduateSectionsFilters } from "./GraduateSectionsFilters";

const GraduateSectionsForm = lazy(async () =>
  import("./GraduateSectionsForm").then((module) => ({
    default: module.GraduateSectionsForm,
  }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  sorting: "SortOrder asc",
  FullName: "",
  Status: "",
};

interface IProps {
  access: boolean;
}

export const GraduateSections = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<GraduateSectionsFiltersEntity>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(graduateSectionsLoadingSelector);
  const count = useSelector(graduateSectionsCountSelector);
  const sections = useSelector(graduateSectionsSelector);
  const needsListUpdate = pathname.endsWith(routePaths.graduateSections);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(() => getGraduateSectionsColumns({ access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getGraduateSectionsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("graduateSections.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("graduateSections.addSection")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <GraduateSectionsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={sections}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<GraduateSection, GraduateSectionsFiltersEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<GraduateSectionsForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<GraduateSectionsForm />} />,
        ]}
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
