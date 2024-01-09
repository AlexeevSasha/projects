import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue, Statys } from "common/interfaces/common";
import { GraduatesFiltersEntity } from "common/interfaces/graduates";
import { FieldData } from "common/interfaces/IField";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { graduateSectionOptionsSelector } from "store/graduates/graduatesSelectors";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const GraduatesFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<GraduatesFiltersEntity>();
  const sectionsOptions = useSelector(graduateSectionOptionsSelector);

  const statusesOptions = useMemo(
    () =>
      Object.entries(Statys)
        .splice(2, 2)
        .map(([value, label]) => ({
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
          name="employeeFioSearch"
          placeholder={t("allPages.filters.fioSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>

      <FormItem name="GraduateSectionId">
        <SelectField placeholder={t("allPages.filters.sectionPlaceholder")} options={sectionsOptions} />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
