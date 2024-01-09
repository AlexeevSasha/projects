import { Button, DatePicker, Form } from "antd";
import { BestPlayerFiltersType } from "common/interfaces/bestPlayer";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}

export const BestPlayerFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<BestPlayerFiltersType>();

  const statusesOptions = useMemo(
    () => [
      { value: "Published", label: t("allPages.statuses.Published") },
      { value: "Planned", label: t("allPages.statuses.Planned") },
      { value: "Completed", label: t("allPages.statuses.Completed") },
    ],
    []
  );

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange(
      Array.isArray(name) && name[0] === "dateRange"
        ? {
            StartVoting: value?.[0].toISOString(),
            EndVoting: value?.[1].toISOString(),
          }
        : { [name.toString()]: value }
    );
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="Promo">
        <SelectField
          placeholder={t("bestPlayer.selectPromo")}
          options={[
            { label: t("bestPlayer.matchPlayer"), value: "matchPlayer" },
            { label: t("bestPlayer.monthPlayer"), value: "monthPlayer" },
            { label: t("bestPlayer.seasonPlayer"), value: "seasonPlayer" },
          ]}
        />
      </FormItem>

      <FormItem name="dateRange">
        <DatePicker.RangePicker placeholder={[t("allPages.startDate"), t("allPages.endDate")]} />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
