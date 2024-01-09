import React from "react";
import { FieldData } from "../../common/interfaces/IField";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { FilterInput, FiltersContainer } from "../../ui/FiltersHeader";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { CustomDivider } from "../../ui/CustomDivider";

interface Props {
  onChange(name: FieldData["name"], value: string): void;
  resetFilters(): void;
  validationInput?: Function;
}

export const MediaCategoriesFilters = React.memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={([{ name, value }]) => onChange(name, value)}>
      <Form.Item name="CategoryName">
        <FilterInput
          placeholder={t("mediaCategories.categorySearch")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </Form.Item>
      <CustomDivider type="vertical" />
      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
