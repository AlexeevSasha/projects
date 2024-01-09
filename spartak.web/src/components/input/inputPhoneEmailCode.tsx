import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import down from "../../assets/icon/down.svg";
import { Input } from "./input";
import { InputEmail } from "./inputEmail";
import PhoneInput from "react-phone-input-2";

interface IProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  icon?: JSX.Element;
  label?: string | JSX.Element;
  error?: string;
  lightStyle?: boolean;
  paddingPosition?: "right" | "left";
  phoneWithoutFlag?: boolean;
  capture?: boolean | "user" | "environment";
}

export const InputPhoneEmailCode = forwardRef<HTMLInputElement, IProps>(
  ({ label, onChange, value, lightStyle, error, onBlur, icon, paddingPosition, phoneWithoutFlag, ...props }, ref) => {
    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.target.value;
      setIsEmail(false);
      setIsPhone(false);

      if (parseInt(currentValue as string) > 10 && currentValue?.toString().startsWith("+")) setIsPhone(true);
      else {
        if (currentValue.match(/\d*/)?.[0].length !== currentValue.length && currentValue.toString().length > 2) {
          setIsEmail(true);
        }
      }

      onChange?.(event);
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.target.value;
      if (currentValue.length <= 3) setIsEmail(false);
      onChange?.(event);
    };

    useEffect(() => {
      if (error) {
        setIsEmail(false);
        setIsPhone(false);
      }
    }, [error]);

    return (
      <Container>
        <Label lightStyle={lightStyle}>
          {label} {props.required && " *"}
        </Label>

        <InputWrapper lightStyle={lightStyle} error={!!error} phoneWithoutFlag={phoneWithoutFlag}>
          {isPhone ? (
            <>
              <PhoneInput
                country="ru"
                inputProps={{ ...props, autoFocus: true, ref: ref || {} }}
                onChange={(value) => {
                  parseInt(value.toString()) < 10
                    ? onValueChange({ target: { value: value } } as React.ChangeEvent<HTMLInputElement>)
                    : onChange?.({ target: { value: value } } as React.ChangeEvent<HTMLInputElement>);
                }}
                value={value as string}
                onBlur={onBlur}
                countryCodeEditable={true}
              />
              <IconContainer paddingPosition={paddingPosition}>{icon}</IconContainer>
            </>
          ) : isEmail ? (
            <InputEmail
              onChange={onEmailChange}
              onBlur={onBlur}
              value={value}
              autoFocus
              {...props}
              error={error}
              lightStyle={lightStyle}
              icon={icon}
              paddingPosition={paddingPosition}
            />
          ) : (
            <Input
              onChange={onValueChange}
              onBlur={onBlur}
              value={value}
              autoFocus
              {...props}
              error={error}
              lightStyle={lightStyle}
              icon={icon}
              paddingPosition={paddingPosition}
            />
          )}
        </InputWrapper>
      </Container>
    );
  }
);

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;
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

const InputWrapper = styled.div<{ lightStyle?: boolean; error?: boolean; phoneWithoutFlag?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  & > .react-tel-input {
    & > input.form-control {
      background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
      -webkit-text-fill-color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
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
      ${(props) => props.phoneWithoutFlag && "padding: 0 2.5vw 0 0.83vw"};
      /* z-index: -1; */

      &:disabled {
        -webkit-text-fill-color: ${({ theme }) => theme.colors.white_black}!important;
        color: ${({ theme }) => theme.colors.white_black}!important;
      }

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-left: 64px;
        border-width: 0.2vw;
        height: 6.25vw;
        font-size: 2.09vw;
      }

      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        height: 12.8vw;
        font-size: 4.27vw;
      }
    }

    & > div.flag-dropdown {
      ${(props) => props.phoneWithoutFlag && "display: none"};
      background: transparent;
      -webkit-text-fill-color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
      color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
      border: 0;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        border-width: 0.2vw;
      }

      & > .selected-flag {
        @media screen and (max-width: ${theme.rubberSize.desktop}) {
          padding-left: 14px;
        }

        @media screen and (max-width: ${theme.rubberSize.tablet}) {
          padding-left: 14px;
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

const IconContainer = styled.div<{ paddingPosition?: "right" | "left" }>`
  position: absolute;
  transform: translate(50%, -50%);
  top: 50%;
  right: ${({ paddingPosition }) => paddingPosition === "right" && 0};

  & > svg {
    display: block;
  }
`;
