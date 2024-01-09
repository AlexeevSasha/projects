import * as React from "react";
import { RegisterFieldTypeEnum } from "../../../interfaces/RegisterFieldTypeEnum";
import { styled } from "../../../styles/styled";
import { InputDate } from "../InputDate/InputDate";
import { ICustomSelect } from "../../../interfaces/ISelect";
import { CustomSelect } from "../../Select/CustomSelect";
import { validateNum } from "../../../constants/validate";
import { CustomCross } from "./CustomCross";
import moment from "moment";
import { theme } from "../../../styles/theme";
import { useCallback, useMemo } from "react";

interface IProps {
  type: string;
  id?: number;
  onChange: (value: { position: number; value: string }[], id?: number) => void;
  error?: boolean;
  disabled?: boolean;
  value: { position: number; value: string; displayValue?: string }[];
  maxWidth?: string;
  step?: string;
}

export const InputMultiField: React.FC<IProps> = (props) => {
  const defValue = props.value?.map((item) => ({ value: item.value, label: item.value }));
  const onChangeSelect = (value: ICustomSelect[]) => {
    const changes = value.map((item, index) => ({ position: index, value: String(item.value) }));
    if (props.type === "Number") {
      props.onChange(changes, props.id);
    } else props.onChange(changes, props.id);
  };
  const changeCalendar = (value: string) => {
    const arrDate = value.split("/") || "";
    const dataValue = `${arrDate[1]}/${arrDate[0]}/${arrDate[2]}`;
    props.onChange([...props.value, { position: props.value.length, value: dataValue }], props.id);
  };

  const deleteElem = useCallback(
    (value: string) => {
      const newVal = props.value.filter((item) => item.value !== value);
      props.onChange(
        newVal.map((item, index) => ({ position: index, value: item.value })),
        props.id
      );
    },
    [props]
  );
  const selectedValue = useMemo(() => {
    return props.value?.map((item, index) => (
      <DateField key={index} id={`multi_input_${props.id}_value_${index}`}>
        <DateContainer>
          {moment(item.value).format("DD/MM/YYYY") !== "Invalid date"
            ? moment(item.value).format("DD/MM/YYYY")
            : item.value}
        </DateContainer>

        {props.disabled ? null : (
          <CustomCross id={`avalable_work_position_${index}_delete`} onClick={() => deleteElem(item.value)} />
        )}
      </DateField>
    ));
  }, [props.value, deleteElem, props.disabled, props.id]);

  return props.disabled ? (
    <Label>
      <ContainerElemMultiSelect>{selectedValue}</ContainerElemMultiSelect>
    </Label>
  ) : (
    <>
      {(props.type === RegisterFieldTypeEnum.String ||
        props.type === RegisterFieldTypeEnum.Guid ||
        props.type === RegisterFieldTypeEnum.DiagnosisCode) && (
        <Label>
          <CustomSelect
            htmlID={"Creatable_select_" + props.id}
            isDisabled={props.disabled}
            placeholder={"Введите строку..."}
            isCreatable
            isMulti
            isSearchable
            SelectValue={defValue as unknown}
            options={[]}
            onChange={onChangeSelect}
            isError={props.error}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.Number && (
        <Label>
          <CustomSelect
            htmlID={"Creatable_select_" + props.id}
            isDisabled={props.disabled}
            placeholder={"Введите число..."}
            isCreatable
            isMulti
            isSearchable
            creatableType={"Number"}
            SelectValue={defValue.filter((item) => validateNum.test(item.value)) as unknown}
            options={[]}
            onChange={onChangeSelect}
            isError={props.error}
          />
        </Label>
      )}

      {props.type === RegisterFieldTypeEnum.DateTime && (
        <InputDate onChange={changeCalendar} isMultiDate error={props.error} />
      )}
      {props.type === RegisterFieldTypeEnum.DateTime && props.value.length > 0 && (
        <ContainerElemMultiSelect>{selectedValue}</ContainerElemMultiSelect>
      )}
    </>
  );
};

const Label = styled.div`
  position: relative;
  border-radius: 5px;
  white-space: nowrap;
  overflow-x: auto;

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
  border-radius: 2px;
  color: ${theme.colors.white};
  font-size: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  box-sizing: border-box;
  height: 100%;
  background: ${theme.colors.green};
  font-weight: 400;
  padding: 4px 10px 4px 6px;
`;
const DateField = styled.div`
  display: flex;
  margin: 2px;
  min-width: 0;
  box-sizing: border-box;
  color: ${theme.colors.white};
  background: ${theme.colors.green};
  white-space: normal;
`;
export const ContainerElemMultiSelect = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
`;
