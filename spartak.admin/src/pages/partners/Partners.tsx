import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { getPartnersSection } from "common/constants/partners";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Partner, PartnerFilters } from "common/interfaces/partners";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { rightsSelector } from "store/auth/authSelectors";
import { noticeActions } from "store/notice/notice";
import { deletePartner, getPartners } from "store/partners/partnersActionAsync";
import { partnersCountSelector, partnersLoadingSelector, partnersSelector } from "store/partners/partnersSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { Redirect } from "../../ui/Redirect";
import { getPartnersColumns } from "./partnersColumns";
import { PartnersFilters } from "./PartnersFilters";

const PartnersForm = lazy(async () =>
  import("./PartnersForm").then((module) => ({
    default: module.PartnersForm,
  }))
);

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  FullName: "",
  sorting: "",
};

interface IProps {
  access: boolean;
}

export const Partners = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState<PartnerFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(partnersLoadingSelector);
  const count = useSelector(partnersCountSelector);
  const partners = useSelector(partnersSelector);
  const rights = useSelector(rightsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.partners);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Partner["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("partners.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deletePartner(id))
          .unwrap()
          .then(() => {
            dispatch(getPartners({ ...filters, Section: getPartnersSection(rights) }));
            dispatch(
              noticeActions.add({
                message: "Партнер успешно удален.",
                closable: true,
              })
            );
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: "Ошибка удаления.",
                closable: true,
                type: "error",
              })
            )
          ),
    });
  };

  const columns = useMemo(() => getPartnersColumns({ onDelete: handleDelete, access }), [access]);

  useEffect(() => {
    needsListUpdate && dispatch(getPartners({ ...filters, Section: getPartnersSection(rights) }));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("partners.table.title")}</CardTitle>

        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("partners.addPartner")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <PartnersFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={partners}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Partner, PartnerFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<PartnersForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<PartnersForm />} />,
        ]}
        {pathname !== `/${routePaths.partners}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.partners}`} />} />
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
