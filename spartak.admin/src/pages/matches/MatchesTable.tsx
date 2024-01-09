import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { MatchFilters, MatchListItem } from "common/interfaces/matches";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { clubsStaffLoadingSelector } from "store/clubsStaff/clubsStaffSelectors";
import { deleteMatch, getMatchListByFilter } from "store/match/matchActionAsync";
import { matchCountSelector, matchItemsSelector } from "store/match/matchsSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getMatchesColumns } from "./matchesColumns";
import { MatchesFilters } from "./MatchesFilters";

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  sorting: "",
  pageSize: 10,
  MatchType: "Custom",
  MatchDate: undefined,
};

export const MatchesTable = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<MatchFilters>(initialValues);
  const dispatch = useAppDispatch();
  const count = useSelector(matchCountSelector);
  const isLoading = useSelector(clubsStaffLoadingSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.matches());
  const matchList = useSelector(matchItemsSelector);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: MatchListItem["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("matches.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () =>
        dispatch(deleteMatch(id))
          .unwrap()
          .then(() => dispatch(getMatchListByFilter(filters))),
    });
  };

  const columns = useMemo(() => getMatchesColumns({ onDelete: handleDelete, access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getMatchListByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("matches.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create + "/match")}>
            {t("allPages.buttonsText.create")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <MatchesFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={matchList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<MatchListItem, MatchFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>
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
