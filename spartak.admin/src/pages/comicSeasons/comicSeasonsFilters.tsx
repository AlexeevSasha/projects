import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { ComicSeasonFilterEntity } from "common/interfaces/kids";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { theme } from "../../assets/theme/theme";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const ComicSeasonsFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ComicSeasonFilterEntity>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="ComicSeasonName">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("kids.seasonsFilter")}
        />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
