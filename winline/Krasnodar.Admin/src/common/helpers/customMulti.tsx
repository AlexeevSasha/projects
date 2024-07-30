import { Checkbox, Divider, FormInstance } from "antd";
import React from "react";
import i18next from "i18next";

const checkBoxChange = (
  fieldName: string | undefined,
  options: { value: number; label: string }[],
  value: number[] | string[] | undefined,
  setValue: (selectOptions?: number[]) => void | undefined,
  form: FormInstance | undefined,
  changeValues: Function | undefined
) => {
  if (value?.length !== options.length) {
    const selectOptions = options.map((option) => option.value);
    setValue?.(selectOptions);
    changeValues?.(fieldName, selectOptions);
    if (fieldName) {
      form?.setFieldsValue({
        [fieldName]: options?.map((item) => item.value)
      });
    }
  } else if (value?.length === options.length) {
    setValue?.([]);
    changeValues?.(fieldName, []);
    if (fieldName) {
      form?.setFieldsValue({
        [fieldName]: []
      });
    }
  }
};

export const selectProps: any = (
  fieldName: string | undefined,
  options: { value: number; label: string }[],
  value: number[] | string[] | undefined,
  setValue: (newValue?: number[]) => void | undefined,
  form: FormInstance | undefined,
  placeholder: string,
  changeValues: Function | undefined
) => {
  return {
    mode: "multiple",
    allowClear: true,
    showSearch: false,
    showArrow: true,
    value,
    options,
    onChange: (newValue: number[]) => {
      if (setValue) {
        setValue(newValue);
      } else {
        changeValues?.(fieldName, newValue);
      }
    },
    placeholder,
    maxTagCount: 1,
    dropdownRender: (allSelectValue: { label: string; value: number }[]) => (
      <div>
        <div style={{ padding: "4px 8px 8px 8px", cursor: "pointer" }}>
          <Checkbox
            checked={value?.length === options.length}
            onChange={() => checkBoxChange(fieldName, options, value, setValue, form, changeValues)}
          >
            {i18next.t("common.chooseAll")}
          </Checkbox>
        </div>
        <Divider style={{ margin: "0" }} />
        {allSelectValue}
      </div>
    )
  };
};
