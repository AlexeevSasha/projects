import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { theme } from "../../assets/theme/theme";
import { specialOfferColumns } from "./specialOfferColumns";
import { SpecialOfferFilters } from "./SpecialOfferFilters";
import {
  specialOffersCountSelector,
  specialOffersLoadingSelector,
  specialOffersSelector,
} from "../../store/specialOffer/specialOfferSelectors";
import { deleteSpecialOffer, getSpecialOffersByFilter } from "../../store/specialOffer/specialOfferActionAsync";
import {
  SpecialOffer,
  SpecialOfferFilter,
  SpecialOfferFilterEntity,
  SpecialOfferRequest,
} from "../../common/interfaces/specialOffer";
import { NoDataTable } from "../../ui/NoDataTable";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  withOutDeletedUtc: true,
  sorting: "Status desc",
};

interface IProps {
  access: boolean;
}

export const SpecialOfferTable = ({ access }: IProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<SpecialOfferFilter>(initialValues);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(specialOffersLoadingSelector);
  const count = useSelector(specialOffersCountSelector);
  const specialOffersList = useSelector(specialOffersSelector);
  const needsListUpdate = pathname.endsWith(routePaths.specialOffer);
  const handleDelete = (id: SpecialOffer["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("loyalty.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteSpecialOffer(id))
          .unwrap()
          .then(() => {
            dispatch(getSpecialOffersByFilter(filters));
            dispatch(noticeActions.add({ message: t("loyalty.deleteSuccess") }));
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: t("loyalty.deleteFail"),
                type: "error",
              })
            )
          ),
    });
  };

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const columns = useMemo(
    () =>
      specialOfferColumns({
        access,
        handleDelete,
      }),
    [access, filters]
  );

  useEffect(() => {
    dispatch(getSpecialOffersByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("specialOffer.promotionsTitle")}</CardTitle>

        {access && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("specialOffer.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <SpecialOfferFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={specialOffersList}
            //@ts-ignore
            rowKey={(offer) => offer?.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<SpecialOfferRequest, SpecialOfferFilterEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1142 }}
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
