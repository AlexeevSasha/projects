import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { loyaltyRepository } from "api/loyaltyRepository";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { LoyaltyEntity, LoyaltyFilterEntity } from "common/interfaces/loyalty";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { getLoyaltyByFilter, removeLoyalty, setOutOfStockLoyalty } from "store/loyalty/loyaltyActionAsync";
import { loyaltyCountSelector, loyaltyListSelector, loyaltyLoadingSelector } from "store/loyalty/loyaltySelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { theme } from "../../assets/theme/theme";
import { getLoyaltyColumns } from "./loyaltyColumns";
import { LoyaltyFilters } from "./LoyaltyFilters";
import { LoyaltyPreview } from "./LoyaltyPreview";

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  withOutDeletedUtc: true,
  sorting: "startDate desc",
};

interface IProps {
  access: boolean;
}

export const LoyaltyTable = ({ access }: IProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<LoyaltyFilterEntity>(initialValues);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(loyaltyLoadingSelector);
  const count = useSelector(loyaltyCountSelector);
  const loyaltyList = useSelector(loyaltyListSelector);
  const needsListUpdate = pathname.endsWith(routePaths.loyalty);
  const [promo, setPromo] = useState<LoyaltyEntity | undefined>();

  const openPreview = (value: LoyaltyEntity) => setPromo(value);

  const handleDelete = (id: LoyaltyEntity["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("loyalty.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(removeLoyalty(id))
          .unwrap()
          .then(() => {
            dispatch(getLoyaltyByFilter(filters));
            dispatch(noticeActions.add({ message: t("loyalty.deleteSuccess") }));
          })
          .catch(() => dispatch(noticeActions.add({ message: t("loyalty.deleteFail"), type: "error" }))),
    });
  };

  const download = async (item: LoyaltyEntity) => {
    const a = document.createElement("a");
    const response = await loyaltyRepository.fetchExportReport(item.Id);
    a.href = URL.createObjectURL(response);
    a.download = `${item.Id}_${item.StartDate}.xlsx`;
    a.click();
  };

  const setOutOfStock = (id: LoyaltyEntity["Id"]) => {
    confirm({
      title: <HeaderText>{t("loyalty.outOfStockConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("loyalty.outOfStockConfirmDesc"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(setOutOfStockLoyalty(id))
          .unwrap()
          .then(() => {
            dispatch(getLoyaltyByFilter(filters));
            dispatch(noticeActions.add({ message: t("loyalty.outOfStockSuccess") }));
          })
          .catch(() => dispatch(noticeActions.add({ message: t("loyalty.outOfStockFail"), type: "error" }))),
    });
  };

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(
    () => getLoyaltyColumns({ access, openPreview, handleDelete, download, setOutOfStock }),
    [access, filters]
  );

  useEffect(() => {
    dispatch(getLoyaltyByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("loyalty.title")}</CardTitle>

        {access && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("allPages.buttonsText.create")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <LoyaltyFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={loyaltyList}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<LoyaltyEntity, LoyaltyFilterEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1142 }}
          />
        </Card>
      </Content>

      <LoyaltyPreview promo={promo} onClose={() => setPromo(undefined)} />
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
