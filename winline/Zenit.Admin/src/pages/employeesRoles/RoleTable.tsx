import { useCallback, useEffect, useState } from "react";
import { Card, Table, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { employeeRolesSelectorEntities } from "../../modules/employeeRoles/employeeRolesSelector";
import { getAllEmployeeRoles, deleteEmployeeRole } from "../../modules/employeeRoles/employeeRolesActionAsync";
import { useSelector } from "react-redux";
import { RoleForm } from "./form/RoleForm";
import { RoleDescription } from "./modal/RoleDescription";
import { getRoleAccess } from "../../modules/roleAccess/roleAccessActionAsync";
import { generateColumnsEmployeeRoles } from "../../ui/tableColumnsGenerator/employees/generateColumnsEmployeeRoles";
import { FiltersHeaderBase } from "../../ui/customFilters/FiltersHeaderBase";
import debounce from "lodash/debounce";
import { Loader } from "../../ui/Loader";
import type { SorterResult } from "antd/es/table/interface";
import type { IEmployeeRole, IFiltersRole } from "../../api/dto/employees/IEmployeeRole";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

export const RoleTable = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<IFiltersRole>({
    name: "",
    sorting: "",
    pagination: 1
  });
  const [formRoleVisible, setFormRoleVisible] = useState<IEmployeeRole | null | {}>(null);
  const [descriptionRole, setDescriptionRole] = useState<IEmployeeRole | null>(null);
  const { count, isLoading } = useSelector((state: StateType) => state.employeeRoles);
  const rolesEmployee = useSelector(employeeRolesSelectorEntities);

  const showFormRole = (role: IEmployeeRole | {} | null = null) => {
    setFormRoleVisible(role);
  };

  const showDescriptionRole = (role = null) => {
    setDescriptionRole(role);
  };

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getRoleAccess(t));
  }, []);

  useEffect(() => {
    dispatch(getAllEmployeeRoles(filterValues));
  }, [filterValues.name, filterValues.pagination, filterValues.sorting]);

  const showModalRemove = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("common.role") + " " + t("common.modal.contentFemale"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deleteEmployeeRole(id)).then(() => dispatch(getAllEmployeeRoles(filterValues)));
      }
    });
  };

  const changeRoleFilters = useCallback(
    debounce((nameField: string, value: string | number) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    []
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...prev, name: "", pagination: 1 }));
  }, []);

  const columns = generateColumnsEmployeeRoles(access, {
    showFormRole,
    showModalRemove,
    showDescriptionRole,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <HeaderStyled>
        <TitleStyled level={4}>{t("employees.role.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock>
            <FiltersHeaderBase
              placeholder={t("common.filters.placeholders.title")}
              name={"name"}
              onChange={changeRoleFilters}
              resetFilters={resetFilters}
              isDisabledResetFilters={isLoading}
            />
            {access && (
              <Button onClick={() => showFormRole({})} type="primary" icon={<PlusOutlined />}>
                {t("common.buttonsText.create")}
              </Button>
            )}
          </FiltersButtonBlock>
          <Table
            columns={columns}
            rowKey={(entity) => entity.id}
            dataSource={rolesEmployee}
            onChange={(pagination, filters, sorter: SorterResult<IEmployeeRole> | SorterResult<IEmployeeRole>[]) =>
              onChangeDataTable<IEmployeeRole, IFiltersRole>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            scroll={{ x: 520 }}
            sticky
          />
        </Card>
      </ContentStyled>
      <RoleForm dataFormRole={formRoleVisible} onClose={() => showFormRole()} />
      <RoleDescription role={descriptionRole} onClose={() => showDescriptionRole()} />
    </>
  );
};
