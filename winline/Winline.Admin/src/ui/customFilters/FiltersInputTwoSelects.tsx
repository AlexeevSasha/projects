import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import { CustomInput } from "../CustomInput";
import { CustomSelect } from "../CustomSelect";
import { useTranslation } from "react-i18next";

interface IProps {
  inputName: string;
  inputPlaceholder: string;
  firstSelectOptions: any[];
  firstSelectValue: string | undefined;
  firstSelectName: string;
  firstSelectPlaceholder: string;
  firstSelectShowSearch?: boolean;
  secondSelectOptions: any[];
  secondSelectValue: string | undefined;
  secondSelectName: string;
  secondSelectPlaceholder: string;
  isDisabledResetFilters: boolean;
  onChange(name: string, value: string): void;
  resetFilters(): void;
}

export const FiltersInputTwoSelects: React.FC<IProps> = React.memo(
  ({
    inputName,
    inputPlaceholder,
    firstSelectOptions,
    firstSelectValue,
    firstSelectName,
    firstSelectPlaceholder,
    firstSelectShowSearch,
    secondSelectOptions,
    secondSelectValue,
    secondSelectName,
    secondSelectPlaceholder,
    isDisabledResetFilters,
    onChange,
    resetFilters
  }) => {
    const { t } = useTranslation();
    const [resetKey, setResetKey] = useState<boolean>(false);

    const clearFilters = () => {
      resetFilters();
      setResetKey(!resetKey);
    };

    const changeValues = (name: string, value: string) => {
      onChange(name, value.trim());
    };

    return (
      <FiltersHeader>
        <CustomInput
          key={`${resetKey}Input`}
          placeholder={inputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValues(inputName, e.target.value)}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
        <CustomSelect
          showSearch={firstSelectShowSearch}
          style={{ width: "inherit" }}
          placeholder={firstSelectPlaceholder}
          value={firstSelectValue}
          onChange={(value) => changeValues(firstSelectName, typeof value === "string" ? value : "")}
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
        >
          {firstSelectOptions}
        </CustomSelect>
        <CustomSelect
          showSearch={false}
          style={{ width: "inherit" }}
          placeholder={secondSelectPlaceholder}
          value={secondSelectValue}
          onChange={(value) => changeValues(secondSelectName, typeof value === "string" ? value : "")}
        >
          {secondSelectOptions}
        </CustomSelect>
        <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
          {t("common.filters.clearFilters")}
        </Button>
      </FiltersHeader>
    );
  }
);
