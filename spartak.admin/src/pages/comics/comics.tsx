import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { ComicEntity, ComicFilterEntity } from "common/interfaces/kids";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteComic, getComicsByFilter } from "store/comic/comicActionAsync";
import { comicCountSelector, comicListSelector, comicLoadingSelector } from "store/comic/comicSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { theme } from "../../assets/theme/theme";
import { getComicsColumns } from "./comicsColumns";
import { ComicsFilters } from "./comicsFilters";

const ComicsForm = lazy(async () => import("./comicForm").then((module) => ({ default: module.ComicForm })));

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  withOutDeletedUtc: true,
};

interface IProps {
  access: boolean;
}

export const Comics = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState<ComicFilterEntity>(initialValues);
  const isLoading = useSelector(comicLoadingSelector);
  const count = useSelector(comicCountSelector);
  const bidToExitList = useSelector(comicListSelector);
  const needsListUpdate = pathname.endsWith(routePaths.kidsJournals);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: ComicEntity["Id"]) => {
    Modal.confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteComic(id))
          .unwrap()
          .then(() => dispatch(getComicsByFilter(filters)))
          .catch(() => dispatch(noticeActions.add({ message: "Ошибка удаления.", type: "error" }))),
    });
  };

  const columns = useMemo(() => getComicsColumns({ access, onDelete: handleDelete }), [access]);

  useEffect(() => {
    dispatch(getComicsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("kids.journalsTitle")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("kids.addJournal")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ComicsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={bidToExitList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<ComicEntity, ComicFilterEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 768 }}
          />
        </Card>
      </Content>

      <Routes>{access && <Route path={routePaths.form.edit()} element={<ComicsForm />} />}</Routes>
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
