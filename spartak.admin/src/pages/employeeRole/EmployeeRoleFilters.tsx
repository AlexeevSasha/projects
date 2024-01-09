import { Button, Form } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { StaffFilters } from "common/interfaces/staff";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FilterInput, FiltersContainer, FormItem } from "../../ui/FiltersHeader";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const EmployeeRoleFilters = memo(({ onChange, resetFilters }: Props) => {
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
        <FilterInput
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          name="employeeFioSearch"
          placeholder={t("roles.roleSearch")}
        />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
