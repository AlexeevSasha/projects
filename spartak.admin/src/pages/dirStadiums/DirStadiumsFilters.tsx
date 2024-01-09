import { SearchOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FilterInput, FiltersContainer } from "../../ui/FiltersHeader";

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}

export const DirStadiumsFilters = React.memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <Form.Item name="FullName">
        <FilterInput
          name="StadiumName"
          placeholder={t("allPages.filters.nameSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </Form.Item>

      <CustomDivider type={"vertical"} />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
