import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Team, TeamsFilters, TeamType } from "common/interfaces/teams";
import debounce from "lodash/debounce";
import { getDirTeamsColumns } from "pages/dirTeams/dirTeamsColumns";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteDirTeam, getDirTeamsByFilter } from "store/dirTeams/dirTeamsActionAsync";
import { dirTeamsCountSelector, dirTeamsLoadingSelector, dirTeamsSelector } from "store/dirTeams/dirTeamsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { DirTeamsFilters } from "./DirTeamsFilters";
import { Redirect } from "../../ui/Redirect";
import confirm from "antd/lib/modal/confirm";
import { HeaderText } from "ui/HeaderText";
import { noticeActions } from "store/notice/notice";

const DirTeamsForm = lazy(async () =>
  import("./DirTeamsForm").then((module) => ({
    default: module.DirTeamsForm,
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
  DeletedUtc: "",
  sorting: "",
  TeamType: TeamType.opposite,
  pageSize: 10,
};

export const DirTeams = ({ access }: Props) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TeamsFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(dirTeamsLoadingSelector);
  const count = useSelector(dirTeamsCountSelector);
  const teams = useSelector(dirTeamsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.dirTeams);

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
        dispatch(deleteDirTeam(Id))
          .unwrap()
          .then(() => {
            dispatch(getDirTeamsByFilter(filters));
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

  const columns = useMemo(() => getDirTeamsColumns({ access, onDelete: handleDelete }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getDirTeamsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("dirTeam.table.title")}</CardTitle>

        {access && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <DirTeamsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

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
          <Route key="1" path={routePaths.form.create} element={<DirTeamsForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<DirTeamsForm />} />,
        ]}
        {pathname !== `/${routePaths.dirTeams}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.dirTeams}`} />} />
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
