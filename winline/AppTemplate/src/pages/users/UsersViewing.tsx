import { useCallback, useEffect, useState } from "react";
import { Card, message, Table } from "antd";
import { UsersViewingDescription } from "./UsersViewingDescription";
import { generateColumnsUserViewing } from "../../ui/tableColumnsGenerator/users/userViewing/generateColumnsUserViewing";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../modules/users/usersActionAsync";
import { getUserEntities } from "../../modules/users/usersSelector";
import { Loader } from "../../ui/Loader";
import type { IFiltersUser, IUser } from "../../api/dto/users/IUser";
import { SorterResult } from "antd/es/table/interface";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import debounce from "lodash/debounce";
import { exportFile, loadFileVariable } from "../../modules/exportFiles/exportFiles";
import { FiltersHeaderInputDate } from "../../ui/customFilters/FiltersHeaderInputDate";
import { ExportFileButton } from "../../ui/ExportFileButton";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { validationSize } from "../../common/helpers/commonValidators/validationSize";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

export const UsersViewing = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<IFiltersUser>({
    pagination: 1,
    name: "",
    date: null,
    sorting: ""
  });
  const [userDescription, setUserDescription] = useState<IUser | undefined>();
  const allUsers = useSelector(getUserEntities);
  const { count, isLoading } = useSelector((state: StateType) => state.users);
  const exportFileHandler = (fileExtension: string) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_PROFILE}/odata/UserList?exportType=${fileExtension}`,
        fileName: "users"
      })
    );
  };

  useEffect(() => {
    if (validationSize(filterValues.name, 256)) {
      message.error(t("validations.filtersSizeError"));
    } else {
      dispatch(getAllUsers(filterValues));
    }
  }, [filterValues.date, filterValues.name, filterValues.pagination, filterValues.sorting]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...prev, name: "", date: null, pagination: 1 }));
  }, [setFilterValues]);

  const columns = generateColumnsUserViewing(access, {
    setUserDescription,
    translation: t
  });

  return (
    <>
      {isLoading || loadFileVariable ? <Loader /> : ""}
      <HeaderStyled>
        <TitleStyled level={4}>{t("users.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock>
            <FiltersHeaderInputDate
              inputPlaceholder={t("common.filters.placeholders.title") + " " + t("common.user")}
              inputName="name"
              dateName="date"
              dateValue={filterValues.date}
              isDisabledResetFilters={isLoading}
              onChange={changeFilters}
              resetFilters={resetFilters}
            />
            <ExportFileButton exportFileHandler={exportFileHandler} />
          </FiltersButtonBlock>
          <Table
            columns={columns}
            dataSource={allUsers}
            rowKey={(entity: IUser) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<IUser> | SorterResult<IUser>[]) =>
              onChangeDataTable<IUser, IFiltersUser>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            scroll={{ x: 1320 }}
            sticky
          />
          <UsersViewingDescription userDescription={userDescription} onClose={() => setUserDescription(undefined)} />
        </Card>
      </ContentStyled>
    </>
  );
};
