import React, { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import { FieldTypeEnum } from "../../../../common/interfaces/FieldTypeEnum";
import { Input } from "../../../../common/ui/Input/Input";
import styled from "styled-components";
import { DatePicker } from "../../../../common/ui/Input/DatePicker";
import { IScriptParam } from "../../../../common/interfaces/order/IOrderContingent";
import moment from "moment";
import { RegisterControlListApiRequest } from "../../../../api/registerControlListApiRequest";
import { SelectCustomAsync } from "../../../../common/ui/Select/SelectCustomAsync";

interface IProps {
  disabled: boolean;
  item: IScriptParam;
  index: number;
  control?: Control<{ scriptParams?: IScriptParam[] | null }>;
  type: FieldTypeEnum;
}

export const ParamsField = ({ item, control, index, disabled }: IProps) => {
  const { field: exampleValue } = useController({
    control,
    name: `scriptParams.${index}`,
    defaultValue: item,
  });

  const input = useMemo(() => {
    if (item.nsiUid) {
      return (
        <SelectCustomAsync
          placeholder={item?.exampleValue || ""}
          menuPlacement={"top"}
          htmlID={"paramValueSelect"}
          SelectValue={
            exampleValue.value.value
              ? { value: exampleValue.value.value, label: exampleValue?.value?.displayValue || "" }
              : ""
          }
          options={[]}
          isSearchable
          onChange={(date) => {
            exampleValue.onChange({ ...item, value: date.value, displayValue: date.label });
          }}
          withPaginateApiCallback={async (params) =>
            new RegisterControlListApiRequest()
              .getDictionaryValues(String(item.nsiUid), params)
              .then((r) => r.result.items)
          }
          isDisabled={disabled}
        />
      );
    } else
      switch (item.type) {
        case FieldTypeEnum.String:
          return (
            <Input
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                exampleValue.onChange({ ...item, value: event.currentTarget.value });
              }}
              placeholder={item?.exampleValue || "Строка"}
              defaultValue={exampleValue.value.value}
              disabled={disabled}
            />
          );
        case FieldTypeEnum.Guid:
          return (
            <Input
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                exampleValue.onChange({ ...item, value: event.currentTarget.value });
              }}
              placeholder={item?.exampleValue || "Гуид"}
              disabled={disabled}
            />
          );

        case FieldTypeEnum.Number:
          return (
            <Input
              fullWidth
              type={"number"}
              defaultValue={exampleValue.value.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                exampleValue.onChange({ ...item, value: event.currentTarget.value });
              }}
              placeholder={item?.exampleValue || "Число"}
              step={"1"}
              disabled={disabled}
            />
          );
        case FieldTypeEnum.DateTime:
          const tValue = exampleValue?.value?.value
            ? moment(exampleValue?.value?.value, "YYYY-MM-DD HH:MM").toDate()
            : null;
          return (
            <PickerContainer>
              {" "}
              <DatePicker
                placeholderText={item?.exampleValue || ""}
                value={tValue}
                dateFormat="dd/MM/yyyy HH:MM"
                onChange={(date) => {
                  exampleValue.onChange({ ...item, value: date ? moment(date).format("YYYY-MM-DD HH:MM") : null });
                }}
                showTimeInput={true}
                disabled={disabled}
              />
            </PickerContainer>
          );
        case FieldTypeEnum.Date:
          const dValue = exampleValue?.value?.value ? exampleValue?.value?.value?.split("-") : null;

          return (
            <PickerContainer>
              <DatePicker
                placeholderText={item?.exampleValue || ""}
                value={dValue ? new Date(dValue[0], dValue[1] - 1, dValue[2]) : null}
                onChange={(date) => {
                  exampleValue.onChange({ ...item, value: date ? moment(date).format("YYYY-MM-DD") : null });
                }}
                disabled={disabled}
              />
            </PickerContainer>
          );
        default:
          return null;
      }
  }, [exampleValue, item, disabled]);

  return (
    <React.Fragment key={index}>
      <ParamLine>
        <span className={"title"}> {item?.description}</span>
        {input}
      </ParamLine>
      <br />
    </React.Fragment>
  );
};
const ParamLine = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 10px 0;
  .title {
    width: 100%;
  }
`;
const PickerContainer = styled.div`
  display: flex;
  justify-content: end;
`;
