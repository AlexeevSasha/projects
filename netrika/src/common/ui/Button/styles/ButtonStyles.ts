import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";
import { IButton } from "../interfaces/IButton";

export const ButtonStyles = styled.button<Pick<IButton, "color" | "fullWith">>`
  position: relative;
  border-radius: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  border: 1px solid ${theme.colors.green};
  background: transparent;
  color: ${theme.colors.green};
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
  padding: 10px 20px;

  &:hover {
    opacity: 0.8;
  }

  ${({ color }) =>
    color === "primary"
      ? css`
          background: ${theme.colors.green};
          color: ${theme.colors.white};
        `
      : css``};

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid ${theme.colors.gray};
      background: ${theme.colors.gray};
      color: ${theme.colors.hightGray};
      pointer-events: none;
    `};

  ${({ fullWith }) =>
    fullWith &&
    css`
      width: 100%;
    `};
`;
