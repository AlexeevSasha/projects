import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Table, message, Modal, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { EmployeeForm } from "./components/forms/EmployeeForm";
import { getAllEmployees, deleteEmployee, updateInvitationEmployee } from "../../modules/employees/employeesActionAsync";
import { getAllEmployeeRoles } from "../../modules/employeeRoles/employeeRolesActionAsync";
import { employeeSelectorEntities } from "../../modules/employees/employeesSelector";
import { useSelector } from "react-redux";
import { employeeRolesSelectorEntities } from "../../modules/employeeRoles/employeeRolesSelector";
import { generateColumnsEmployees } from "../../ui/tableColumnsGenerator/employees/generateColumnsEmployees";
import { FiltersHeaderWithSelect } from "../../ui/customFilters/FiltersHeaderWithSelect";
import debounce from "lodash/debounce";
import { Loader } from "../../ui/Loader";
import { /*exportFile, */ loadFileVariable } from "../../modules/exportFiles/exportFiles";
import { SorterResult } from "antd/es/table/interface";
import type { IEmployee, IEmployeeFilters } from "../../api/dto/employees/IEmployee";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

const { Option } = Select;

export const EmployeeTable = ({ access, writeRole, readRole }: { access: boolean; writeRole: boolean; readRole: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<IEmployeeFilters>({
    name: "",
    sorting: "",
    pagination: 1,
    roleId: undefined
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [idEntityChanged, setIdEntityChanged] = useState<number | null>(null);
  const [disabledButtonsInvitation, setDisabledInvitation] = useState<Record<string, boolean>>({});

  const { count, isLoading } = useSelector((state: StateType) => state.employees);
  const employees = useSelector(employeeSelectorEntities);
  const employeeRoles = useSelector(employeeRolesSelectorEntities);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllEmployeeRoles());
  }, []);

  useEffect(() => {
    dispatch(getAllEmployees(filterValues));
  }, [filterValues.name, filterValues.roleId, filterValues.sorting, filterValues.pagination]);

  const showErrorModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("employees.table.uiContent.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deleteEmployee(id)).then(() => dispatch(getAllEmployees(filterValues)));
      }
    });
  };

  // const exportFileHandler = (fileExtension: string) => {
  //   dispatch(
  //     exportFile({
  //       path: `/odata/Employee?exportType=${fileExtension}`,
  //       fileName: "employee"
  //     })
  //   ).then(() => message.success(t("successExport")));
  // };

  const showFormEmployee = (id = null) => {
    setIdEntityChanged(id);
    setVisible(!visible);
  };

  const updateInvitation = async (id: string) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { payload }: any = await dispatch(updateInvitationEmployee(id));
    if (!!payload) {
      setDisabledInvitation((prev) => ({ ...prev, [id]: !!payload }));
    } else {
      message.error(t("forgotPassword.uiContent.modal.error.errorRequest"));
    }
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...prev, name: "", pagination: 1, roleId: undefined }));
  }, [setFilterValues]);

  const columns = generateColumnsEmployees(access, {
    showFormEmployee,
    updateInvitation,
    showErrorModal,
    employeeRoles,
    disabledButtonsInvitation,
    translation: t,
    isLoading
  });

  return (
    <>
      {isLoading || loadFileVariable ? <Loader /> : ""}
      <HeaderStyled>
        <TitleStyled level={4}>{t("employees.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock>
            <FiltersHeaderWithSelect
              inputPlaceholder={t("common.filters.placeholders.title") + " " + t("employees.entity")}
              inputName={"name"}
              selectPlaceholder={t("employees.filters.placeholders.role")}
              selectValue={filterValues.roleId}
              selectName={"roleId"}
              selectOptions={useMemo(
                () =>
                  employeeRoles.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  )),
                [employeeRoles]
              )}
              onChange={changeFilters}
              resetFilters={resetFilters}
              isDisabledResetFilters={isLoading}
            />
            {access && (
              <Button
                onClick={() => (readRole || writeRole ? showFormEmployee() : message.error(t("validations.noWriteRoleAccess")))}
                type="primary"
                icon={<PlusOutlined />}
              >
                {t("common.buttonsText.create")}
              </Button>
            )}
            {/* <ExportFileButton exportFileHandler={exportFileHandler} /> */}
          </FiltersButtonBlock>
          <Table
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<IEmployee> | SorterResult<IEmployee>[]) =>
              onChangeDataTable<IEmployee, IEmployeeFilters>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            columns={columns}
            dataSource={employees}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
      </ContentStyled>
      <EmployeeForm idEntityChanged={idEntityChanged} roleAccess={readRole || writeRole} visible={visible} onClose={showFormEmployee} />
    </>
  );
};
