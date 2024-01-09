import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { BannerEntity, BannersFiltersType } from "common/interfaces/banners";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteBanner, getBannersByFilter, hideBanner } from "store/banners/bannersActionAsync";
import { bannersCountSelector, bannersListSelector, bannersLoadingSelector } from "store/banners/bannersSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getBannersColumns } from "./bannersColumns";
import { BannersFilters } from "./BannersFilters";

const BannersForm = lazy(async () => import("./BannersForm").then((module) => ({ default: module.BannersForm })));

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  Name: "",
  Status: "",
  sorting: "StartPublish",
};

export const Banners = ({ access }: { access?: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BannersFiltersType>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(bannersLoadingSelector);
  const count = useSelector(bannersCountSelector);
  const adv = useSelector(bannersListSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.advertising);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: BannerEntity["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("adv.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteBanner(id))
          .unwrap()
          .then(() => {
            dispatch(getBannersByFilter(filters));
            dispatch(noticeActions.add({ message: t("adv.successDeleteAlert") }));
          })
          .catch(() => dispatch(noticeActions.add({ message: t("adv.notDeleteAlert"), type: "error" }))),
    });
  };

  const onView = (Id: BannerEntity["Id"], IsHidden: BannerEntity["IsHidden"]) => {
    confirm({
      title: <HeaderText>{IsHidden ? t("allPages.hideConfirmTitle") : t("allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: IsHidden ? t("adv.hideConfirm") : t("adv.showConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(hideBanner({ Id, IsHidden }))
          .unwrap()
          .then(() => {
            dispatch(getBannersByFilter(filters));
            dispatch(noticeActions.add({ message: IsHidden ? t("adv.successHide") : t("adv.successShow") }));
          })
          .catch(() => dispatch(noticeActions.add({ message: t("adv.notDeleteAlert"), type: "error" }))),
    });
  };

  const columns = useMemo(() => getBannersColumns({ onDelete: handleDelete, access, onView }), []);

  useEffect(() => {
    needsListUpdate && dispatch(getBannersByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("adv.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("adv.addBanner")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <BannersFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={adv}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<BannerEntity, BannersFiltersType>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination)}
            scroll={{ x: 1320 }}
          />
        </Card>
      </Content>

      <Routes>
        <Route key="1" path={routePaths.form.create} element={<BannersForm />} />
        <Route key="2" path={routePaths.form.edit()} element={<BannersForm />} />
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
