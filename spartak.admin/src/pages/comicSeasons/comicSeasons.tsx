import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { ComicSeasonFilterEntity, ComicSessonEntity } from "common/interfaces/kids";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteComicSeasons, getComicSeasonsByFilter } from "store/comicSeasons/comicSeasonsActionAsync";
import {
  comicSeasonsCountSelector,
  comicSeasonsListSelector,
  comicSeasonsLoadingSelector,
} from "store/comicSeasons/comicSeasonsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { theme } from "../../assets/theme/theme";
import { getComicSeasonsColumns } from "./comicSeasonsColumns";
import { ComicSeasonsFilters } from "./comicSeasonsFilters";

const ComicSeasonForm = lazy(async () =>
  import("./comicSeasonForm").then((module) => ({ default: module.ComicSeasonForm }))
);

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
};

interface IProps {
  access: boolean;
}

export const ComicSeasons = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState<ComicSeasonFilterEntity>(initialValues);
  const isLoading = useSelector(comicSeasonsLoadingSelector);
  const count = useSelector(comicSeasonsCountSelector);
  const comicSeasonsList = useSelector(comicSeasonsListSelector);
  const needsListUpdate = pathname.endsWith(routePaths.kidsSeasons);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: ComicSessonEntity["Id"]) => {
    Modal.confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteComicSeasons(id))
          .unwrap()
          .then(() => dispatch(getComicSeasonsByFilter(filters)))
          .catch(() => dispatch(noticeActions.add({ message: "Ошибка удаления.", type: "error" }))),
    });
  };

  const columns = useMemo(() => getComicSeasonsColumns({ access, onDelete: handleDelete }), [access]);

  useEffect(() => {
    dispatch(getComicSeasonsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("kids.seasonsTitle")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("kids.createSeason")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ComicSeasonsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={comicSeasonsList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<ComicSessonEntity, ComicSeasonFilterEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 768 }}
          />
        </Card>
      </Content>

      <Routes>{access && <Route path={routePaths.form.edit()} element={<ComicSeasonForm />} />}</Routes>
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
