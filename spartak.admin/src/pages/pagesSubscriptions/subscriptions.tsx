import { Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { SubscriptionEntity, SubscriptionsFilterTypes } from "common/interfaces/subscriptions";
import i18n from "i18next";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NoDataTable } from "ui/NoDataTable";
import { FilterChangeValue } from "../../common/interfaces/common";
import { useAppDispatch } from "../../store";
import { getSubscriptionsData, hideSubscription } from "../../store/subscriptions/subscriptionsActionAsync";
import { subscriptionCountSelector, subscriptionDataSelector } from "../../store/subscriptions/subscriptionsSelectors";
import { Loader } from "../../ui/Loader";
import { Redirect } from "../../ui/Redirect";
import { getPagesSubscriptionsColumns, ISubscriptionsColumns } from "./subscriptionsColumns";
import { SubscriptionsFilters } from "./subsriptionsFilters";
import confirm from "antd/lib/modal/confirm";
import { HeaderText } from "ui/HeaderText";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { noticeActions } from "store/notice/notice";

const SubscriptionsForm = lazy(async () =>
  import("./subscriptionsForm").then((module) => ({
    default: module.SubscriptionsForm,
  }))
);

const { Header, Content } = Layout;
const { Title } = Typography;

export const initialValues = {
  pagination: 1,
  pageSize: 10,
  FullName: "",
  sorting: "EventId desc",
};

export const Subscriptions = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const locale = i18n.language === "ru" ? "Ru" : "En";

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<SubscriptionsFilterTypes>(initialValues);
  const changeFilters = useCallback(
    debounce(
      (value: FilterChangeValue) =>
        setFilters((prev: SubscriptionsFilterTypes) => ({
          ...prev,
          ...value,
          pagination: 1,
        })),
      400
    ),
    [setFilters]
  );

  const showHiddenSubscriptions = (id: string, isHidden: boolean) => {
    console.log("showHiddenSubscriptions filters", filters);
    confirm({
      title: <HeaderText>{isHidden ? t("allPages.hideConfirmTitle") : t("allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: isHidden ? t("subscriptions.hideConfirm") : t("subscriptions.showConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(hideSubscription({ id, isHidden }))
          .unwrap()
          .then(() => {
            dispatch(getSubscriptionsData(filters));
            dispatch(
              noticeActions.add({ message: isHidden ? t("subscriptions.successHide") : t("subscriptions.successShow") })
            );
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: isHidden ? t("subscriptions.errorHide") : t("subscriptions.errorShow"),
                type: "error",
              })
            )
          ),
    });
  };

  const columns = useMemo(
    () => getPagesSubscriptionsColumns(access, locale, showHiddenSubscriptions),
    [access, filters]
  );

  const subscriptions = useSelector(subscriptionDataSelector);
  const columnsData = subscriptions?.map((subscription: SubscriptionEntity) => {
    return {
      FullName: subscription.FullName,
      Id: subscription.Id,
      Date: formatInMoscowDate(subscription.Date, { withTime: true }),
      IsHidden: subscription.IsHidden,
    };
  });

  const [loading, setLoading] = useState(true);
  const pagesCount = useSelector(subscriptionCountSelector);

  useEffect(() => {
    dispatch(getSubscriptionsData(filters));
    setTimeout(() => setLoading(false), 3000);
  }, [filters]);

  console.log("filters", filters);

  return !subscriptions || loading ? (
    <Loader />
  ) : (
    <>
      <HeaderContent>
        <CardTitle level={4}>{t("sideBar.pages.subscriptions")}</CardTitle>
      </HeaderContent>

      <StyledContent>
        <StyledCard>
          <SubscriptionsFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />
          <Table
            locale={{
              emptyText: <NoDataTable />,
            }}
            rowKey={(entity) => entity.Id}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<ISubscriptionsColumns, SubscriptionsFilterTypes>(
                pagination,
                sorter,
                filters,
                setFilters
              )
            }
            pagination={onChangePaginationTable(pagesCount, filters.pagination, filters.pageSize)}
            columns={columns}
            dataSource={columnsData}
            sticky
          />
        </StyledCard>
      </StyledContent>

      <Routes>
        <Route path="/">
          {access && <Route path={routePaths.form.edit()} element={<SubscriptionsForm />} />}
          {pathname !== `/${routePaths.pagesSubscriptions}` && (
            <Route path="*" element={<Redirect path={`/${routePaths.pagesSubscriptions}`} />} />
          )}
        </Route>
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

const StyledContent = styled(Content)`
  padding: 24px;
  margin: 0;
`;
const StyledCard = styled(Card)`
  thead > tr > th {
    font-weight: 600;
  }
`;
