import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Layout, Menu, Modal, Space, Table, Typography } from "antd";
import { bestPlayerRepository } from "api/bestPlayerRepository";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { BestPlayerEntity, BestPlayerFiltersType } from "common/interfaces/bestPlayer";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteBestPlayer, getBestPlayerList } from "store/bestPlayer/bestPlayerActionAsync";
import {
  bestPlayerCountSelector,
  bestPlayerListSelector,
  bestPlayerLoadingSelector,
} from "store/bestPlayer/bestPlayerSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { getBestPlayerColumns } from "./bestPlayerColumns";
import { BestPlayerFilters } from "./BestPlayerFilters";
import { ResultForm } from "./ResultForm";

const BestPlayerForm = lazy(async () =>
  import("./BestPlayerForm").then((module) => ({
    default: module.BestPlayerForm,
  }))
);

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  sorting: "StartVoting desc",
  withOutDeletedUtc: true,
};

interface IProps {
  access: boolean;
}

export const BestPlayer = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BestPlayerFiltersType>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(bestPlayerLoadingSelector);
  const count = useSelector(bestPlayerCountSelector);
  const promoList = useSelector(bestPlayerListSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.bestPlayer);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDownload = async (id: BestPlayerEntity["Id"]) => {
    const a = document.createElement("a");
    const file = await bestPlayerRepository.fetchResultXLS(id);
    a.href = URL.createObjectURL(file);
    a.download = "voting_result";
    a.click();
  };

  const handleDelete = (id: BestPlayerEntity["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("bestPlayer.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteBestPlayer(id))
          .unwrap()
          .then(() => {
            dispatch(getBestPlayerList(filters));
            dispatch(noticeActions.add({ message: t("bestPlayer.deleteSuccess") }));
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: t("bestPlayer.deleteFail"),
                type: "error",
              })
            )
          ),
    });
  };

  const columns = useMemo(
    () =>
      getBestPlayerColumns({
        onDelete: handleDelete,
        onDownload: handleDownload,
        access,
      }),
    [access, filters]
  );

  useEffect(() => {
    needsListUpdate && dispatch(getBestPlayerList(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("bestPlayer.title")}</CardTitle>

        {access && (
          <BtnGroup>
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => dispatch(getBestPlayerList(filters))}>
              {t("allPages.buttonsText.refresh")}
            </Button>

            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={1} onClick={() => navigate(`${routePaths.form.create}/match`)}>
                    {t("bestPlayer.matchPlayer")}
                  </Menu.Item>

                  <Menu.Item key={2} onClick={() => navigate(`${routePaths.form.create}/month`)}>
                    {t("bestPlayer.monthPlayer")}
                  </Menu.Item>

                  <Menu.Item key={3} onClick={() => navigate(`${routePaths.form.create}/season`)}>
                    {t("bestPlayer.seasonPlayer")}
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="primary">
                <Space>
                  {t("allPages.buttonsText.create")}

                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </BtnGroup>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <BestPlayerFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={promoList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<BestPlayerEntity, BestPlayerFiltersType>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            scroll={{ x: 1320 }}
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={`${routePaths.form.create}/*`} element={<BestPlayerForm />} />,
          <Route key="2" path={`edit/${routePaths.form.edit()}`} element={<BestPlayerForm />} />,
          <Route key="3" path={`result/${routePaths.form.edit()}`} element={<ResultForm />} />,
        ]}
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

const BtnGroup = styled.div`
  & > *:first-child {
    margin-right: 6px;
  }
`;
