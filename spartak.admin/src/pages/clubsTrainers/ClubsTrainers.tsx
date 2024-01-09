import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { getClubSection } from "common/constants/teams";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { rightsSelector } from "store/auth/authSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { Trainer, TrainerDto, TrainerFilters } from "../../common/interfaces/trainers";
import { useAppDispatch } from "../../store";
import { deleteTrainer, getTrainers } from "../../store/trainers/trainersActionAsync";
import {
  trainersCountSelector,
  trainersLoadingSelector,
  trainersSelector,
} from "../../store/trainers/trainersSelectors";
import { HeaderText } from "../../ui/HeaderText";
import { Redirect } from "../../ui/Redirect";
import { getClubsTrainersColumns } from "./clubsTrainersColumns";
import { ClubsTrainerFilters } from "./ClubsTrainersFilters";

const ClubsTrainersForm = lazy(async () =>
  import("./ClubsTrainersForm").then((module) => ({ default: module.ClubsTrainersForm }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const getInitialFilter = (Section?: string) => ({
  pageSize: 10,
  pagination: 1,
  FullName: "",
  Position: "",
  Status: undefined,
  sorting: "SortOrder asc",
  Section,
});

interface IProps {
  access: boolean;
}

export const ClubsTrainers = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoading = useSelector(trainersLoadingSelector);
  const count = useSelector(trainersCountSelector);
  const trainers = useSelector(trainersSelector);
  const rights = useSelector(rightsSelector);
  const [filters, setFilters] = useState<TrainerFilters>(() => getInitialFilter(getClubSection(rights)));
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsTrainers);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Trainer["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsTrainers.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteTrainer(id))
          .unwrap()
          .then(() => dispatch(getTrainers(filters))),
    });
  };

  const columns = useMemo(() => getClubsTrainersColumns({ onDelete: handleDelete, access }), [access]);

  useEffect(() => {
    console.log("filters", filters);
    needsListUpdate && dispatch(getTrainers(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("clubsTrainers.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("clubsTrainers.addTrainer")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsTrainerFilters
            onChange={changeFilters}
            resetFilters={() => setFilters(getInitialFilter(getClubSection(rights)))}
          />

          <Table
            bordered={false}
            columns={columns}
            dataSource={trainers}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<TrainerDto, TrainerFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsTrainersForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsTrainersForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsTrainers}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsTrainers}`} />} />
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
