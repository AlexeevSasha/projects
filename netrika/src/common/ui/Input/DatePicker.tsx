import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createGlobalStyle, css } from "styled-components";
import { theme } from "../../styles/theme";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);

interface IProps {
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  error?: boolean;
  defaultValue?: Date;
  disabled?: boolean;
  value?: Date | null;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  showQuarterYearPicker?: boolean;
  onChange: (date: Date | null) => void;
  showTimeInput?: boolean;
  placeholderText?: string;
}

export const DatePicker = ({
  id = "DatePicker",
  value,
  dateFormat = "dd/MM/yyyy",
  showQuarterYearPicker = false,
  showYearPicker = false,
  showMonthYearPicker = false,
  startDate,
  endDate,
  minDate,
  selectsEnd,
  selectsStart,
  onChange,
  error,
  disabled,
  showTimeInput = false,
  placeholderText = "",
}: IProps) => {
  return (
    <>
      <ReactDatePicker
        id={id}
        yearItemNumber={20}
        isClearable={!disabled}
        placeholderText={placeholderText}
        showMonthYearPicker={showMonthYearPicker}
        showQuarterYearPicker={showQuarterYearPicker}
        showYearPicker={showYearPicker}
        locale={"ru"}
        wrapperClassName="date_picker full-width"
        dateFormat={dateFormat}
        selected={value}
        onChange={(date: Date | null) => onChange(date)}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        selectsEnd={selectsEnd}
        selectsStart={selectsStart}
        showTimeInput={showTimeInput}
        timeInputLabel={"Время:"}
        readOnly={!!disabled}
      />
      <DatePickerWrapperStyles error={error} disabled={disabled} />
    </>
  );
};
const DatePickerWrapperStyles = createGlobalStyle<{
  maxWidth?: string;
  error?: boolean;
  disabled?: boolean;
  inputTimeWidth?: string;
}>`
    .react-datepicker {
      z-index: 99999 !important;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.189);
      border-color:  ${theme.colors.green} !important;

      .react-datepicker__triangle { display: none}

      .react-datepicker__navigation {
      color:${theme.colors.green} !important ;

        :hover {
             .react-datepicker__navigation-icon::before {
               border-color:  ${theme.colors.hightBlue} !important;
              }
       }
      .react-datepicker__navigation-icon::before {
       border-color:  ${theme.colors.green} !important;
      }
      }

    }

    .react-datepicker__header {
      background-color: ${theme.colors.oceanic} !important;
      border-bottom: 1px solid ${theme.colors.green} !important;
    }




    .react-datepicker__year-read-view--down-arrow,
     .react-datepicker__month-read-view--down-arrow,
      .react-datepicker__month-year-read-view--down-arrow,
       .react-datepicker__navigation-icon::before {
       color: ${theme.colors.green} !important;
       }

   .react-datepicker-popper {
        z-index: 9999 !important;

        .react-datepicker__year-select,
        .react-datepicker__month-select {
        border-radius: 5px;
        }
        // стили  текущей даты.
        .react-datepicker__day--today,
        .react-datepicker__year-text--today,
        .react-datepicker__quarter-text--today,
        .react-datepicker__quarter-text--today,
        .react-datepicker__month-text--today,
        .react-datepicker__quarter-text--today
         {
            font-weight: normal;
            border: 1px solid ${theme.colors.green};
            border-radius: 0.3rem;
        }

        // стили не выбранного предыдущего диапозона даты.
         .react-datepicker__day--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range),
            .react-datepicker__day--in-range {
              color: black;
              background-color:${theme.colors.oceanic} ;
          }


        // стили выбранной даты.
        .react-datepicker__day.react-datepicker__day--selected ,
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__year-text--selected,
        .react-datepicker__quarter-text--selected,
         .react-datepicker__month-text--selected,
         .react-datepicker__month--selected,
         .react-datepicker__year-text--keyboard-selected,
         .datepicker__month-text--keyboard-selected,
         .react-datepicker__quarter-text--keyboard-selected,
         .react-datepicker__day--in-selecting-range,
          .react-datepicker__day--in-range {
         color: ${theme.colors.white};
          background-color:${theme.colors.green} ;
        }
        .react-datepicker__day:hover,
        .react-datepicker__year-text:hover,
        .react-datepicker__quarter-text:hover,
        .react-datepicker__month-text:hover,
        .react-datepicker__quarter-text:hover{
        background-color:${theme.colors.oceanic} !important;
        }

         // стили выбраной даты при наведении.
        .react-datepicker__day--selected:hover,
        .react-datepicker__day--in-selecting-range:hover,
        .react-datepicker__day--in-range:hover,
        .react-datepicker__month-text--selected:hover,
        .react-datepicker__month-text--in-selecting-range:hover,
        .react-datepicker__month-text--in-range:hover,
        .react-datepicker__quarter-text--selected:hover,
        .react-datepicker__quarter-text--in-selecting-range:hover,
        .react-datepicker__quarter-text--in-range:hover,
        .react-datepicker__year-text--selected:hover,
        .react-datepicker__year-text--in-selecting-range:hover,
        .react-datepicker__year-text--in-range:hover,
        .react-datepicker__day--keyboard-selected:hover,
        .react-datepicker__month--selected:hover,
        .react-datepicker__quarter--selected:hover,
        .react-datepicker__quarter-text--keyboard-selected:hover
        {
          background-color: ${theme.colors.green} !important;

        }


   }



       .date_picker {
          max-width: 275px;
       }
       .react-datepicker__close-icon::after{
       background-color: ${theme.colors.green} !important;
       }
        input {
          min-width: 240px;
          background: ${(props) => (props.disabled ? "rgb(241, 241, 241)" : theme.colors.white)};
          font-style: normal;
          font-weight: normal;
          letter-spacing: 0.005em;
          color: ${theme.colors.black};
          border: 1px solid ${theme.colors.gray};
          box-sizing: border-box;
          border-radius: 5px;
          padding: 7px;
          outline: none;
          width: ${(props) => (props.maxWidth ? props.maxWidth : "auto")};
           &:focus {
            border: 1px solid ${(props) => (props.disabled ? theme.colors.gray : theme.colors.green)} 
            }

          ${(props) =>
            props.error
              ? css`
                  border: 1px solid ${theme.colors.lightRed} !important;
                  ::placeholder {
                    /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: ${theme.colors.lightRed};
                    opacity: 1; /* Firefox */
                  }

                  :-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: ${theme.colors.lightRed};
                  }

                  ::-ms-input-placeholder {
                    /* Microsoft Edge */
                    color: ${theme.colors.lightRed};
                  }
                `
              : css`
                  ::placeholder {
                    /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: rgba(96, 120, 144, 0.5);
                  }
                  :-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: rgba(96, 120, 144, 0.5);
                  }
                  ::-ms-input-placeholder {
                    /* Microsoft Edge */
                    color: rgba(96, 120, 144, 0.5);
                  }
                `} }
          .react-datepicker__input-time-container {
          max-width: 224px;
          input {
          min-width: 146px;
          }
          }
         
`;
