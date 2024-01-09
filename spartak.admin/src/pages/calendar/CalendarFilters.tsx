import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue, Statys } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { StaffFilters } from "common/interfaces/staff";
import moment from "moment";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { SelectField } from "ui/SelectField";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const CalendarFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<StaffFilters>();

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
      <Form.Item name="EventDate">
        <DatePicker name="selectData" placeholder={t("allPages.selectData")} />
      </Form.Item>

      <FormItem name="FullName">
        <Input
          name="fullNameSearch"
          placeholder={t("allPages.filters.nameSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
