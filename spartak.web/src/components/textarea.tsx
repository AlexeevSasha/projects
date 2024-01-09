import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { theme } from "../assets/theme/theme";

type Props = Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & {
  label?: string | JSX.Element;
  error?: string | string[];
  lightStyle?: boolean;
};

export const Textarea = ({ label, error, ...props }: Props) => {
  return (
    <Container>
      <Label lightStyle={props.lightStyle}>
        {label} {props.required && " *"}
      </Label>

      <InputWrapper>
        <Field {...props} error={!!error} value={props.value || ""} />
      </InputWrapper>

      {error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;
`;

const Field = styled.textarea<{ error?: boolean }>`
  outline: none;
  width: 100%;
  font-size: 0.83vw;
  color: ${theme.colors.grayDark};
  background: #f6f8fa;
  border: 0.05vw solid;
  border-color: ${({ error }) => theme.colors[error ? "red" : "grayLight"]};
  box-sizing: border-box;
  align-self: center;
  padding: 0.625vw 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    padding: 1.56vw 2.08w;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    width: 100%;
    padding: 3.2vw 4.26vw;
  }

  &::placeholder {
    font-family: "Roboto";
    color: #a5acb8;
  }
`;

const Label = styled.div<{ lightStyle?: boolean }>`
  font-family: "Roboto";
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

const Error = styled.div`
  font-family: "Roboto";
  color: ${theme.colors.red};
  font-size: 0.73vw;
  margin-bottom: -1.05vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    margin-bottom: -2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-bottom: -5.33vw;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
