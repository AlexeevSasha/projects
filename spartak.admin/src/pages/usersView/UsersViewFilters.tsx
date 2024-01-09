import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { Statys } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

const { RangePicker } = DatePicker;

interface Props {
  onChange(name: FieldData["name"], value: string): void;
  resetFilters(): void;
}

export const UsersViewFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const statusesOptions = useMemo(
    () =>
      Object.entries(Statys).map(([value, label]) => ({
        label: t(`allPages.statuses.${label}`),
        value,
      })),
    []
  );

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={([{ name, value }]) => onChange(name, value)}>
      <FormItem name="fullName">
        <Input
          placeholder={t("allPages.filters.nameSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>

      <FormItem name="status">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <FormItem name="status">
        <RangePicker
          inputReadOnly={true}
          style={{ width: "100%" }}
          placeholder={[t("allPages.filters.date.begin"), t("allPages.filters.date.end")]}
        />
      </FormItem>

      <CustomDivider type={"vertical"} />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
