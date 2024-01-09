import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Loader } from "../../ui/Loader";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { routePaths } from "../../common/constants/routePaths";
import { NoDataTable } from "../../ui/NoDataTable";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store";
import { Category, CategoryFilters } from "../../common/interfaces/mediaCategory";
import { useSelector } from "react-redux";
import {
  mediaCategoriesCountSelector,
  mediaCategoriesLoadingSelector,
  mediaCategoriesSelector,
} from "../../store/mediaCategories/mediaCategorySelectors";
import debounce from "lodash/debounce";
import { getMediaCategoriesColumns } from "./mediaCategoriesColumns";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { MediaCategoriesFilters } from "./MediaCategoriesFilters";
import { deleteCategory, getCategoriesByFilters } from "../../store/mediaCategories/mediaCategoryActionAsync";
import { HeaderText } from "../../ui/HeaderText";
import { Redirect } from "../../ui/Redirect";

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

const initialValues = {
  pagination: 1,
  CategoryName: "",
  sorting: "",
  pageSize: 10,
};

const MediaCategoriesForm = lazy(async () =>
  import(/* ClubsTrainersForm */ "./MediaCategoriesForm").then((module) => ({
    default: module.MediaCategoriesForm,
  }))
);

interface IProps {
  access: boolean;
}

export const MediaCategories = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState<CategoryFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(mediaCategoriesLoadingSelector);
  const count = useSelector(mediaCategoriesCountSelector);
  const categories = useSelector(mediaCategoriesSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.mediaCategories);

  const handleDelete = (id: Category["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("mediaCategories.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteCategory(id)).then(() => {
          dispatch(getCategoriesByFilters(filters));
        }),
    });
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilters((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilters]
  );

  const columns = useMemo(() => getMediaCategoriesColumns({ onDelete: handleDelete, access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getCategoriesByFilters(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("mediaCategories.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("mediaCategories.addCategory")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <MediaCategoriesFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={categories}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            scroll={{ x: 1320 }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Category, CategoryFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>
      <Routes>
        {access && [
          <Route key={1} path={routePaths.form.create} element={<MediaCategoriesForm />} />,
          <Route key={2} path={routePaths.form.edit()} element={<MediaCategoriesForm />} />,
        ]}
        {pathname !== `/${routePaths.mediaCategories}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.mediaCategories}`} />} />
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
