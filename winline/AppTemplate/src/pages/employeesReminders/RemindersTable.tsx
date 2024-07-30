import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import { useSelector } from "react-redux";
import { generateColumnsEmployeeReminders } from "../../ui/tableColumnsGenerator/employees/generateColumnsEmployeeReminders";
import { RemindersForm } from "./components/form/RemindersForm";
import { getAllEmployeeReminders } from "../../modules/employeeReminders/employeeRemindersActionAsync";
import { employeeRemindersSelectorEntities } from "../../modules/employeeReminders/employeeRemindersSelector";
import type { IEmployeeReminder, IRemindersFilters } from "../../api/dto/employees/IEmployeeReminder";
import { ReminderDescription } from "./components/modal/ReminderDescription";
import { Loader } from "../../ui/Loader";
import { getAllEmployees } from "../../modules/employees/employeesActionAsync";
import { SorterResult } from "antd/es/table/interface";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { employeeSelectorEntities } from "../../modules/employees/employeesSelector";
import { showArrayCoincidenceItems } from "../../common/helpers/showArrayCoincidenceItems";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { ContentStyled, FiltersButtonBlock, HeaderStyled, TitleStyled } from "../../ui/commonComponents";

export const RemindersTable = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { count, isLoading } = useSelector((state: StateType) => state.employeeReminders);
  const remindersEmployee = useSelector(employeeRemindersSelectorEntities);
  const employees = useSelector(employeeSelectorEntities);
  const [filterValues, setFilterValues] = useState<IRemindersFilters>({
    sorting: "",
    pagination: 1
  });
  const [isShowReminderForm, setShowReminderForm] = useState<boolean>(false);
  const [reminderDescription, setReminderDescription] = useState<{ show: boolean; reminder?: IEmployeeReminder }>({ show: false });

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    dispatch(getAllEmployeeReminders(filterValues));
  }, [filterValues.pagination, filterValues.sorting]);

  const showDescriptionReminder = (reminder: IEmployeeReminder) => {
    setReminderDescription({ show: true, reminder });
  };

  const showReminderForm = () => {
    setShowReminderForm(!isShowReminderForm);
  };

  const setShowEmployees = useCallback((employeesItem: string[]) => showArrayCoincidenceItems(employees, employeesItem), [employees]);

  const columns = generateColumnsEmployeeReminders(access, {
    showDescriptionReminder,
    setShowEmployees,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <HeaderStyled>
        <TitleStyled level={4}>{t("employees.reminders.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock style={{ justifyContent: "flex-end", marginBottom: "16px" }}>
            {access && (
              <Button onClick={() => showReminderForm()} disabled={isLoading} type="primary" icon={<PlusOutlined />}>
                {t("common.buttonsText.create")}
              </Button>
            )}
          </FiltersButtonBlock>
          <Table
            columns={columns}
            dataSource={remindersEmployee}
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<IEmployeeReminder> | SorterResult<IEmployeeReminder>[]) =>
              onChangeDataTable<IEmployeeReminder, IRemindersFilters>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
      </ContentStyled>
      <RemindersForm
        employees={employees}
        visible={isShowReminderForm}
        remindersOptions={remindersEmployee}
        closeDrawer={() => showReminderForm()}
      />
      <ReminderDescription
        setShowEmployees={setShowEmployees}
        visible={reminderDescription.show}
        onClose={() => setReminderDescription({ show: false })}
        reminder={reminderDescription.reminder}
      />
    </>
  );
};
