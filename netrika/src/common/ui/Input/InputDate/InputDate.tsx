import moment from "moment";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { styled } from "../../../styles/styled";
import { HeaderWithScroll } from "./HeaderWithScroll";
import { DaysOfWeek } from "./DaysOfWeek";
import { Days } from "./Days";
import InputMask from "react-input-mask";
import { useTimeout } from "common/hooks/useTimeout";
import { theme } from "common/styles/theme";

interface IProps {
  onChange: (value: string) => void;
  error?: boolean;
  defaultValue?: Date;
  abroad?: boolean;
  isMultiDate?: boolean;
  disabled?: boolean;
}

export const InputDate = (props: IProps) => {
  const timer = useTimeout(600);
  const [currentDay, setCurrentDay] = useState(moment(props.defaultValue) || moment());
  const [month, setMonth] = useState(moment().startOf("month"));
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [defaultValue, setDefaultValue] = useState(moment(props.defaultValue).format("DD/MM/YYYY"));
  const [localError, setLocalError] = useState<boolean>(false);

  const refSelectElem = useRef<any>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    document.addEventListener("click", closeList);
    return () => document.removeEventListener("click", closeList);
  });

  const closeList = (event: any) => {
    if (visibleCalendar && !refSelectElem.current?.contains(event.target)) {
      setVisibleCalendar(false);
    }
  };

  useEffect(() => {
    setHeight(`${refSelectElem?.current?.clientHeight}px` || "0px");
  }, [refSelectElem]);

  useEffect(() => {
    setDefaultValue(moment(props.defaultValue).format("DD/MM/YYYY"));
    if (props.defaultValue && moment(props.defaultValue)) setCurrentDay(moment(props.defaultValue));
  }, [props.defaultValue]);

  const onClick = (day: moment.Moment) => {
    setCurrentDay(day);
    setDefaultValue("");
    props.onChange(day.clone().format("DD/MM/YYYY"));
    setVisibleCalendar(!visibleCalendar);
  };

  const updateMonth = (value: number) => {
    setMonth(month.clone().add(value, "month"));
  };

  const updateYear = (value: number) => {
    setMonth(month.clone().add(value, "year"));
  };

  const weeks = Array<number>(6)
    .fill(1)
    .map((item, week) => <Days key={week} startDay={month} week={week} currentDay={currentDay} onClick={onClick} />);

  const onChangeDate = (value: string) => {
    if (value && value !== "__/__/____") {
      const newDate = value.split("/");

      if (Number(newDate[0]) > 31) {
        newDate[0] = "0" + newDate[0];
        newDate[1] = newDate[0].slice(-1) + newDate[1];
        newDate[0] = newDate[0].slice(0, -1);
      }

      if (Number(newDate[1]) > 12) {
        newDate[1] = "0" + newDate[1];
        newDate[2] = newDate[1].slice(-1) + newDate[2];
        newDate[1] = newDate[1].slice(0, -1);
      }
      if (newDate[2].replace("_", "").length > 4) {
        newDate[2] = newDate[1].slice(0, -1);
      }
      if (
        !newDate.join("/").includes("_") &&
        moment(newDate.join("/"), "DD/MM/YYYY").format("MM/DD/YYYY") !== "Invalid date"
      ) {
        timer(() => props.onChange(moment(newDate.join("/"), "DD/MM/YYYY").format("DD/MM/YYYY")));
      } else if (value === "__/__/____") {
        props.onChange("Invalid date");
      }
      if (newDate.join("/").includes("_")) {
        setLocalError(true);
      } else {
        setLocalError(false);
      }

      setDefaultValue(newDate.join("/"));
    }
  };

  return (
    <>
      <Container
        disabled={props?.disabled}
        abroad={props.abroad}
        ref={refSelectElem}
        id={"input_date_component"}
        error={props.isMultiDate ? false : localError}
      >
        <InputMask
          disabled={props?.disabled}
          mask="99/99/9999"
          value={defaultValue}
          onChange={(value: ChangeEvent<HTMLInputElement>) => {
            onChangeDate(value.currentTarget.value);
          }}
        >
          {() => (
            <Calendar onClick={() => setVisibleCalendar(!visibleCalendar)} error={props.error} id={"calendar_value"} />
          )}
        </InputMask>
        {!props?.disabled && (
          <ContainerCalendar id={"containerCalendar"} visible={visibleCalendar}>
            <HeaderWithScroll
              month={month}
              currentDay={currentDay}
              onUpdateMonth={updateMonth}
              onUpdateYear={updateYear}
            />
            <ContentContainer>
              <DaysOfWeek />
              {weeks}
            </ContentContainer>
          </ContainerCalendar>
        )}
      </Container>
      {props.abroad && <div style={{ height: `${height}` }} />}
    </>
  );
};

const Container = styled.div<{ abroad?: boolean; error?: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  animation-timing-function: step-end;

  input {
    border: ${(props) => (props.error ? `1px solid ${theme.colors.lightRed}` : `1px solid ${theme.colors.gray}`)};
    background: ${(props) => (props.disabled ? "rgb(241,241,241)" : "initial")};

    &:focus-visible {
      border: 1px solid ${theme.colors.gray}
      outline: none !important;
    }
  }

  position: ${(props) => (props.abroad ? "absolute" : "relative")};
  width: fit-content;
`;

const ContentContainer = styled.div`
  padding: 0 0 5px 0;
  overflow: hidden;
  animation-name: appearance;
  animation-duration: 0.5s;

  @keyframes appearance {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 400px;
    }
  }
`;

const Calendar = styled.input<{ error?: boolean }>`
  background: ${theme.colors.white};
  border: 1px solid ${(props) => (props.error ? theme.colors.lightRed : theme.colors.gray)};
  box-sizing: border-box;
  border-radius: 5px;
  font-style: normal;
  font-weight: normal;
  line-height: 115%;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.005em;
  color: ${(props) => (props.error ? theme.colors.lightRed : "#808080")};
  padding: 10px 8px;
  width: 100%;
  cursor: pointer;
`;

const ContainerCalendar = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  z-index: 1010;
  top: 46px;
  right: -5px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 5px;
  padding: 0 20px;
  background: ${theme.colors.white};
`;
