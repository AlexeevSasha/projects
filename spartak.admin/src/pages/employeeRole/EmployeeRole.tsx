import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { EmployeeRoleFiltersType, EmployeeRoleType } from "common/interfaces/employee";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteEmployeeRole, getEmployeeRoleByFilter, getPolicies } from "store/employeeRole/employeeRoleActionAsync";
import {
  employeeRoleCountSelector,
  employeeRoleListSSelector,
  employeeRoleLoadingSelector,
} from "store/employeeRole/employeeRoleSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getEmployeeRoleColumns } from "./employeeRoleColumns";
import { EmployeeRoleFilters } from "./EmployeeRoleFilters";
import { RolePreview } from "./RolePreview";
import { Redirect } from "../../ui/Redirect";
import { noticeActions } from "../../store/notice/notice";
const EmployeeRoleForm = lazy(async () =>
  import(/* EmployeeRoleForm */ "./EmployeeRoleForm").then((module) => ({
    default: module.EmployeeRoleForm,
  }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  sorting: "",
  Name: "",
};

interface IProps {
  access: boolean;
}

export const EmployeeRole = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<EmployeeRoleFiltersType>(initialValues);
  const [role, setRole] = useState<EmployeeRoleType | undefined>();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(employeeRoleLoadingSelector);
  const count = useSelector(employeeRoleCountSelector);
  const roleList = useSelector(employeeRoleListSSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.employeeRole);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: EmployeeRoleType["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("roles.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteEmployeeRole(id))
          .unwrap()
          .then(() => {
            dispatch(getEmployeeRoleByFilter(filters));
            dispatch(
              noticeActions.add({
                message: t("roles.successDeleteMessage"),
                closable: true,
              })
            );
          }),
    });
  };

  const columns = useMemo(
    () => getEmployeeRoleColumns({ onDelete: handleDelete, onPreview: setRole, access }),
    [access]
  );

  useEffect(() => {
    dispatch(getPolicies());
  }, []);

  useEffect(() => {
    needsListUpdate && dispatch(getEmployeeRoleByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("roles.title")}</CardTitle>
        {access && (
          <Button
            type={"primary"}
            icon={<PlusOutlined />}
            disabled={isLoading}
            onClick={() => navigate(routePaths.form.create)}
          >
            {t("allPages.buttonsText.create")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <EmployeeRoleFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={roleList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<EmployeeRoleType, EmployeeRoleFiltersType>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <RolePreview role={role} onClose={() => setRole(undefined)} />

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<EmployeeRoleForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<EmployeeRoleForm />} />,
        ]}
        {pathname !== `/${routePaths.employeeRole}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.employeeRole}`} />} />
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
