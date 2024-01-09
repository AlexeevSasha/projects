import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import down from "../../assets/icon/down.svg";

type Props = PhoneInputProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string | JSX.Element;
    lightStyle?: boolean;
    error?: string | string[];
    isStadiumForm?: boolean;
  };

export const InputPhone = forwardRef<HTMLInputElement, Props>(
  ({ label, onChange, value, lightStyle, error, onBlur, isStadiumForm, ...props }, ref) => {
    return (
      <Container>
        <Label lightStyle={lightStyle}>
          {label} {props.required && " *"}
        </Label>

        <InputWrapper lightStyle={lightStyle} error={!!error} isStadiumForm={isStadiumForm}>
          <PhoneInput
            country="ru"
            inputProps={{ ...props, ref: ref || {} }}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            disabled={props.disabled}
            countryCodeEditable={true}
          />
        </InputWrapper>

        {error && <Error isStadiumForm={isStadiumForm}>{error}</Error>}
      </Container>
    );
  }
);

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;

  /* z-index: 4; */
`;

const Label = styled.div<{ lightStyle?: boolean }>`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  line-height: 1.24vw;
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "grayDark" : "gray"]};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.33vw;
  }
`;

const InputWrapper = styled.div<{ lightStyle?: boolean; error?: boolean; isStadiumForm?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  & > .react-tel-input {
    & > input.form-control {
      ${({ isStadiumForm }) => isStadiumForm && "padding-left: 3.65vw"};
      background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
      -webkit-text-fill-color: ${({ lightStyle, isStadiumForm }) =>
        theme.colors[lightStyle ? "black" : isStadiumForm ? "gray" : "white"]};
      color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
      border: 0.05vw solid;
      border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
      width: 100%;
      font-size: 0.83vw;
      height: 2.5vw;
      border-radius: 0;
      appearance: unset;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      /* z-index: -1; */

      &:disabled {
        -webkit-text-fill-color: ${({ theme }) => theme.colors.white_black}!important;
        color: ${({ theme }) => theme.colors.white_black}!important;
      }

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-left: ${({ isStadiumForm }) => (isStadiumForm ? "9.13vw" : "64px")};
        border-width: 0.2vw;
        height: 6.25vw;
        font-size: 2.09vw;
      }

      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        ${({ isStadiumForm }) => isStadiumForm && "padding-left: 70px"};
        height: 12.8vw;
        font-size: 4.27vw;
      }
    }

    & > div.flag-dropdown {
      background: transparent;
      -webkit-text-fill-color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
      color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
      border: 0;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        border-width: 0.2vw;
      }

      & > .selected-flag {
        ${({ isStadiumForm }) => isStadiumForm && "padding-left: 0.87vw"};
        @media screen and (max-width: ${theme.rubberSize.desktop}) {
          padding-left: ${({ isStadiumForm }) => (isStadiumForm ? "2.9vw" : "14px")};
        }

        @media screen and (max-width: ${theme.rubberSize.tablet}) {
          padding-left: ${({ isStadiumForm }) => (isStadiumForm ? "4.27vw" : "14px")};
        }
      }

      & > .selected-flag > div.flag {
        @media screen and (max-width: ${theme.rubberSize.desktop}) {
          transform: scale(1.5);
        }

        & > div.arrow {
          display: none;
        }

        &::after {
          content: "";
          background-image: url(${down.src});
          width: 20px;
          height: 20px;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      & > .selected-flag.open > div.flag::after {
        transform: translateY(-50%), rotate(180deg);
      }

      & > .selected-flag:hover,
      & > .selected-flag:focus,
      & > .selected-flag.open {
        background: transparent;
      }
    }

    & > div.flag-dropdown > ul.country-list {
      background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};

      & > li.country {
        &:hover,
        &.highlight {
          background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
        }
      }
    }
  }
`;

const Error = styled.div<{ isStadiumForm?: boolean }>`
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.red};
  font-size: 0.73vw;
  ${({ isStadiumForm }) => isStadiumForm && "margin-top: 0.21vw"};
  margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? "-1.095vw" : "-1.05vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    ${({ isStadiumForm }) => isStadiumForm && "margin-top: 0.52vw"};
    margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? "-2.632vw" : "-2.61vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    ${({ isStadiumForm }) => isStadiumForm && "margin-top: 1.07vw"};
    margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? 0 : "-5.33vw")};
  }
`;
