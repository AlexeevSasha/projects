import { Button, Form, Input } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { StaffFilters } from "common/interfaces/staff";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField, SelectFieldOption } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
  roleSelectOptions?: SelectFieldOption[];
};

export const EmployeeFilters = memo(({ onChange, resetFilters, roleSelectOptions }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<StaffFilters>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="Name">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          name="employeeFioSearch"
          placeholder={t("employee.search")}
        />
      </FormItem>

      <FormItem name="RoleId">
        <SelectField placeholder={t("employee.rolePlaceholder")} options={roleSelectOptions || []} />
      </FormItem>

      <FormItem name="ActivationDate">
        <SelectField
          placeholder={t("allPages.filters.statusPlaceholder")}
          options={[
            { label: "Активен", value: "true" },
            { label: "Не активен", value: "false" },
          ]}
        />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
