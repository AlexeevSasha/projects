import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import { IconEyeClosed } from "../../assets/icon/iconEyeClosed";
import { IconEyeOpen } from "../../assets/icon/iconEyeOpen";
import { theme } from "../../assets/theme/theme";

interface IProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> {
  icon?: JSX.Element;
  label?: string | JSX.Element;
  error?: string;
  lightStyle?: boolean;
  paddingPosition?: "right" | "left";
  isStadiumForm?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  ({ icon, label, error, isStadiumForm, paddingPosition, ...props }, ref) => {
    const [type, setType] = useState(props.type);

    return (
      <Container id="input-container">
        <Label lightStyle={props.lightStyle}>
          {label} {props.required && " *"}
        </Label>

        <InputWrapper>
          <IconContainer paddingPosition={paddingPosition}>{icon}</IconContainer>

          <InputStyle
            error={!!error}
            {...props}
            ref={ref}
            type={type}
            value={props.value || ""}
            isStadiumForm={isStadiumForm}
          />

          {props.type === "password" && (
            <HideShowEye lightStyle={props.lightStyle} onClick={() => setType(type === "text" ? "password" : "text")}>
              {type === "text" ? <IconEyeOpen /> : <IconEyeClosed />}
            </HideShowEye>
          )}
        </InputWrapper>

        {error?.replaceAll(" ", "") && <Error isStadiumForm={isStadiumForm}>{error}</Error>}
      </Container>
    );
  }
);

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;
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

interface IPropsInput {
  error?: boolean;
  lightStyle?: boolean;
  paddingPosition?: "right" | "left";
  isStadiumForm?: boolean;
}
export const InputStyle = styled.input<IPropsInput>`
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
  -webkit-text-fill-color: ${({ lightStyle, isStadiumForm }) =>
    theme.colors[lightStyle ? "black" : isStadiumForm ? "gray" : "white"]};
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

  &[type="date"] {
    cursor: pointer;
    font-size: 0.83vw;
    border: 0.05vw solid ${theme.colors.grayDark};
    box-sizing: border-box;
    padding: 0.597vw 0.83vw;
    border: ${(props) => (props.error ? `0.05vw solid ${theme.colors.red}` : `0.05vw solid ${theme.colors.grayDark}`)};

    ::-webkit-calendar-picker-indicator {
      background: url("/images/profile/CalendarBlank.svg") no-repeat center;
      background-size: contain;
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.27vw;
      margin-bottom: 3.2vw;
      padding: 3.045vw 4.27vw;
    }
  }
`;

export const Error = styled.div<{ isStadiumForm?: boolean }>`
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

const HideShowEye = styled.span<{ lightStyle?: boolean }>`
  position: absolute;
  font-size: 1.25vw;
  right: 0.63vw;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "gray"]};
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 1.56vw;
    font-size: 3.12vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 3.2vw;
    font-size: 6.4vw;
  }
`;
