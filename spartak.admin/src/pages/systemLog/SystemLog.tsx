import { Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { LogFilters, LogType } from "common/interfaces/systemLog";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "store";
import { getLogsByFilter } from "store/systemLog/systemLogActionAsync";
import { systemLogCountSelector, systemLogListSelector } from "store/systemLog/systemLogSelectors";
import styled from "styled-components";
import { NoDataTable } from "ui/NoDataTable";
import { EmployeeVeiw } from "./EmployeeVeiw";
import { getsystemLogColumns } from "./systemLogColumns";
import { SystemLogFilters } from "./SystemLogFilters";
import { SystemLogView } from "./SystemLogView";

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  sorting: "",
};

export const SystemLog = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<LogFilters>(initialValues);
  const [log, setLog] = useState<LogType | undefined>();
  const [employee, setEmployee] = useState<LogType | undefined>();
  const dispatch = useAppDispatch();
  const count = useSelector(systemLogCountSelector);
  const systemLog = useSelector(systemLogListSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.systemLog);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(() => getsystemLogColumns({ onPreview: setLog, onEmployeeVeiw: setEmployee }), []);

  useEffect(() => {
    needsListUpdate && dispatch(getLogsByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      <HeaderContent>
        <CardTitle level={4}>{t("sideBar.systemLog.main")}</CardTitle>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <SystemLogFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />
          <Table
            columns={columns}
            dataSource={systemLog}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<LogType, LogFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination)}
            sticky
          />
        </Card>
      </Content>
      <SystemLogView log={log} onClose={() => setLog(undefined)} />
      <EmployeeVeiw log={employee} onClose={() => setEmployee(undefined)} />
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
