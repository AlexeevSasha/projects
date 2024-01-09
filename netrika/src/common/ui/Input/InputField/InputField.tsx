import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Input } from "../Input";
import { InputDate } from "../InputDate/InputDate";
import { RegisterFieldTypeEnum } from "../../../interfaces/RegisterFieldTypeEnum";
import { EditAbleDiv } from "../../../components/EditAbleDiv/EditAbleDiv";

interface IProps {
  type: string;
  id?: number;
  onChange: (value: string, id?: number) => void;
  error?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  altId?: string;
  maxWidth?: string;
  maxLength?: number;
  timeout?: number;
  comparison?: string | number | "RegexMatch";
  step?: string;
}

export const InputField = (props: IProps) => {
  const refInput = useRef<any>("");

  const handleChange = useCallback(
    (value: string, id?: number) => {
      props.onChange(value, id);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange]
  );
  const arrDate = props.defaultValue?.split("/") || "";
  const dataValue = new Date(Number(arrDate[2]), Number(arrDate[0]) - 1, Number(arrDate[1]));

  const write = (value: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(value.currentTarget.value || "", props.id);
  };
  const changeCalendar = useCallback(
    (value: string) => {
      const arrDate = value.split("/") || "";
      const dataValue = `${arrDate[1]}/${arrDate[0]}/${arrDate[2]}`;
      handleChange(dataValue, props.id);
    },
    [handleChange, props.id]
  );
  useEffect(() => {
    if (refInput.current) refInput.current.value = props.defaultValue;
  }, [props.defaultValue]);

  return useMemo(() => {
    if (props.comparison === "RegexMatch") {
      return (
        <div style={{ position: "relative" }}>
          <EditAbleDiv
            ref={refInput}
            onChange={(value) => handleChange(value || "", props.id)}
            error={props.error}
            maxWidth={props.maxWidth}
            disabled={props.disabled}
            defValue={props.defaultValue}
          />
        </div>
      );
    } else
      switch (props.type) {
        case RegisterFieldTypeEnum.String:
          return (
            <Input
              id={props.altId || "input_" + props.id}
              onChange={write}
              error={props.error}
              placeholder={props.placeholder || "Строка"}
              defaultValue={props.defaultValue}
              disabled={props.disabled}
              fullWidth={!!props.maxWidth}
              maxLength={props.maxLength}
              ref={refInput}
            />
          );
        case RegisterFieldTypeEnum.Guid:
          return (
            <Input
              id={props.altId || "input_" + props.id}
              onChange={write}
              error={props.error}
              placeholder={props.placeholder || "Строка"}
              defaultValue={props.defaultValue}
              disabled={props.disabled}
              fullWidth={!!props.maxWidth}
              maxLength={props.maxLength}
              ref={refInput}
            />
          );
        case RegisterFieldTypeEnum.DiagnosisCode:
          return (
            <Input
              id={props.altId || "input_" + props.id}
              onChange={write}
              error={props.error}
              placeholder={props.placeholder || "Строка"}
              defaultValue={props.defaultValue}
              disabled={props.disabled}
              fullWidth={!!props.maxWidth}
              maxLength={props.maxLength}
              ref={refInput}
            />
          );
        case RegisterFieldTypeEnum.Number:
          return (
            <Input
              id={"input_" + props.id}
              type={"number"}
              onChange={write}
              error={props.error}
              placeholder={"Число"}
              disabled={props.disabled}
              defaultValue={props.defaultValue}
              fullWidth={!!props.maxWidth}
              maxLength={props.maxLength}
              step={props.step || "1"}
              ref={refInput}
            />
          );
        case RegisterFieldTypeEnum.DateTime:
          return (
            <InputDate
              onChange={changeCalendar}
              error={props.error}
              defaultValue={dataValue}
              disabled={props.disabled}
            />
          );
        default:
          return null;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
};
