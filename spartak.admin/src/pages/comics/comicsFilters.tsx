import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { ComicFilterEntity } from "common/interfaces/kids";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const ComicsFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ru" ? "Ru" : "En";
  const [form] = Form.useForm<ComicFilterEntity>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="ComicName">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("kids.journalFilter")}
        />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
