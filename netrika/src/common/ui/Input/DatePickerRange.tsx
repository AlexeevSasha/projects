import React, { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "./DatePicker";
import { FlexContainer } from "../FlexContainer";
import styled from "styled-components";

interface IProps {
  startValue: Date | null;
  endValue: Date | null;
  onChangeStartDate: (value: Date | null) => void;
  onChangeEndDate: (value: Date | null) => void;
}

export const DatePickerRange: FC<IProps> = ({
  onChangeEndDate,
  onChangeStartDate,
  endValue = null,
  startValue = null,
}) => {
  return (
    <FlexContainer direction={"row"}>
      <RangeWord>c</RangeWord>
      <DatePicker
        value={startValue}
        onChange={(date) => {
          onChangeStartDate(date);
        }}
        selectsStart
        startDate={startValue}
        endDate={endValue}
      />
      <RangeWord style={{ marginLeft: "10px" }}>по</RangeWord>
      <DatePicker
        value={endValue}
        onChange={(date) => {
          onChangeEndDate(date);
        }}
        selectsEnd
        startDate={startValue}
        endDate={endValue}
        minDate={startValue}
      />
    </FlexContainer>
  );
};

const RangeWord = styled.span`
  margin-right: 10px;
`;
