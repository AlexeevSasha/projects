import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { statuses } from "common/constants/kids";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { BidToExitFiltersEntity } from "common/interfaces/kids";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { SelectField } from "ui/SelectField";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const BidToExitFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<BidToExitFiltersEntity>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange(
      name === "ParentChild"
        ? {
            ParentName: value,
            ChildName: value,
          }
        : name === "PhoneEmail"
        ? {
            Email: value,
            Phone: value,
          }
        : { [name.toString()]: value }
    );
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="CreatedUtc">
        <DatePicker placeholder={t("kids.dateFilter")} style={{ width: "100%" }} />
      </FormItem>

      <FormItem name="SpartakKidsCardNumber">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("kids.cardFilter")}
        />
      </FormItem>

      <FormItem name="ParentChild">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("kids.nameFilter")}
        />
      </FormItem>

      <FormItem name="PhoneEmail">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("kids.phoneMailFilter")}
        />
      </FormItem>

      <FormItem name="PlayerToFieldRequestStatus">
        <SelectField placeholder={t("allPages.status")} options={statuses()} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
