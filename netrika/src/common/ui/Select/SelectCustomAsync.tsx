import { IOrderQualityCriterion } from "../../interfaces/order/IOrderQualityCriterion";
import React, { useState } from "react";
import { useCustomSelect } from "./hooks/useCustomSelect";
import { useLoadOptions } from "./hooks/useLoadOptions";
import { AsyncPaginate } from "react-select-async-paginate";
import { IPropsCustomSelect } from "./CustomSelect";
import { useSelectComponents } from "./hooks/useSelectComponents";
import { IConfiguratorValue } from "../../interfaces/IConfiguratorValue";
import { LabelStyle } from "../Input/styles/labelStyles";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface IConstructorItem {
  value: string;
  key: string;
}

interface IProps extends Omit<IPropsCustomSelect, "id"> {
  withPaginateApiCallback?: (params: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }) => Promise<IConfiguratorValue[]>;
  withPaginateConstructorDictionary?: (params: {
    pageIndex: number;
    pageSize: number;
    search: string;
    id?: string;
  }) => Promise<IConfiguratorValue[]>;
  withPaginateConstructorRegisterQualityCriterion?: (params: {
    registerId: string;
    pageIndex: number;
    pageSize: number;
    searchName: string;
  }) => Promise<IOrderQualityCriterion[]>;
  withPaginateConstructorApiCallback?: (params: {
    pageIndex: number;
    pageSize: number;
    search: string;
    id: string;
  }) => Promise<IConstructorItem[]>;
}

export const SelectCustomAsync: React.FC<IProps> = (props) => {
  const customStyles = useCustomSelect({
    isError: props.isError,
    isDisabled: props.isDisabled,
    isRelative: props.isRelative,
    isLongSingle: props.isLongSingle,
  });
  const [asyncError, setAsyncError] = useState<boolean>(false);
  const loadOptions = useLoadOptions({
    withPaginateApiCallback: props.withPaginateApiCallback,
    withPaginateConstructorApiCallback: props.withPaginateConstructorApiCallback,
    withPaginateConstructorRegisterQualityCriterion: props.withPaginateConstructorRegisterQualityCriterion,
    withPaginateConstructorDictionary: props.withPaginateConstructorDictionary,
    fieldID: props.fieldID,
    setAsyncError: setAsyncError,
  });
  const { NoOptionsMessage, LoadingMessage, LoadingIndicator } = useSelectComponents(asyncError);

  return (
    <div style={props.styleContainer} id={props.htmlID} className={props.className}>
      {props.label ? (
        <LabelStyle error={props.isError} isRequired={props.isRequired}>
          {props.label}
        </LabelStyle>
      ) : null}
      <AsyncPaginate
        {...props}
        debounceTimeout={400}
        value={props.SelectValue}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        styles={customStyles}
        placeholder={props.placeholder ? props.placeholder : "Выберите из списка..."}
        options={props.options}
        components={{ LoadingIndicator, NoOptionsMessage, LoadingMessage }}
      />
      {props.errorMsg ? <ErrorBlock>{props.errorMsg}</ErrorBlock> : null}
    </div>
  );
};

const ErrorBlock = styled.div`
  margin-top: 8px;
  color: ${theme.colors.lightRed};
`;
