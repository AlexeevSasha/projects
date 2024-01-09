import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Graduate, GraduatesFiltersEntity } from "common/interfaces/graduates";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteGraduate, getGraduatesByFilter, getGraduateSectionOptions } from "store/graduates/graduatesActionAsync";
import {
  graduatesCountSelector,
  graduatesLoadingSelector,
  graduatesSelector,
} from "store/graduates/graduatesSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getGraduatesColumns } from "./graduatesColumns";
import { GraduatesFilters } from "./GraduatesFilters";

const GraduatesForm = lazy(async () =>
  import("./GraduatesForm").then((module) => ({
    default: module.GraduatefForm,
  }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  FullName: "",
  Status: "",
};

interface IProps {
  access: boolean;
}

export const Graduates = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<GraduatesFiltersEntity>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(graduatesLoadingSelector);
  const count = useSelector(graduatesCountSelector);
  const gratuates = useSelector(graduatesSelector);
  const needsListUpdate = pathname.endsWith(routePaths.graduates);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Graduate["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsStaff.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteGraduate(id))
          .unwrap()
          .then(() => dispatch(getGraduatesByFilter(filters))),
    });
  };

  const columns = useMemo(() => getGraduatesColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getGraduatesByFilter(filters));
  }, [filters, needsListUpdate]);

  useEffect(() => {
    dispatch(getGraduateSectionOptions());
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("graduates.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.buttonsText.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <GraduatesFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={gratuates}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Graduate, GraduatesFiltersEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<GraduatesForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<GraduatesForm />} />,
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
