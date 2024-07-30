import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import type { Moment } from "moment";
import { CustomInput } from "../CustomInput";
import { useTranslation } from "react-i18next";
import { CustomSelect } from "../CustomSelect";

const { RangePicker } = DatePicker;

interface IProps {
  inputName: string;
  inputPlaceholder: string;
  selectOptions: JSX.Element[];
  selectValue?: string;
  selectName: string;
  selectPlaceholder: string;
  selectShowSearch?: boolean;
  datePlaceholder?: [string, string];
  dateName: string;
  dateValue: null | [Moment, Moment];
  isDisabledResetFilters: boolean;
  onChange(name: string, value: string | [Moment, Moment]): void;
  resetFilters(): void;
}

export const FiltersHeaderWithSelectAndInput: React.FC<IProps> = React.memo(
  ({
    inputName,
    inputPlaceholder,
    selectName,
    selectValue,
    selectShowSearch,
    selectOptions,
    selectPlaceholder,
    datePlaceholder,
    dateName,
    dateValue,
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

    const changeValues = (nameField: string, value: string | [Moment, Moment]) => {
      onChange(nameField, typeof value === "string" ? value.trim() : value);
    };

    return (
      <FiltersHeader>
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
        <CustomInput
          key={`${resetKey}Input`}
          placeholder={inputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValues(inputName, e.target.value)}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
        <RangePicker
          inputReadOnly={true}
          onChange={(e) => changeValues(dateName, e as [Moment, Moment])}
          placeholder={datePlaceholder}
          value={dateValue}
        />
        <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
          {t("common.filters.clearFilters")}
        </Button>
      </FiltersHeader>
    );
  }
);
