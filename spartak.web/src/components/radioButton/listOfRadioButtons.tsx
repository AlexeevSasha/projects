import { useRouter } from "next/router";
import React, { BaseSyntheticEvent } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { RadioIcon } from "../../assets/icon/radioIcon";
import { theme } from "../../assets/theme/theme";

interface IProps {
  value?: string;
  label?: string | JSX.Element;
  error?: string | string[];
  options: { value: string; label: string }[];
  changeValue: (newInputType: string, event?: BaseSyntheticEvent) => void;
  lightStyle?: boolean;
  onBlur?: () => void;
  className?: string;
}

export const ListOfRadioButtons = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  const handleChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value;
    props.changeValue(value, event);
  };

  return (
    <Container className={props.className}>
      <Label lightStyle={props.lightStyle}>{props.label}</Label>

      <RadioInputsBlock tabIndex={0} onBlur={props.onBlur}>
        {props.options.map((elem) => (
          <RadioBlock key={elem.label}>
            <RadioLabel lightStyle={props.lightStyle}>
              <RadioInput
                checked={props.value === elem.value}
                value={elem.value}
                onChange={handleChange}
                type="radio"
              />

              <RadioIcon selected={props.value === elem.value} />

              <span>{lang[locale].form.radioInput[elem.label]}</span>
            </RadioLabel>
          </RadioBlock>
        ))}
      </RadioInputsBlock>

      {props?.error && <Error>{props.error}</Error>}
    </Container>
  );
};

const Container = styled.label`
  display: block;
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ lightStyle?: boolean }>`
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  cursor: pointer;
  font-size: 0.83vw;
  line-height: 1.2em;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }

  & > span {
    padding: 0 0.5vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 0 1.5vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 0 3vw;
    }
  }

  & > svg {
    font-size: 1vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }
`;

const RadioInputsBlock = styled.div`
  display: flex;
  outline: none;
`;

const RadioBlock = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 2.08vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-right: 5.21vw;
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-right: 10.66vw;
    }
  }
`;

const Error = styled.span`
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.red};
  font-size: 0.83vw;
  margin-bottom: -1.05vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-bottom: -2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-bottom: -5.33vw;
  }
`;

const Label = styled.div<{ lightStyle?: boolean }>`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  line-height: 1.24vw;
  margin-bottom: 0.625vw;
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "grayDark" : "gray"]};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.6vw;
    margin-bottom: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.33vw;
    margin-bottom: 3.2vw;
  }
`;
