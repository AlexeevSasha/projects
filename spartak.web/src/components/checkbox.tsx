import React from "react";
import styled from "styled-components";
import { theme } from "../assets/theme/theme";
import { Error } from "./input/input";

export interface ICheckboxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | JSX.Element;
  styles?: { [key: string]: string };
  labelLeft?: boolean;
  position?: "left" | "right";
  error?: string | string[];
  isStadiumForm?: boolean;
  lightStyle?: boolean;
}

export const Checkbox = ({
  label,
  position,
  checked = false,
  title,
  lightStyle,
  error,
  isStadiumForm,
  ...props
}: ICheckboxProps) => {
  return (
    <Container>
      <CheckBoxBlock title={title} position={position} error={!!error}>
        <Label lightStyle={lightStyle}>{label}</Label>

        <input {...props} checked={checked} type="checkbox" />

        <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {checked ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 1C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1H3ZM15.7788 6.62721C16.1252 6.19706 16.0574 5.56755 15.6272 5.22115C15.1971 4.87475 14.5675 4.94264 14.2212 5.37279L8.48965 12.49L5.7194 9.62081C5.33578 9.2235 4.70271 9.21239 4.3054 9.59601C3.90809 9.97963 3.89699 10.6127 4.2806 11.01L7.83817 14.6946C8.03748 14.901 8.31585 15.0119 8.6025 14.999C8.88915 14.9861 9.15645 14.8507 9.33642 14.6272L15.7788 6.62721Z"
              fill="#CC122D"
            />
          ) : (
            <rect x="1" y="1" width="18" height="18" rx="1" stroke="#A5ACB8" strokeWidth="2" />
          )}
        </svg>
      </CheckBoxBlock>
      {error && <Error isStadiumForm={isStadiumForm}>{error}</Error>}
    </Container>
  );
};

const Container = styled.label`
  display: flex;
  flex-direction: column;
`;

const CheckBoxBlock = styled.label<{ position?: "left" | "right"; error?: boolean }>`
  display: flex;
  align-items: center; //flex-start;
  flex-direction: row-reverse;
  width: fit-content;
  cursor: pointer;
  font-size: 1vw;
  color: ${theme.colors.red};
  margin-bottom: ${({ error }) => (error ? "2px" : 0)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.6vw;
    margin-bottom: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 5.33vw;
  }

  & > input {
    visibility: hidden;
    width: 0;
    margin: 0;
  }

  & > svg {
    flex-shrink: 0;
    font-size: 1vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }
`;

const Label = styled.div<{ lightStyle?: boolean }>`
  padding: 0 0.5vw;
  font-size: 0.83vw;
  line-height: 0.94vw;
  flex-shrink: 1;
  flex-grow: 0;
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "grayDark" : "gray"]};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 1.5vw;
    font-size: 2.08vw;
    line-height: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 3vw;
    font-size: 4.26vw;
    line-height: 5.33vw;
  }
`;
