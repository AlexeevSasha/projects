import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { FiltersHeader } from "./FiltersHeaderContainer";
import type { Moment } from "moment";
import { CustomInput } from "../CustomInput";
import { CustomSelect } from "../CustomSelect";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../common/constants/formsConstantsValidation";

const { RangePicker } = DatePicker;

interface IProps {
  inputName: string;
  inputPlaceholder: string;
  selectOptions: any;
  selectValue: string | undefined;
  selectName: string;
  selectPlaceholder: string;
  datePlaceholder?: [string, string];
  dateName: string;
  dateValue: null | [Moment, Moment];
  isDisabledResetFilters: boolean;
  onChange(name: string, value: string | [Moment, Moment]): void;
  resetFilters(): void;
}

export const FiltersHeaderWithDate: React.FC<IProps> = React.memo(
  ({
    inputName,
    inputPlaceholder,
    selectOptions,
    selectValue,
    selectName,
    selectPlaceholder,
    dateName,
    dateValue,
    isDisabledResetFilters,
    onChange,
    resetFilters
  }) => {
    const [resetKey, setResetKey] = useState<boolean>(false);
    const { t } = useTranslation();

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
        <CustomSelect
          showSearch={false}
          placeholder={selectPlaceholder}
          value={selectValue}
          onChange={(value: any) => changeValues(selectName, typeof value === "string" ? value : "")}
        >
          {selectOptions}
        </CustomSelect>
        <RangePicker
          style={{ minWidth: "14rem" }}
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
