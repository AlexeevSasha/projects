import { Card, Layout, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { useActions } from "common/helpers/useActions";
import debounce from "lodash/debounce";
import { getUserViewColumns } from "pages/usersView/usersViewColumns";
import { UsersViewFilters } from "pages/usersView/UsersViewFilters";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StateType } from "store";
import { getAllUsers } from "store/users/usersActionAsync";
import { usersSelector } from "store/users/usersSelector";
import styled from "styled-components";
import { ExportFileButton } from "ui/ExportFileButton";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import type { UserFilters, User } from "../../common/interfaces/user";
import { UsersViewTableDesc } from "./UsersViewTableDesc";

const { Header, Content } = Layout;
const { Title } = Typography;

const actionsCreator = {
  getAllUsers,
};

const initialValues = {
  pagination: 1,
  FullName: "",
  date: "",
  sorting: "",
  pageSize: 10,
};

export const UsersView = ({ access }: { access?: boolean }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<UserFilters>(initialValues);
  const [userDescription, setUserDescription] = useState<User | undefined>();
  const token = useSelector((state: StateType) => state.auth.authInfo.access_token);
  const allUsers = useSelector(usersSelector);
  const allUsersCount = useSelector((state: StateType) => state.usersView.count);
  const isLoading = useSelector((state: StateType) => state.usersView.isLoading);
  const { getAllUsers: loadAllUsers } = useActions(actionsCreator);

  const exportFileHandler = (fileExtension: string) => {
    console.log(fileExtension);
  };

  useEffect(() => {
    if (token) {
      loadAllUsers({ token, filters: filters });
    }
  }, [filters]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilters((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    setFilters({
      FullName: "",
      date: "",
      pagination: 1,
      sorting: "",
    });
  }, [setFilters]);

  const columns = useMemo(
    () => getUserViewColumns({ setUserDescription, translation: t }, access),
    [setUserDescription]
  );

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderContent>
        <CardTitle level={4}>{t("usersView.table.title")}</CardTitle>
        <ExportFileButton exportFileHandler={exportFileHandler} />
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <UsersViewFilters onChange={changeFilters} resetFilters={resetFilters} />

          <Table
            columns={columns}
            dataSource={allUsers}
            rowKey={(entity: User) => entity.id}
            locale={{
              emptyText: <NoDataTable />,
            }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<User, UserFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(allUsersCount, filters.pagination, filters.pageSize)}
          />
          <UsersViewTableDesc userDescription={userDescription} onClose={() => setUserDescription(undefined)} t={t} />
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
