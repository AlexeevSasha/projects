import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { getLoyaltyStatuses } from "common/constants/loyalty";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { BidToExitFiltersEntity } from "common/interfaces/kids";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { SelectField } from "ui/SelectField";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const LoyaltyFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<BidToExitFiltersEntity>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange(
      Array.isArray(name) && name[0] === "dateRange"
        ? {
            StartDate: value?.[0].toISOString(),
            EndDate: value?.[1].toISOString(),
          }
        : { [name.toString()]: value }
    );
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="Name">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("loyalty.searchByName")}
        />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("loyalty.allStatuses")} options={getLoyaltyStatuses()} allowClear />
      </FormItem>

      <FormItem name="dateRange">
        <DatePicker.RangePicker placeholder={[t("loyalty.startDate"), t("loyalty.endDate")]} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
