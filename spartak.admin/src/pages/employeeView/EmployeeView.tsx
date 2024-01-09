import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Employee, EmployeeViewFilters } from "common/interfaces/employee";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import {
  deleteEmployee,
  getEmployeeByFilter,
  updateEmployeeInvitation,
} from "store/employeeView/employeeViewActionAsync";
import {
  employeeListSelector,
  employeeViewCountSelector,
  employeeViewLoadingSelector,
} from "store/employeeView/employeeViewSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getEmployeeViewColumns } from "./employeeViewColumns";
import { EmployeeFilters } from "./EmployeeViewFilters";
import { getEmployeeRoleByFilter } from "../../store/employeeRole/employeeRoleActionAsync";
import { employeeRoleListSSelector } from "../../store/employeeRole/employeeRoleSelectors";
import { noticeActions } from "../../store/notice/notice";
import { Redirect } from "../../ui/Redirect";

const EmployeeForm = lazy(async () =>
  import("./EmployeeViewForm").then((module) => ({
    default: module.EmployeeForm,
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
  ActivationDate: "",
  RoleId: "",
};

interface IProps {
  access: boolean;
}

export const EmployeeView = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<EmployeeViewFilters>(initialValues);
  const [disableInvite, setDisableInvite] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(employeeViewLoadingSelector);
  const count = useSelector(employeeViewCountSelector);
  const employees = useSelector(employeeListSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.employee);
  const rolesForFilter = useSelector(employeeRoleListSSelector)?.map((role) => ({ label: role.Name, value: role.Id }));
  const roles = useSelector(employeeRoleListSSelector)?.filter((role) => !role.Policies.includes("fullAccess"));
  const rolesForAddEditItem = roles?.map((role) => ({ label: role.Name, value: role.Id }));

  const updateInvitation = useCallback(
    async (id: string) => {
      dispatch(updateEmployeeInvitation(id))
        .unwrap()
        .then((res) => {
          setDisableInvite((prev) => ({ ...prev, [id]: res.hasOwnProperty("id") }));
          dispatch(
            noticeActions.add({
              message: t("employee.successUpdateMessage"),
              closable: true,
            })
          );
        })
        .catch(() =>
          dispatch(
            noticeActions.add({
              message: t("employee.errorUpdateMessage"),
              closable: true,
              type: "error",
            })
          )
        );
    },
    [disableInvite]
  );

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Employee["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: <div style={{ width: "300px" }}>{t("employee.deleteConfirm")}</div>,
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteEmployee(id))
          .unwrap()
          .then(() => {
            dispatch(getEmployeeByFilter(filters));
            dispatch(
              noticeActions.add({
                message: t("employee.successDelete"),
                closable: true,
              })
            );
          }),
    });
  };

  const columns = useMemo(
    () => getEmployeeViewColumns({ onDelete: handleDelete, updateInvitation, disableInvite, access, roles }),
    [disableInvite, access, roles]
  );

  useEffect(() => {
    dispatch(getEmployeeRoleByFilter({}));
  }, []);

  useEffect(() => {
    needsListUpdate && dispatch(getEmployeeByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("employee.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.buttonsText.create")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <EmployeeFilters
            onChange={changeFilters}
            resetFilters={() => setFilters(initialValues)}
            roleSelectOptions={rolesForFilter}
          />

          <Table
            columns={columns}
            dataSource={employees}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Employee, EmployeeViewFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            scroll={{ x: 1320 }}
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<EmployeeForm roleOptions={rolesForAddEditItem} />} />,
          <Route key="2" path={routePaths.form.edit()} element={<EmployeeForm roleOptions={rolesForAddEditItem} />} />,
        ]}
        {pathname !== `/${routePaths.employee}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.employee}`} />} />
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
