import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

export const LabelStyle = styled.label<{ error?: boolean; isRequired?: boolean }>`
  display: inline-block;
  font-weight: 600;
  margin: 0 0 8px 3px;
  color: ${({ error }) => (error ? theme.colors.lightRed : theme.colors.black)};

  ${(props) =>
    props.isRequired &&
    css`
      &:after {
        position: relative;
        content: "*";
        margin-left: 2px;
        color: ${props.error ? theme.colors.lightRed : "red"};
      }
    `}
`;
