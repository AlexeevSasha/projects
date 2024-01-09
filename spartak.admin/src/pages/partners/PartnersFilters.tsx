import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue, Layouts, Statys } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { PartnerFilters } from "common/interfaces/partners";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}

export const PartnersFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<PartnerFilters>();

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

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="FullName">
        <Input
          placeholder={t("allPages.filters.nameSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <CustomDivider type={"vertical"} />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
