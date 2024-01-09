import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { getClubSection } from "common/constants/teams";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Staff, StaffFilters } from "common/interfaces/staff";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { rightsSelector } from "store/auth/authSelectors";
import { deleteClubsStaff, getClubsStaffsByFilter } from "store/clubsStaff/clubsStaffActionAsync";
import {
  clubsStaffCountSelector,
  clubsStaffLoadingSelector,
  clubsStaffsSelector,
} from "store/clubsStaff/clubsStaffSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { Redirect } from "../../ui/Redirect";
import { ClubsStaffFilters } from "./ClubsStaffFilters";
import { getClubsStaffColumns } from "./clubsStaffsColumns";

const ClubsStaffForm = lazy(async () =>
  import("./ClubsStaffForm").then((module) => ({ default: module.ClubsStaffForm }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const getInitialFilter = (SectionByTeam?: string) => ({
  pageSize: 10,
  pagination: 1,
  sorting: "SortOrder asc",
  FullName: "",
  Status: "",
  SectionByTeam,
});

interface IProps {
  access: boolean;
}

export const ClubsStaff = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(clubsStaffLoadingSelector);
  const count = useSelector(clubsStaffCountSelector);
  const staff = useSelector(clubsStaffsSelector);
  const rights = useSelector(rightsSelector);
  const [filters, setFilters] = useState<StaffFilters>(() => getInitialFilter(getClubSection(rights)));
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsStaff);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Staff["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsStaff.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteClubsStaff(id))
          .unwrap()
          .then(() => dispatch(getClubsStaffsByFilter(filters))),
    });
  };

  const columns = useMemo(() => getClubsStaffColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getClubsStaffsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("clubsStaff.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("clubsStaff.addEmployee")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsStaffFilters
            onChange={changeFilters}
            resetFilters={() => setFilters(getInitialFilter(getClubSection(rights)))}
          />

          <Table
            columns={columns}
            dataSource={staff}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Staff, StaffFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsStaffForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsStaffForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsStaff}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsStaff}`} />} />
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
