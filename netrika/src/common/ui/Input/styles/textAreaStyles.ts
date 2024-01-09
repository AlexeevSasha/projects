import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const TextAreaStyle = styled.textarea<{ error?: boolean }>`
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  border: 1px solid ${(props) => (props.error ? theme.colors.lightRed : theme.colors.gray)};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  resize: vertical;
  width: 100%;
  min-height: 38px;
  max-height: 350px;
  height: 38px;
  overflow-y: auto;

  &:focus {
    border-color: ${(props) => (props.error ? theme.colors.lightRed : theme.colors.green)};
  }

  &::placeholder {
    color: ${(props) => (props.error ? theme.colors.lightRed : "rgba(96, 120, 144, 0.5)")} !important;
    opacity: 1;
  }
`;
