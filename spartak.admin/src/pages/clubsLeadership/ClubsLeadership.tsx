import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { ClubsLeadershipFilters } from "./ClubsLeadershipFilters";
import { getClubsLeadershipColumns } from "./ClubsLeadershipColumns";
import { Redirect } from "../../ui/Redirect";
import {
  clubsLeadershipCountSelector,
  clubsLeadershipLoadingSelector,
  clubsLeadershipSelector,
} from "../../store/clubsLeadership/clubsLeadershipSelectors";
import { ILeadership, LeadershipFilters } from "../../common/interfaces/ILeadership";
import { deleteClubsLeader, getClubsLeadershipByFilter } from "../../store/clubsLeadership/clubsLeadershipActionAsync";
import { rightsSelector } from "store/auth/authSelectors";
import { getClubSection } from "common/constants/teams";

const ClubsLeadershipForm = lazy(async () =>
  import("./ClubsLeadershipForm").then((module) => ({
    default: module.ClubsLeadershipForm,
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

export const ClubsLeadership = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<LeadershipFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(clubsLeadershipLoadingSelector);
  const count = useSelector(clubsLeadershipCountSelector);
  const leadership = useSelector(clubsLeadershipSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsLeadership);
  const rights = useSelector(rightsSelector);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: ILeadership["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsLeadership.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteClubsLeader(id))
          .unwrap()
          .then(() => dispatch(getClubsLeadershipByFilter({ ...filters, Section: getClubSection(rights) }))),
    });
  };

  const columns = useMemo(() => getClubsLeadershipColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getClubsLeadershipByFilter({ ...filters, Section: getClubSection(rights) }));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("clubsLeadership.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("clubsLeadership.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsLeadershipFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={leadership}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<ILeadership, LeadershipFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsLeadershipForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsLeadershipForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsLeadership}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsLeadership}`} />} />
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
