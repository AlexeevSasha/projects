import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { CalendarEntity, CalendarFiltersType } from "common/interfaces/calendar";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteCalendar, getCalendarByFilter } from "store/calendar/calendarActionAsync";
import { calendarCountSelector, calendarListSelector, calendarLoadingSelector } from "store/calendar/calendarSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getCalendarColumns } from "./calendarColumns";
import { CalendarFilters } from "./CalendarFilters";
import { Redirect } from "../../ui/Redirect";
import { noticeActions } from "../../store/notice/notice";

const CalendarForm = lazy(async () =>
  import("./CalendarForm").then((module) => ({
    default: module.CalendarForm,
  }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
};

interface IProps {
  access: boolean;
}

export const Calendar = ({ access }: IProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CalendarFiltersType>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(calendarLoadingSelector);
  const count = useSelector(calendarCountSelector);
  const calendar = useSelector(calendarListSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.calendar);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: CalendarEntity["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("calendar.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteCalendar(id))
          .unwrap()
          .then(() => {
            dispatch(getCalendarByFilter(filters));
            dispatch(
              noticeActions.add({
                message: t(`calendar.deleteSuccess`),
                closable: true,
              })
            );
          }),
    });
  };

  const columns = useMemo(() => getCalendarColumns({ onDelete: handleDelete, access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getCalendarByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("calendar.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("calendar.addEvent")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <CalendarFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={calendar}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<CalendarEntity, CalendarFiltersType>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1320 }}
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<CalendarForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<CalendarForm onDelete={handleDelete} />} />,
        ]}
        {pathname !== `/${routePaths.calendar}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.calendar}`} />} />
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
