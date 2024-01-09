import React, { useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import DatePicker, { DatePickerProps as Props } from "react-date-picker/dist/entry.nostyle";
import styled from "styled-components";
import { CalendarIcon } from "../../assets/icon/calendarIcon";
import { IThemeColors, theme } from "../../assets/theme/theme";

export type DatePickerProps = Props & {
  label?: string | JSX.Element;
  error?: string;
  showError?: boolean;
  className?: string;
  onBlur?: () => void;
  position?: string;
  placeholder?: string;
  lightStyle?: boolean;
  colorText?: IThemeColors;
  inputRef?: (ref: HTMLInputElement | null) => void;
  isStadiumForm?: boolean;
};

export const InputDate = ({
  label,
  error,
  showError,
  onBlur,
  value,
  className,
  required,
  placeholder,
  locale = "ru",
  inputRef,
  ...props
}: DatePickerProps) => {
  const inputGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputGroupRef.current) {
      const inputGroup = inputGroupRef.current.getElementsByClassName("react-date-picker__inputGroup")[0];
      const field = inputGroup.firstElementChild;
      // Для того что-бь не открывался второй календарь на мобильном
      field && ((field as HTMLInputElement).type = "text");
    }
  }, [inputGroupRef.current]);

  return (
    <Container className={className}>
      <Label lightStyle={props.lightStyle}>
        {label} {required && <span>*</span>}
      </Label>

      <div tabIndex={0} onBlur={onBlur} ref={inputGroupRef}>
        <Picker
          locale={locale}
          format="dd.MM.yyyy"
          clearIcon={null}
          calendarIcon={<CalendarIcon />}
          showLeadingZeros
          dayPlaceholder={placeholder || ""}
          monthPlaceholder={""}
          yearPlaceholder={""}
          value={value ? new Date(value as Date) : undefined}
          error={!!error}
          inputRef={inputRef}
          openCalendarOnFocus={false}
          colorText={props.colorText}
          {...props}
        />
      </div>

      {error && showError && <Error isStadiumForm={props.isStadiumForm}>{error}</Error>}
    </Container>
  );
};

const Container = styled.label`
  display: block;

  & > div:nth-child(2) {
    appearance: unset;
    outline: none;
  }
`;

const Picker = styled(DatePicker)<{
  position?: string;
  lightStyle?: boolean;
  error?: boolean;
  colorText?: IThemeColors;
}>`
  font-weight: inherit;
  font-size: inherit;
  width: 100%;

  & > .react-date-picker__wrapper {
    height: 2.5vw;
    font-size: 0.83vw;
    border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
    color: ${({ lightStyle, colorText }) => theme.colors[lightStyle ? "black" : colorText ? colorText : "white"]};
    outline: none;
    flex-shrink: 1;

    &::placeholder {
      color: ${theme.colors.gray};
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      border-width: 0.2vw;
      height: 6.25vw;
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 12.8vw;
      font-size: 4.27vw;
    }
  }

  & .react-date-picker__inputGroup {
    padding-left: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-left: 3.74vw;
    }
  }

  & .react-date-picker__calendar {
    width: 100%;
    min-width: 250px;
    z-index: 100;
  }

  & .react-calendar {
    width: 100%;
    border: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
  }

  & .react-calendar__navigation__label {
    color: ${theme.colors.red};
  }

  .react-calendar__navigation__arrow {
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  }

  .react-calendar__navigation__arrow:disabled {
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "gray" : "black"]};
    color: ${theme.colors.grayDark};
    cursor: not-allowed;
  }

  & .react-calendar__tile {
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  }

  & .react-calendar__tile:disabled {
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "gray" : "black"]};
    color: ${theme.colors.grayDark};
    cursor: not-allowed;
  }

  & .react-calendar button:enabled:hover {
    color: ${theme.colors.black};
  }

  & .react-calendar__tile--active {
    background: ${theme.colors.red};
    color: ${theme.colors.white};
  }

  & .react-calendar__tile--now {
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "redOpacity" : "black"]};
  }

  & .react-date-picker__calendar-button.react-date-picker__button {
    font-size: 1.25vw;
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.12vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }

  & .react-date-picker__inputGroup__leadingZero {
    display: inline-block;
    color: ${({ lightStyle, colorText }) => theme.colors[lightStyle ? "black" : colorText ? colorText : "white"]};
  }

  & .react-date-picker__inputGroup__input {
    color: ${({ lightStyle, colorText }) => theme.colors[lightStyle ? "black" : colorText ? colorText : "white"]};
    outline: none;

    &:invalid {
      background: transparent;
    }

    &.react-date-picker__inputGroup__day::placeholder {
      color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
    }
  }

  & .react-date-picker__clear-button.react-date-picker__button {
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  }

  & .react-calendar__month-view__weekdays__weekday {
    color: ${theme.colors.red};
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

const Error = styled.div<{ isStadiumForm?: boolean }>`
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.red};
  font-size: 0.73vw;
  margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? "-1.095vw" : "-1.05vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? "-2.632vw" : "-2.61vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-bottom: ${({ isStadiumForm }) => (isStadiumForm ? 0 : "-5.33vw")};
  }
`;
