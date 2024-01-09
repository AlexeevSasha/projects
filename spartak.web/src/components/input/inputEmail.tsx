import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import emailMask from "text-mask-addons/dist/emailMask";

interface IProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  label?: string | JSX.Element;
  error?: string | string[];
  lightStyle?: boolean;
  paddingPosition?: "right" | "left";
  icon?: JSX.Element;
  capture?: boolean | "user" | "environment";
}

export const InputEmail = forwardRef<MaskedInput, IProps>(({ label, error, paddingPosition, icon, ...props }, ref) => {
  return (
    <Container>
      <Label lightStyle={props.lightStyle}>
        {label} {props.required && " *"}
      </Label>

      <InputWrapper>
        <IconContainer paddingPosition={paddingPosition}>{icon}</IconContainer>
        <MaskedInputStyled mask={emailMask} error={!!error} {...props} ref={ref} value={props.value || ""} autoFocus />
      </InputWrapper>

      {error && <Error>{error}</Error>}
    </Container>
  );
});

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;
`;

interface IPropsInput {
  error?: boolean;
  lightStyle?: boolean;
  paddingPosition?: "right" | "left";
}
export const MaskedInputStyled = styled(MaskedInput)<IPropsInput>`
  outline: none;
  box-sizing: border-box;
  font-size: 0.83vw;
  width: 100%;
  height: 2.5vw;
  border: 0.05vw solid;
  border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
  padding-right: ${({ paddingPosition }) => (paddingPosition === "right" ? "2.5vw" : "0.83vw")};
  padding-left: ${({ paddingPosition }) => (paddingPosition === "left" ? "2.05vw" : "0.83vw")};
  background-color: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
  -webkit-text-fill-color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  border-radius: 0;
  appearance: unset;
  font-family: "Roboto", sans-serif;
  font-weight: 400;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border-width: 0.2vw;
    height: 6.25vw;
    font-size: 2vw;
    padding-right: ${({ paddingPosition }) => (paddingPosition === "right" ? "6.05vw" : "2.09vw")};
    padding-left: ${({ paddingPosition }) => (paddingPosition === "left" ? "6.05vw" : "2.09vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 12.8vw;
    font-size: 4.27vw;
    padding-right: ${({ paddingPosition }) => (paddingPosition === "right" ? "12.5vw" : "3.74vw")};
    padding-left: ${({ paddingPosition }) => (paddingPosition === "left" ? "12.5vw" : "3.74vw")};
  }

  &:disabled {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.grayDark_gray1};
    color: ${({ theme }) => theme.colors.grayDark_gray1};
  }

  &::placeholder {
    -webkit-text-fill-color: ${theme.colors.grayDark1};
    color: ${theme.colors.grayDark1};
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

export const Error = styled.div`
  font-family: "Roboto", sans-serif;
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

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
