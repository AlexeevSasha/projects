import { useCallback, useEffect, useState } from "react";
import { Card, message, Select, Table } from "antd";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { generateColumnsSystemLog } from "../../ui/tableColumnsGenerator/systemLog/generateColumnsSystemLog";
import { FiltersHeaderWithDate } from "../../ui/customFilters/FiltersHeaderWithData";
import { getAllSystemLog } from "../../modules/systemLog/systemLogActionAsync";
import { getSystemLogEntities } from "../../modules/systemLog/systemLogSelector";
import { SystemLogDescription } from "./modal/SystemLogDescription";
import { getAllEmployees } from "../../modules/employees/employeesActionAsync";
import { employeeSelectorEntities } from "../../modules/employees/employeesSelector";
import { Loader } from "../../ui/Loader";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { SorterResult } from "antd/lib/table/interface";
import type { ISystemLogFilters, ISystemLogItem } from "../../api/dto/systemLog/ISystemLog";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { EmployeeDescription } from "./modal/EmloyeeDescription";
import type { IEmployee } from "../../api/dto/employees/IEmployee";
import { validationSize } from "../../common/helpers/commonValidators/validationSize";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

const { Option } = Select;

export const SystemLogTable = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<ISystemLogFilters>({
    name: "",
    employee: undefined,
    date: null,
    sorting: "",
    pagination: 1
  });
  const [descriptionLog, setDescriptionLog] = useState<ISystemLogItem | undefined>();
  const [descriptionEmployee, setDescriptionEmployee] = useState<IEmployee | undefined>();

  const { count, isLoading } = useSelector((state: StateType) => state.systemLog);
  const allSystemLog = useSelector(getSystemLogEntities);
  const allEmployees = useSelector(employeeSelectorEntities);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    if (validationSize(filterValues.name, 256)) {
      message.error(t("validations.filtersSizeError"));
    } else {
      dispatch(getAllSystemLog(filterValues));
    }
  }, [filterValues]);

  const showDescriptionLog = (log?: ISystemLogItem) => {
    setDescriptionLog(log);
  };
  const showDescriptionEmployee = (text?: string) => {
    const employee = allEmployees.find((item) => item.name === text);
    setDescriptionEmployee(employee);
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    []
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...prev, name: "", employee: undefined, date: null, pagination: 1 }));
  }, []);

  const columns = generateColumnsSystemLog({
    showDescriptionLog,
    showDescriptionEmployee,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <HeaderStyled>
        <TitleStyled level={4}>{t("systemLog.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersHeaderWithDate
            inputPlaceholder={t("common.filters.placeholders.title")}
            inputName="name"
            selectPlaceholder={t("systemLog.filters.placeholders.employee")}
            selectName="employee"
            selectValue={filterValues.employee}
            selectOptions={allEmployees.map((employee) => (
              <Option key={employee.id} value={employee.id}>
                {employee.name}
              </Option>
            ))}
            dateName="date"
            dateValue={filterValues.date}
            isDisabledResetFilters={isLoading}
            onChange={changeFilters}
            resetFilters={resetFilters}
          />
          <Table
            columns={columns}
            dataSource={allSystemLog}
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<ISystemLogItem> | SorterResult<ISystemLogItem>[]) =>
              onChangeDataTable<ISystemLogItem, ISystemLogFilters>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
        <EmployeeDescription descriptionEmployee={descriptionEmployee} onClose={() => showDescriptionEmployee()} />
        <SystemLogDescription descriptionLog={descriptionLog} onClose={() => showDescriptionLog()} />
      </ContentStyled>
    </>
  );
};
