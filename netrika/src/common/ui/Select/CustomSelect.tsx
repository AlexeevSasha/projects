import React, { MouseEvent, useEffect, useState } from "react";
import Select, { components, createFilter } from "react-select";
import { ICustomSelect } from "../../interfaces/ISelect";
import CreatableSelect from "react-select/creatable";
import { validateFloat, validateNum } from "../../constants/validate";
import { IconPlus } from "../../components/Icon/IconPlus";
import { useCustomSelect } from "./hooks/useCustomSelect";
import { useSelectComponents } from "./hooks/useSelectComponents";
import { LabelStyle } from "../Input/styles/labelStyles";
import styled from "styled-components";
import { theme } from "../../styles/theme";

export interface IPropsCustomSelect {
  className?: string;
  isRelative?: boolean;
  type?: string; // "text" | "number" | "calendar";
  isMulti?: boolean;
  hideMultiValueRemove?: boolean;
  options: { label: string; value: string | number }[];
  closeMenuOnSelect?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
  SelectValue: ICustomSelect | ICustomSelect[] | unknown;
  isDisabled?: boolean;
  isClearable?: boolean;
  isError?: boolean;
  fieldID?: string;
  id?: number;
  htmlID: string;
  isCreatable?: boolean;
  creatableType?: string;
  isLongSingle?: boolean;
  menuPlacement?: "top" | "auto";
  defaultInputValue?: string;
  isLoading?: boolean;
  menuIsOpen?: boolean;
  maxMenuHeight?: number;
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  styleContainer?: React.CSSProperties;
}

const onCreatableCheckValue = (value: { value: string; label: string }[]) => {
  const regex = /.\|/gi;
  const lastEl = value.slice(-1)[0]?.value;
  if (regex.test(lastEl)) {
    const arrValues = lastEl?.split("|").filter((el) => el);
    const set = new Set([...value.slice(0, -1).map((item) => item.value), ...arrValues]);
    return Array.from(set).map((el) => ({ value: el, label: el }));
  } else {
    return value;
  }
};

export const CustomSelect: React.FC<IPropsCustomSelect> = (props) => {
  const customStyles = useCustomSelect({
    isError: props.isError,
    isDisabled: props.isDisabled,
    isRelative: props.isRelative,
    isLongSingle: props.isLongSingle,
  });
  const { NoOptionsMessage, LoadingMessage, LoadingIndicator } = useSelectComponents();
  const [filteredOption, setFilteredOption] = useState(props.options || []);
  const [inputNumValue, setInputNumValue] = useState<string>("");

  useEffect(() => {
    if (!props.isSearchable) {
      setFilteredOption(props.options || ({} as ICustomSelect));
    } else {
      setFilteredOption(props.options?.filter((item, index) => index < 50) || ({} as ICustomSelect));
    }
  }, [props.options, props.isSearchable]);

  const DropdownIndicator = (prop: any) => {
    const handleKeyDown = (e: MouseEvent<HTMLDivElement>) => {
      if (e.button === 0) {
        const element = document.querySelector(".select__input-container");
        const value = (element && element.getAttribute("data-value")) || "";
        if (value.trim() && Array.isArray(props.SelectValue) && !props.SelectValue.find((e) => e.value === value)) {
          //@ts-ignore
          props.onChange(onCreatableCheckValue([...props.SelectValue, { value, label: value }]), props.id);
        }
      }
    };

    return (
      <div onMouseDown={handleKeyDown} style={{ cursor: "pointer" }}>
        <components.DropdownIndicator {...prop} style={{ padding: "0 8px 0 8px" }}>
          <IconPlus />
        </components.DropdownIndicator>
      </div>
    );
  };

  const onCreatableInputChange = (value: string) => {
    if (props.creatableType === "Number") {
      const pointValue = (value.match(/\./g) || []).length;
      const comaValue = (value.match(/,/g) || []).length;
      if (!validateFloat.test(value) && !validateNum.test(value)) {
        setInputNumValue((prev) => prev);
      } else if (validateFloat.test(value)) {
        setInputNumValue(value);
      } else if ((pointValue && comaValue) || pointValue > 1 || comaValue > 1) {
        !validateFloat.test(value) && setInputNumValue((prev) => prev);
      } else {
        validateNum.test(value) ? setInputNumValue(value) : setInputNumValue((prev) => prev);
      }
    } else if (props.isSearchable && validateNum.test(value)) {
      setInputNumValue(value);
      setFilteredOption(props.options.filter((option) => option.label.includes(value)));
    } else setInputNumValue(value);
  };

  return (
    <div style={props.styleContainer} id={props.htmlID} className={props.className}>
      {props.label ? (
        <LabelStyle error={props.isError} isRequired={props.isRequired}>
          {props.label}
        </LabelStyle>
      ) : null}
      {props.isCreatable ? (
        <CreatableSelect
          classNamePrefix="select"
          placeholder={props.placeholder ? props.placeholder : "Выберите из списка..."}
          components={{ NoOptionsMessage, DropdownIndicator, LoadingMessage }}
          styles={customStyles}
          {...props}
          options={filteredOption.filter((item, index) => index < 50)}
          value={props.SelectValue}
          inputValue={inputNumValue}
          onInputChange={(value) => onCreatableInputChange(value)}
          menuPlacement={props.menuPlacement || "auto"}
          // @ts-ignore
          onChange={(val: { value: string; label: string }[]) => props.onChange(onCreatableCheckValue(val), props.id)}
        />
      ) : (
        <Select
          filterOption={createFilter({ ignoreCase: true, ignoreAccents: true, trim: true })}
          placeholder={props.placeholder || "Выберите из списка..."}
          components={{ NoOptionsMessage, LoadingMessage, LoadingIndicator }}
          styles={customStyles}
          {...props}
          options={filteredOption.filter((item, index) => index < 50)}
          value={props.SelectValue}
          closeMenuOnSelect={!props.isMulti}
          onInputChange={(value) => {
            if (props.isSearchable)
              setFilteredOption(
                props.options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()))
              );
          }}
          // @ts-ignore
          onChange={(val: { value: string; label: string }[]) => props.onChange(val, props.id)}
          isLoading={props.isLoading}
          menuPlacement={props.menuPlacement || "auto"}
        />
      )}
      {props.errorMsg ? <ErrorBlock>{props.errorMsg}</ErrorBlock> : null}
    </div>
  );
};

const ErrorBlock = styled.div`
  margin-top: 8px;
  color: ${theme.colors.lightRed};
`;
