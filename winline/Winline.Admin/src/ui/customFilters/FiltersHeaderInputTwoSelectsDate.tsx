import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import { CustomInput } from "../CustomInput";
import { CustomSelect } from "../CustomSelect";
import { useTranslation } from "react-i18next";
import { Moment } from "moment";
import { formsConstantsValidation } from "../../common/constants/formsConstantsValidation";

interface IProps {
  inputName: string;
  inputPlaceholder: string;
  firstSelectOptions: any[];
  firstSelectValue: string | undefined;
  firstSelectName: string;
  firstSelectPlaceholder: string;
  secondSelectOptions: any[];
  secondSelectValue: string | undefined;
  secondSelectName: string;
  secondSelectPlaceholder: string;
  dateName: string;
  dateValue: [Moment, Moment] | null;
  isDisabledResetFilters: boolean;
  onChange(name: string, value: string | [Moment, Moment]): void;
  resetFilters(): void;
}

const { RangePicker } = DatePicker;
export const FiltersHeaderInputTwoSelectsDate: React.FC<IProps> = React.memo(
  ({
    inputName,
    inputPlaceholder,
    firstSelectOptions,
    firstSelectValue,
    firstSelectName,
    firstSelectPlaceholder,
    secondSelectOptions,
    secondSelectValue,
    secondSelectName,
    secondSelectPlaceholder,
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
        <CustomInput
          style={{ maxWidth: "300px" }}
          key={`${resetKey}Input`}
          placeholder={inputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValues(inputName, e.target.value)}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
        <CustomSelect
          showSearch={false}
          style={{ maxWidth: "180px" }}
          placeholder={firstSelectPlaceholder}
          value={firstSelectValue}
          onChange={(value) => changeValues(firstSelectName, typeof value === "string" ? value : "")}
        >
          {firstSelectOptions}
        </CustomSelect>
        <CustomSelect
          showSearch={false}
          style={{ maxWidth: "180px" }}
          placeholder={secondSelectPlaceholder}
          value={secondSelectValue}
          onChange={(value) => changeValues(secondSelectName, typeof value === "string" ? value : "")}
        >
          {secondSelectOptions}
        </CustomSelect>
        <RangePicker
          style={{ minWidth: "330px" }}
          format={formsConstantsValidation.dateFormat}
          inputReadOnly={true}
          onChange={(e) => changeValues(dateName, e as [Moment, Moment])}
          value={dateValue}
        />
        <Button disabled={isDisabledResetFilters} onClick={clearFilters}>
          {t("common.filters.clearFilters")}
        </Button>
      </FiltersHeader>
    );
  }
);
