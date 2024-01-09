import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { ClubsMedicalFilters } from "./clubsMedicalFilters";
import { getClubsMedicalColumns } from "./clubsMedicalColumns";
import { Redirect } from "../../ui/Redirect";
import { deleteClubsMedical, getClubsMedicalByFilter } from "store/clubsMedical/clubsMedicalActionAsync";
import {
  clubsMedicalCountSelector,
  clubsMedicalLoadingSelector,
  clubsMedicalSelector,
} from "store/clubsMedical/clubsMedicalSelectors";
import { Staff, StaffFilters } from "../../common/interfaces/staff";

const ClubsMedicalForm = lazy(async () =>
  import(/* ClubsMedicalForm */ "./clubsMedicalForm").then((module) => ({
    default: module.ClubsMedicalForm,
  }))
);

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pageSize: 10,
  pagination: 1,
  sorting: "SortOrder asc",
  FullName: "",
  Status: "",
};

interface IProps {
  access: boolean;
}

export const ClubsMedical = ({ access }: IProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<StaffFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(clubsMedicalLoadingSelector);
  const count = useSelector(clubsMedicalCountSelector);
  const medical = useSelector(clubsMedicalSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.clubsMedical);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Staff["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("clubsStaff.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        dispatch(deleteClubsMedical(id))
          .unwrap()
          .then(() => dispatch(getClubsMedicalByFilter(filters))),
    });
  };

  const columns = useMemo(() => getClubsMedicalColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getClubsMedicalByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("clubsMedical.title")}</CardTitle>
        {access && (
          <Button type={"primary"} icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
            {t("clubsStaff.addEmployee")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <ClubsMedicalFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={medical}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Staff, StaffFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        {access && [
          <Route key="1" path={routePaths.form.create} element={<ClubsMedicalForm />} />,
          <Route key="2" path={routePaths.form.edit()} element={<ClubsMedicalForm />} />,
        ]}
        {pathname !== `/${routePaths.clubsMedical}` && (
          <Route path="*" element={<Redirect path={`/${routePaths.clubsMedical}`} />} />
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
