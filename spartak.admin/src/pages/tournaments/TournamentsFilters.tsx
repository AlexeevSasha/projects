import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { MatchFilters } from "common/interfaces/matches";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { theme } from "../../assets/theme/theme";
import { FilterInput, FiltersContainer } from "../../ui/FiltersHeader";

const { RangePicker } = DatePicker;

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const TournamentsFilters = React.memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<MatchFilters>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange(
      Array.isArray(name) && name[0] === "DateRange"
        ? {
            StartDate: value?.[0].toISOString(),
            EndDate: value?.[1].toISOString(),
          }
        : { [name.toString()]: value }
    );
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <Form.Item name="ShortName">
        <FilterInput
          name="employeeFioSearch"
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("allPages.filters.nameSearchPlaceholder")}
        />
      </Form.Item>

      <Form.Item name="DateRange">
        <RangePicker placeholder={[t("allPages.startDate"), t("allPages.endDate")]} style={{ width: "100%" }} />
      </Form.Item>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
