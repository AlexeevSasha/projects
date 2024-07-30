import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import { CustomInput } from "../CustomInput";
import { useTranslation } from "react-i18next";

interface IProps {
  onChange(name: string, value: string): void;
  resetFilters(): void;
  isDisabledResetFilters: boolean;
  name: string;
  placeholder: string;
  validationInput?: Function;
}

export const FiltersHeaderBase: React.FC<IProps> = React.memo(({ onChange, name, placeholder, resetFilters, isDisabledResetFilters }) => {
  const [resetKey, setResetKey] = useState<boolean>(false);
  const { t } = useTranslation();

  const clearFilters = () => {
    resetFilters();
    setResetKey(!resetKey);
  };

  const changeValues = (fieldName: string, value: string) => {
    onChange(fieldName, value.trim());
  };

  return (
    <FiltersHeader>
      <CustomInput
        key={`${resetKey}Input`}
        placeholder={placeholder}
        onChange={(e) => changeValues(name, e.target.value)}
        prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
      />
      <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
        {t("common.filters.clearFilters")}
      </Button>
    </FiltersHeader>
  );
});
