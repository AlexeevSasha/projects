import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { PartnerFilters } from "common/interfaces/partners";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";
const { RangePicker } = DatePicker;

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}
export enum Status {
  Published = "Published",
  None = "IsDraft",
  Planned = "Planned",
  Completed = "Completed",
}
export enum Types {
  FromClub = "FromClub",
  FromPartners = "FromPartners",
}
export const QuizFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<PartnerFilters>();

  const statusesOptions = useMemo(
    () =>
      Object.entries(Status).map(([value, label]) => ({
        label: t(`allPages.statuses.${label}`),
        value,
      })),
    []
  );

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="Header">
        <Input
          style={{ width: "256px" }}
          placeholder={t("specialOffer.searchByHeading")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>
      <FormItem name="Status">
        <SelectField
          style={{ width: "256px" }}
          placeholder={t("allPages.filters.anyStatus")}
          options={statusesOptions}
        />
      </FormItem>
      <Form.Item name="DateRange">
        <RangePicker
          placeholder={[t("allPages.filters.date.begin"), t("allPages.filters.date.end")]}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <CustomDivider type={"vertical"} />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
