import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Tabs, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { NoticeEntity, NoticeFilters } from "common/interfaces/notifications";
import { lazy, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { deleteNotification, getNotificationsByFilter } from "store/notifications/notificationsActionAsync";
import {
  noticeCountSelector,
  noticeListSelector,
  noticeLoadingSelector,
} from "store/notifications/notificationsSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { NoDataTable } from "ui/NoDataTable";
import { NoticePreview } from "./NoticePreview";
import { getNotificationsColumns } from "./notificationsColumns";

const NotificationsForm = lazy(async () =>
  import("./NotificationsForm").then((module) => ({
    default: module.NotificationsForm,
  }))
);

const initialValues = {
  pagination: 1,
  sorting: "SendTime desc",
};

export const Notifications = ({ access }: { access?: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tab = useMemo(() => (pathname.includes("await") ? "await" : "history"), [pathname]);
  const [filters, setFilters] = useState<NoticeFilters>({ ...initialValues, IsAwaiting: tab });
  const [notice, setNotice] = useState<NoticeEntity | undefined>();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(noticeLoadingSelector);
  const count = useSelector(noticeCountSelector);
  const noticeList = useSelector(noticeListSelector);
  const needsListUpdate =
    pathname.endsWith(routePaths.notifications("await")) || pathname.endsWith(routePaths.notifications("history"));

  const handleDelete = (id: NoticeEntity["Id"]) => {
    Modal.confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("notifications.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteNotification(id))
          .unwrap()
          .then(() => {
            dispatch(getNotificationsByFilter(filters));
            dispatch(noticeActions.add({ message: t("notifications.successDelete") }));
          }),
    });
  };

  const columns = useMemo(
    () => getNotificationsColumns({ onDelete: handleDelete, onPreview: setNotice, access, tab }),
    [tab]
  );

  const handleTabClick = (key: string) => {
    navigate(`/${routePaths.notifications(key)}`);
    setFilters({ ...filters, IsAwaiting: key, pagination: 1 });
  };

  useEffect(() => {
    needsListUpdate && dispatch(getNotificationsByFilter({ ...filters }));
  }, [filters, needsListUpdate, tab]);

  return (
    <>
      <HeaderContent>
        <CardTitle level={4}>{t("notifications.title")}</CardTitle>

        <HeaderRow>
          <Tabs defaultActiveKey={tab} onChange={handleTabClick}>
            <Tabs.TabPane tab={t("notifications.await")} key="await" />
            <Tabs.TabPane tab={t("notifications.history")} key="history" />
          </Tabs>

          {access && (
            <Link to={`Push/${routePaths.form.create}`}>
              <Button type="primary" icon={<PlusOutlined />}>
                {t("notifications.createNotice")}
              </Button>
            </Link>
          )}
        </HeaderRow>
      </HeaderContent>

      <Layout.Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <Table
            columns={columns}
            dataSource={noticeList}
            rowKey={(entity: any) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<NoticeEntity, NoticeFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination)}
            sticky
            scroll={{ x: 1260 }}
            loading={isLoading}
          />
        </Card>
      </Layout.Content>

      <NoticePreview notice={notice} onClose={() => setNotice(undefined)} />

      <Routes>
        <Route path={`:type/${routePaths.form.create}`} element={<NotificationsForm />} />
        <Route path={`:type/${routePaths.form.edit()}`} element={<NotificationsForm />} />
      </Routes>
    </>
  );
};

const CardTitle = styled(Typography.Title)`
  margin: 12px 0 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

const HeaderContent = styled(Layout.Header)`
  padding: 0 24px;
  background-color: ${theme.colors.white};
  height: max-content;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  & > button {
    margin-bottom: 12px;
  }

  & > div:first-child .ant-tabs-nav {
    margin-bottom: 0;
  }
`;
