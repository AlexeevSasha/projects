import React from "react";
import { InputDate } from "../../../../../common/ui/Input/InputDate/InputDate";
import { Input } from "../../../../../common/ui/Input/Input";
import { theme } from "../../../../../common/styles/theme";
import { RegisterFieldTypeEnum } from "../../../../../common/interfaces/RegisterFieldTypeEnum";
import styled from "styled-components";
import moment from "moment";

interface IProps {
  type: string;
  id?: number;
  onChange: (value: { position: number; value: string; displayValue?: string }[], id?: number) => void;
  error?: boolean;
  defaultValue?: { position: number; value: string; displayValue?: string }[];
  disabled?: boolean;
}

export const FieldRangeInput: React.FC<IProps> = (props) => {
  const DefaultValuerForCalendar = (value?: string) => {
    const arrDate = value?.split("/") || "";
    return new Date(Number(arrDate[2]), Number(arrDate[0]) - 1, Number(arrDate[1]));
  };

  return props.disabled ? (
    <Label style={{ padding: "11px 19px" }}>
      от {props?.defaultValue?.[0]?.value} до {props?.defaultValue?.[1]?.value ?? ""}
    </Label>
  ) : (
    <>
      {(props.type === RegisterFieldTypeEnum.String ||
        props.type === RegisterFieldTypeEnum.Guid ||
        props.type === RegisterFieldTypeEnum.DiagnosisCode) && (
        <Label>
          от
          <Input
            id={"input_" + props.id}
            onChange={(value) =>
              props.onChange([
                { position: 0, value: value.target.value, displayValue: value.target.value },
                props.defaultValue?.[1] as { position: number; value: string; displayValue?: string },
              ])
            }
            error={props.error}
            placeholder={"Строка"}
            value={props.defaultValue?.[0]?.value || ""}
            disabled={props.disabled}
          />
          до
          <Input
            id={"input_" + props.id}
            onChange={(value) =>
              props.onChange([
                props.defaultValue?.[0] as { position: number; value: string; displayValue?: string },
                { position: 1, value: value.target.value, displayValue: value.target.value },
              ])
            }
            error={props.error}
            placeholder={"Строка"}
            value={props.defaultValue?.[1]?.value || ""}
            disabled={props.disabled}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.Number && (
        <Label>
          от
          <Input
            id={"input_" + props.id}
            type={"number"}
            onChange={(value) =>
              props.onChange([
                { position: 0, value: value.target.value, displayValue: value.target.value },
                props.defaultValue?.[1] as { position: number; value: string; displayValue?: string },
              ])
            }
            error={props.error}
            placeholder={"Число"}
            disabled={props.disabled}
            value={props.defaultValue?.[0]?.value || ""}
          />
          до
          <Input
            id={"input_" + props.id}
            type={"number"}
            onChange={(value) =>
              props.onChange([
                props.defaultValue?.[0] as { position: number; value: string; displayValue?: string },
                { position: 1, value: value.target.value, displayValue: value.target.value },
              ])
            }
            error={props.error}
            placeholder={"Число"}
            disabled={props.disabled}
            value={props.defaultValue?.[1]?.value || ""}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.DateTime && (
        <DateContainer>
          от
          <InputDate
            onChange={(event: string) => {
              const arrDate = event?.split("/") || "";
              const dataValue = `${arrDate[1]}/${arrDate[0]}/${arrDate[2]}`;
              props.onChange(
                [
                  {
                    position: 0,
                    value: moment(dataValue).format("MM/DD/YYYY"),
                    displayValue: moment(dataValue).format("MM/DD/YYYY"),
                  },
                  props.defaultValue?.[1] as { position: number; value: string; displayValue?: string },
                ],
                props.id
              );
            }}
            error={props.error}
            defaultValue={DefaultValuerForCalendar(props.defaultValue?.[0]?.value)}
          />
          до
          <InputDate
            onChange={(event: string) => {
              const arrDate = event?.split("/") || "";
              const dataValue = `${arrDate[1]}/${arrDate[0]}/${arrDate[2]}`;
              props.onChange(
                [
                  props.defaultValue?.[0] as { position: number; value: string; displayValue?: string },

                  {
                    position: 1,
                    value: moment(dataValue).format("MM/DD/YYYY"),
                    displayValue: moment(dataValue).format("MM/DD/YYYY"),
                  },
                ],
                props.id
              );
            }}
            error={props.error}
            defaultValue={DefaultValuerForCalendar(props.defaultValue?.[1]?.value)}
          />
        </DateContainer>
      )}
    </>
  );
};

const Label = styled.div`
  background: ${theme.colors.white};
  white-space: nowrap;
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
