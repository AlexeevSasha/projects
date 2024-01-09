import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";
import { IInput } from "../interface/IInput";

export const InputStyle = styled.input<Pick<IInput, "error" | "fullWidth" | "width">>`
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  border: 1px solid ${(props) => (props.error ? theme.colors.lightRed : theme.colors.gray)};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};

  &:focus {
    border-color: ${(props) => (props.error ? theme.colors.lightRed : theme.colors.green)};
  }

  &::placeholder {
    color: ${(props) => (props.error ? theme.colors.lightRed : "rgba(96, 120, 144, 0.5)")} !important;
    opacity: 1;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;
