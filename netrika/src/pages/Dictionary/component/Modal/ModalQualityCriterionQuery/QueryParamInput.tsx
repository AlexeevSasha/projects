import { theme } from "common/styles/theme";
import React from "react";
import styled from "styled-components";

interface IProps {
  onChange: (value: string) => void;
  value?: string;
  error?: boolean;
  className?: string;
}

export const QueryParamInput: React.FC<IProps> = React.memo(({ onChange, value, error, className }) => {
  return (
    <Input
      className={className}
      defaultValue={value}
      error={error}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
});

const Input = styled.input<{ error?: boolean }>`
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 5px;
  border-color: ${({ error }) => (error ? theme.colors.lightRed : theme.colors.gray)};
  line-height: 30px;
  outline: 0;
  padding: 5px;
  height: 30px;
  &:focus {
    border-color: ${theme.colors.grayBlue};
  }
`;
