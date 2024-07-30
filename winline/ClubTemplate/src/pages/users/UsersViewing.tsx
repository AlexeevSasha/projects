import { useCallback, useEffect, useState, useMemo } from "react";
import { Card, message, Table, Select } from "antd";
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
import { FiltersHeaderWithSelect } from "../../ui/customFilters/FiltersHeaderWithSelect";
import { ExportFileButton } from "../../ui/ExportFileButton";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { getCitiesThunk } from "../../modules/commons/commonsActionAsync";
import { validationSize } from "../../common/helpers/commonValidators/validationSize";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

const { Option } = Select;

export const UsersViewing = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<IFiltersUser>({
    pagination: 1,
    cityId: undefined,
    name: "",
    sorting: ""
  });
  const [userDescription, setUserDescription] = useState<IUser | undefined>();
  const allUsers = useSelector(getUserEntities);
  const { count, isLoading } = useSelector((state: StateType) => state.users);
  const { cities } = useSelector((state: StateType) => state.commons);
  const exportFileHandler = (fileExtension: string) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_MOBILE}/odata/User?exportType=${fileExtension}`,
        fileName: "users"
      })
    ).then(() => message.success(t("successExport")));
  };
  useEffect(() => {
    dispatch(getCitiesThunk());
  }, []);

  useEffect(() => {
    if (validationSize(filterValues.name, 256)) {
      message.error(t("validations.filtersSizeError"));
    } else {
      dispatch(getAllUsers(filterValues));
    }
  }, [filterValues.name, filterValues.pagination, filterValues.cityId, filterValues.sorting]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({
      ...prev,
      name: "",
      cityId: undefined,
      pagination: 1
    }));
  }, [setFilterValues]);

  const columns = generateColumnsUserViewing(access, {
    setUserDescription,
    translation: t,
    cities
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
            <FiltersHeaderWithSelect
              inputPlaceholder={t("common.filters.placeholders.title")}
              inputName="name"
              selectName="cityId"
              selectPlaceholder={t("users.filters.placeholders.cities")}
              selectValue={filterValues.cityId}
              selectOptions={useMemo(
                () =>
                  cities.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.nameRu}
                    </Option>
                  )),
                [cities]
              )}
              selectShowSearch={true}
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
          <UsersViewingDescription cities={cities} userDescription={userDescription} onClose={() => setUserDescription(undefined)} />
        </Card>
      </ContentStyled>
    </>
  );
};
