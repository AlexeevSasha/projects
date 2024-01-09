import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form } from "antd";
import { FieldData } from "common/interfaces/IField";
import { FilterChangeValue } from "common/interfaces/common";
import { MatchFilters } from "common/interfaces/matches";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { theme } from "../../assets/theme/theme";
import { FilterInput, FiltersContainer } from "../../ui/FiltersHeader";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const MatchesFilters = memo(({ onChange, resetFilters }: Props) => {
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
      <Form.Item name="TeamsNames">
        <FilterInput
          placeholder={t("matches.serchByTeam")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </Form.Item>

      <Form.Item name="MatchDate">
        <DatePicker placeholder={t("allPages.selectData")} style={{ width: "256px" }} />
      </Form.Item>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
