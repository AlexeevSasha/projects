import { useCallback, useEffect, useState, useMemo } from "react";
import { Card, message, Table, Select, Modal } from "antd";
import { UsersViewingDescription } from "./UsersViewingDescription";
import { generateColumnsUserViewing } from "../../ui/tableColumnsGenerator/users/userViewing/generateColumnsUserViewing";
import { useSelector } from "react-redux";
import { deleteOfConsentWinLine, getAllUsers } from "../../modules/users/usersActionAsync";
import { getUserEntities } from "../../modules/users/usersSelector";
import { Loader } from "../../ui/Loader";
import type { IFiltersUser, IUser } from "../../api/dto/users/IUser";
import { SorterResult } from "antd/es/table/interface";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import debounce from "lodash/debounce";
import { exportFile, loadFileVariable } from "../../modules/exportFiles/exportFiles";
import { FiltersInputTwoSelects } from "../../ui/customFilters/FiltersInputTwoSelects";
import { ExportFileButton } from "../../ui/ExportFileButton";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { validationSize } from "../../common/helpers/commonValidators/validationSize";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { getClubsThunk, getCitiesThunk } from "../../modules/commons/commonsActionAsync";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";

const { Option } = Select;

export const UsersViewing = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { cities, clubs } = useSelector((state: StateType) => state.commons);
  const [filterValues, setFilterValues] = useState<IFiltersUser>({
    pagination: 1,
    name: "",
    cityId: undefined,
    clubId: undefined,
    sorting: ""
  });
  const [userDescription, setUserDescription] = useState<IUser | undefined>();
  const allUsers = useSelector(getUserEntities);
  const { count, isLoading } = useSelector((state: StateType) => state.users);
  const exportFileHandler = (fileExtension: string) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_CLUB}/odata/User?exportType=${fileExtension}`,
        fileName: "users"
      })
    ).then(() => message.success(t("successExport")));
  };
  useEffect(() => {
    dispatch(getClubsThunk());
    dispatch(getCitiesThunk());
  }, []);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    if (validationSize(filterValues.name, 256)) {
      message.error(t("validations.filtersSizeError"));
    } else {
      dispatch(getAllUsers(filterValues));
    }
  }, [filterValues.cityId, filterValues.clubId, filterValues.name, filterValues.pagination, filterValues.sorting]);

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
      clubId: undefined,
      pagination: 1
    }));
  }, [setFilterValues]);
  const showDeleteModal = (entity: IUser) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("users.entity") + " " + t("common.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deleteOfConsentWinLine(entity.id)).then(() => dispatch(getAllUsers(filterValues)));
      }
    });
  };

  const columns = generateColumnsUserViewing(access, {
    setUserDescription,
    translation: t,
    clubs,
    cities,
    showDeleteModal
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
            <FiltersInputTwoSelects
              inputPlaceholder={t("common.filters.placeholders.title")}
              inputName={"name"}
              firstSelectPlaceholder={t("users.filters.placeholders.cities")}
              firstSelectValue={filterValues.cityId}
              firstSelectName={"cityId"}
              firstSelectOptions={useMemo(
                () =>
                  cities.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.nameRu}
                    </Option>
                  )),
                [cities]
              )}
              firstSelectShowSearch={true}
              secondSelectPlaceholder={t("common.filters.placeholders.project")}
              secondSelectValue={filterValues.clubId}
              secondSelectName={"clubId"}
              secondSelectOptions={useMemo(
                () =>
                  clubs.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.clubName}
                    </Option>
                  )),
                [clubs]
              )}
              onChange={changeFilters}
              resetFilters={resetFilters}
              isDisabledResetFilters={isLoading}
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
          <UsersViewingDescription
            cities={cities}
            clubs={clubs}
            userDescription={userDescription}
            onClose={() => setUserDescription(undefined)}
          />
        </Card>
      </ContentStyled>
    </>
  );
};
