import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Team, TeamsFilters, TeamType } from "common/interfaces/teams";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteClubsTeam, getClubsTeamsByFilter } from "store/clubsTeams/clubsTeamsActionAsync";
import {
  clubsTeamsCountSelector,
  clubsTeamsLoadingSelector,
  clubsTeamsSelector,
} from "store/clubsTeams/clubsTeamsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getClubsTeamsColumns } from "./clubsTeamsColumns";
import { ClubsTeamsFilters } from "./ClubsTeamsFilters";
import { HeaderText } from "../../ui/HeaderText";
import { noticeActions } from "../../store/notice/notice";
import { Redirect } from "../../ui/Redirect";
import { rightsSelector } from "store/auth/authSelectors";
import { getClubSection } from "common/constants/teams";

const ClubsTeamsForm = lazy(async () =>
  import("./ClubsTeamsForm").then((module) => ({
    default: module.ClubsTeamsForm,
  }))
);

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  FullName: "",
  sorting: "InStatId desc",
  TeamType: TeamType.own,
};

interface IProps {
  access: boolean;
}

export const ClubsTeams = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TeamsFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(clubsTeamsLoadingSelector);
  const count = useSelector(clubsTeamsCountSelector);
  const teams = useSelector(clubsTeamsSelector);
  const rights = useSelector(rightsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsTeams);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (Id: Team["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsTeams.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteClubsTeam(Id))
          .unwrap()
          .then(() => {
            dispatch(getClubsTeamsByFilter({ ...filters, Section: getClubSection(rights) }));
            dispatch(
              noticeActions.add({
                message: "Команда успешно удалена.",
                closable: true,
              })
            );
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: "Ошибка удаления.",
                closable: true,
                type: "error",
              })
            )
          ),
    });
  };

  const columns = useMemo(() => getClubsTeamsColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getClubsTeamsByFilter({ ...filters, Section: getClubSection(rights) }));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("clubsTeams.title")}</CardTitle>

        {access && (
          <CreateBtn type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.addTeam")}
          </CreateBtn>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsTeamsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={teams}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Team, TeamsFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsTeamsForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsTeamsForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsTeams}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsTeams}`} />} />
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

const CreateBtn = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    margin-bottom: 24px;
  }
  & > span:first-child {
    height: 13px;
  }
  & > span:last-child {
    margin-left: 6px;
  }
`;
