import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import type { Moment } from "moment";
import { CustomInput } from "../CustomInput";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

interface IProps {
  inputName: string;
  secondInputName: string;
  inputPlaceholder: string;
  secondInputPlaceholder: string;
  datePlaceholder?: [string, string];
  dateName: string;
  dateValue: null | [Moment, Moment];
  isDisabledResetFilters: boolean;
  disabledDate?: (current: moment.Moment) => boolean;
  onChange(name: string, value: string | [Moment, Moment] | [Moment]): void;
  resetFilters(): void;
}

export const FiltersHeaderTwoInputsDate: React.FC<IProps> = React.memo(
  ({
    inputName,
    secondInputName,
    inputPlaceholder,
    secondInputPlaceholder,
    datePlaceholder,
    dateName,
    dateValue,
    disabledDate,
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
        <CustomInput
          key={`${resetKey}Input`}
          placeholder={inputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValues(inputName, e.target.value)}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
        <CustomInput
          key={`${resetKey}SecondInput`}
          placeholder={secondInputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValues(secondInputName, e.target.value)}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
        <RangePicker
          inputReadOnly={true}
          onChange={(e) => changeValues(dateName, e as [Moment, Moment])}
          placeholder={datePlaceholder}
          disabledDate={disabledDate}
          value={dateValue}
        />
        <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
          {t("common.filters.clearFilters")}
        </Button>
      </FiltersHeader>
    );
  }
);
