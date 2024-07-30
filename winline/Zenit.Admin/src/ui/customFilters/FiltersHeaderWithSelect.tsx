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
  selectOptions: JSX.Element[];
  selectValue?: string;
  selectName: string;
  selectPlaceholder: string;
  selectShowSearch?: boolean;
  isDisabledResetFilters: boolean;
  onChange(name: string, value: string): void;
  resetFilters(): void;
}

export const FiltersHeaderWithSelect: React.FC<IProps> = React.memo(
  ({
    inputName,
    inputPlaceholder,
    selectOptions,
    selectValue,
    selectName,
    selectPlaceholder,
    isDisabledResetFilters,
    onChange,
    resetFilters,
    selectShowSearch
  }) => {
    const [resetKey, setResetKey] = useState<boolean>(false);
    const { t } = useTranslation();

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
          showSearch={selectShowSearch}
          style={{ width: "inherit" }}
          placeholder={selectPlaceholder}
          value={selectValue}
          onChange={(value) => changeValues(selectName, typeof value === "string" ? value : "")}
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
        >
          {selectOptions}
        </CustomSelect>
        <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
          {t("common.filters.clearFilters")}
        </Button>
      </FiltersHeader>
    );
  }
);
