import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  type: "red" | "opacity";
  withGap?: boolean;
  disabled?: boolean;
}

export const CustomButton = styled.div<IProps>`
  border: 1px solid
    ${({ type, disabled, ...props }) =>
      disabled
        ? theme.colors.grayDark
        : type === "opacity"
        ? props.theme.colors.white_red
        : theme.colors.fireEngineRed};
  background-color: ${({ type, disabled }) =>
    type === "opacity" ? "none" : disabled ? theme.colors.grayDark : theme.colors.fireEngineRed};
  color: ${({ disabled, type, ...props }) =>
    disabled ? theme.colors.gray : type === "opacity" ? props.theme.colors.white_red : theme.colors.white};

  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${(props) => (props.withGap ? "0.52vw" : "0")};
  align-items: center;
  height: fit-content;
  justify-content: center;

  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;
  font-weight: 600;
  letter-spacing: 0.1px;
  text-transform: uppercase;

  padding: 0.78vw 1.25vw;
  cursor: pointer;
  visibility: visible;
  -webkit-transition: 0.5s;
  transition: 0.5s;

  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.96vw 3.13vw;
    grid-column-gap: ${(props) => (props.withGap ? "1.3vw" : "0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 2.93vw 4.27vw;
    grid-column-gap: ${(props) => (props.withGap ? "2.67vw" : "0")};
  }
`;
