import { Select, SelectProps } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import React from "react";
import styled from "styled-components";

const { Option } = Select;

export type SelectFieldOption<T = any> = DefaultOptionType & {
  [K in keyof T]?: T[K];
};

type Props = SelectProps & {
  options: SelectFieldOption[];
};

export const SelectField = ({ options, ...props }: Props) => {
  return (
    <Container>
      <Select
        getPopupContainer={(trigger) => trigger.parentNode}
        filterOption={(input, option: BaseOptionType | undefined) =>
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        showSearch
        {...props}
      >
        {options.map(({ value, label }, i) => (
          <Option key={value + `${i}`} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

const Container = styled.div``;
