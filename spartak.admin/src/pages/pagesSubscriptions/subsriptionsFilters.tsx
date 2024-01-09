import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { SubscriptionsFilterTypes } from "common/interfaces/subscriptions";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FiltersContainer, FormItem } from "../../ui/FiltersHeader";

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}

export const SubscriptionsFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<SubscriptionsFilterTypes>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => {
    onChange({ [name.toString()]: value });
  };

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <StyledContainer>
        <FiltersBlock>
          <FormItem name="FullName">
            <Input
              placeholder={t("allPages.filters.nameSearchPlaceholder")}
              prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
            />
          </FormItem>

          <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
        </FiltersBlock>
        <Button type={"primary"} onClick={() => window.location.reload()}>
          <RedoOutlined rotate={-90} />
          {t("allPages.update")}
        </Button>
      </StyledContainer>
    </FiltersContainer>
  );
});
const FiltersBlock = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
