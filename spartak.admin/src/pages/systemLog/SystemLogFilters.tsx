import { Button, DatePicker, Form, Input } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { LogFilters } from "common/interfaces/systemLog";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";
import { FieldData } from "../../common/interfaces/IField";
import { getEmployeeByFilter } from "../../store/employeeView/employeeViewActionAsync";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { employeeListSelector } from "../../store/employeeView/employeeViewSelectors";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const SystemLogFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LogFilters>();
  const dispatch = useAppDispatch();
  const employees =
    useSelector(employeeListSelector)?.map((employee) => ({
      value: employee.Name,
      label: employee.Name,
    })) ?? [];

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange(
      Array.isArray(name) && name[0] === "dateRange"
        ? {
            StartJournal: value?.[0].toISOString(),
            EndJournal: value?.[1].toISOString(),
          }
        : { [name.toString()]: value }
    );
  };

  useEffect(() => {
    dispatch(getEmployeeByFilter({}));
  }, [dispatch]);

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="IdContains">
        <Input name="employeeFioSearch" placeholder={t("allPages.filters.search")} />
      </FormItem>

      <FormItem name="UserName">
        <SelectField placeholder={t("systemLog.changeEmployee")} options={employees} />
      </FormItem>

      <Form.Item name="dateRange">
        <DatePicker.RangePicker
          placeholder={[t("allPages.startDate"), t("allPages.endDate")]}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
