import * as React from "react";
import { styled } from "../../../styles/styled";
import { InputDate } from "../InputDate/InputDate";
import { RegisterFieldTypeEnum } from "../../../interfaces/RegisterFieldTypeEnum";
import { theme } from "common/styles/theme";
import moment from "moment";
import { useTimeout } from "../../../hooks/useTimeout";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../Input";

interface IProps {
  type: string;
  id?: number;
  onChange: (value: { position: number; value: string }[], id?: number) => void;
  error?: boolean;
  defaultValue?: { position: number; value: string }[];
  disabled?: boolean;
  step?: string;
}

export const InputRangeField: React.FC<IProps> = (props) => {
  const [startText, setStartText] = useState(props?.defaultValue?.find((item) => item?.position === 0)?.value || "");
  const [endText, setEndText] = useState(props.defaultValue?.find((item) => item.position === 1)?.value || "");
  const [errors, setErrors] = useState({ start: !startText, end: !endText });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    setErrors({
      start: !startText,
      end: !endText,
    });
  }, [startText, endText]);

  useEffect(() => {
    setStartText(props.defaultValue?.find((item) => item.position === 0)?.value || "");
    setEndText(props.defaultValue?.find((item) => item.position === 1)?.value || "");
  }, [props.type, props.defaultValue]);
  useEffect(() => {
    if (props.type === RegisterFieldTypeEnum.DateTime) {
      const arrDateStart = props.defaultValue?.find((item) => item.position === 0)?.value?.split("/") || "";
      const dataStartValue = new Date(Number(arrDateStart[2]), Number(arrDateStart[0]) - 1, Number(arrDateStart[1]));
      setStartDate(dataStartValue);
      const arrDateEnd = props.defaultValue?.find((item) => item.position === 1)?.value?.split("/") || "";
      const dataEndValue = new Date(Number(arrDateEnd[2]), Number(arrDateEnd[0]) - 1, Number(arrDateEnd[1]));
      setEndDate(dataEndValue);
    }
  }, [props.type, props.defaultValue]);

  const timer = useTimeout(600);
  const handleChange = useCallback(() => {
    timer(() => {
      if (props.type === RegisterFieldTypeEnum.DateTime) {
        props.onChange(
          [
            { value: moment(startDate).format("MM/DD/YYYY"), position: 0 },
            { value: moment(endDate).format("MM/DD/YYYY"), position: 1 },
          ],
          props.id
        );
      } else {
        props.onChange(
          [
            { value: startText, position: 0 },
            { value: endText, position: 1 },
          ],
          props.id
        );
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startText, endText, props, startDate, endDate]);

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startText, endText, startDate, endDate]);

  const writeStart = (value: React.ChangeEvent<HTMLInputElement>) => {
    setStartText(value.currentTarget.value);
  };

  const writeEnd = (value: React.ChangeEvent<HTMLInputElement>) => {
    setEndText(value.currentTarget.value);
  };

  return props.disabled ? (
    <Label style={{ padding: "11px 19px" }}>
      от {startText} до {endText}
    </Label>
  ) : (
    <>
      {(props.type === RegisterFieldTypeEnum.String ||
        props.type === RegisterFieldTypeEnum.Guid ||
        props.type === RegisterFieldTypeEnum.DiagnosisCode) && (
        <Label>
          от
          <Input
            fullWidth
            id={"input_" + props.id}
            onChange={writeStart}
            error={props.error || errors.start}
            placeholder={"Строка"}
            value={startText}
            disabled={props.disabled}
          />
          до
          <Input
            fullWidth
            id={"input_" + props.id}
            onChange={writeEnd}
            error={props.error || errors.end}
            placeholder={"Строка"}
            value={endText}
            disabled={props.disabled}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.Number && (
        <Label>
          от
          <Input
            fullWidth
            id={"input_" + props.id}
            type={"number"}
            onChange={writeStart}
            error={props.error || errors.start}
            placeholder={"Число"}
            disabled={props.disabled}
            value={startText}
            step={props.step}
          />
          до
          <Input
            fullWidth
            id={"input_" + props.id}
            type={"number"}
            onChange={writeEnd}
            error={props.error || errors.end}
            placeholder={"Число"}
            disabled={props.disabled}
            value={endText}
            step={props.step}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.DateTime && (
        <DateContainer>
          от
          <InputDate
            onChange={(event: string) => {
              const arrDate = event?.split("/") || "";
              const dataValue = new Date(Number(arrDate[2]), Number(arrDate[1]) - 1, Number(arrDate[0]));
              setStartDate(dataValue);
            }}
            error={props.error}
            defaultValue={startDate}
          />
          до
          <InputDate
            onChange={(event: string) => {
              const arrDate = event?.split("/") || "";
              const dataValue = new Date(Number(arrDate[2]), Number(arrDate[1]) - 1, Number(arrDate[0]));
              setEndDate(dataValue);
            }}
            error={props.error}
            defaultValue={endDate}
          />
        </DateContainer>
      )}
    </>
  );
};

const Label = styled.div`
  background: ${theme.colors.white};
  /* padding: 1px 0; */
  border-radius: 5px;
  white-space: nowrap;
  overflow-x: auto;
  display: grid;
  grid-template-columns: 30px 1fr 30px 1fr;
  align-items: center;
  text-align: center;

  ::-webkit-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    display: none;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar-track-piece {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    display: none;
  }
  ::-webkit-resizer {
    display: none;
  }
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px 1fr;
  align-items: center;
  text-align: center;
`;
