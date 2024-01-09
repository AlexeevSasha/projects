import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { InputStyle } from "./styles/inputStyles";
import { IInput } from "./interface/IInput";
import { LabelStyle } from "./styles/labelStyles";
import { generateId } from "../../helpers/generateId";

interface IProps extends IInput {
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  styleContainer?: React.CSSProperties;
}

export const Input = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { label, isRequired, errorMsg, styleContainer, id = `input-${generateId()}`, ...attr } = props;

  return (
    <Container style={styleContainer} width={attr.width} fullWidth={attr.fullWidth}>
      {label ? (
        <LabelStyle isRequired={isRequired} error={attr.error} htmlFor={id}>
          {label}
        </LabelStyle>
      ) : null}
      <InputStyle id={id} ref={ref} {...attr} />
      {errorMsg ? <ErrorBlock>{errorMsg}</ErrorBlock> : null}
    </Container>
  );
});

const Container = styled.div<Pick<IInput, "fullWidth" | "width">>`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const ErrorBlock = styled.div`
  margin-top: 8px;
  color: ${theme.colors.lightRed};
`;
