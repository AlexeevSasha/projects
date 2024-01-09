import { theme } from "common/styles/theme";
import {
  selectActiveList,
  selectControlListFields,
  selectControlListFilter,
  selectDefVal,
  selectFilterError,
  selectPatientList,
} from "module/registerCheckList/registerCheckListSelector";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { FilterFormItem } from "./filterFormItem";
import { RegisterCheckListThunk } from "../../../../../module/registerCheckList/registerCheckListThunk";
import { ComparisonOperatorEnum } from "../../../../../common/interfaces/ComparisonOperatorEnum";
import { ConditionOperatorEnum } from "../../../../../common/interfaces/ConditionOperatorEnum";
import { IFilter } from "../../../../../common/interfaces/IFilter";
import { RegisterCheckListAction } from "../../../../../module/registerCheckList/registerCheckListAction";
import { selectFilterSelects } from "../../../../../module/filter/filterConstructorSelector";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { IBizObjWithFields } from "../../../../../common/interfaces/IBizObjWithFields";
import { ButtonStyles } from "../../../../../common/ui/Button/styles/ButtonStyles";
import { DrawerContainer } from "../../../../../common/components/Popup/components/DrawerContainer";
import { drawer } from "../../../../../common/helpers/event/modalEvent";

interface IProps {
  pageCount: number;
  searchText: string;
  name: string;
  getPatientControlList: (
    id: number,
    page: number,
    count: number,
    filter?: string,
    orderColumn?: string,
    orderAsc?: boolean
  ) => void;
}

interface IFormBiz extends IBizObjWithFields {
  value: number;
  label: string;
}

export const FilterDrawer = ({ searchText, pageCount, name, getPatientControlList }: IProps) => {
  const dispatch = useDispatch();
  const activeList = useSelector(selectActiveList);
  const filterError = useSelector(selectFilterError);
  const { controlListFilter } = useSelector(selectControlListFilter);
  const { bizObjWithFields } = useSelector(selectFilterSelects);
  const { controlListFields } = useSelector(selectControlListFields);
  const patientList = useSelector(selectPatientList);

  const filteredControlListFields = new Set(
    controlListFields.fields.filter((item) => item.isVisible).map((item) => item.id)
  );
  const filteredBizObjWithFieldsId = new Set(
    patientList.itemsNames.filter((item) => filteredControlListFields.has(item?.Id)).map((item) => item?.IdBizObj)
  );

  const { defVal } = useSelector(selectDefVal);

  const optionsBizObjWithFields = bizObjWithFields.filter((item) => filteredBizObjWithFieldsId.has(item.id));
  useEffect(() => {
    if (controlListFilter.filters?.length) {
      dispatch(
        RegisterCheckListAction.defVal.done({
          params: null,
          // @ts-ignore
          result: defVal.map((def) => ({
            ...def,
            values: controlListFilter?.filters?.find((c) => def.bizId === c.fieldBizObjId && def.id === c.fieldId)
              ? controlListFilter?.filters?.find((c) => def.bizId === c.fieldBizObjId && def.id === c.fieldId)?.values
              : def.values,
            comparisonValue:
              controlListFilter?.filters?.find((c) => def.bizId === c.fieldBizObjId && def.id === c.fieldId)
                ?.comparison || def.comparisonValue,
          })),
        })
      );
    }
    // eslint-disable-next-line
  }, [controlListFilter]);

  const onChangeComparison = (bizId: number, fieldId: number, comparison: ComparisonOperatorEnum | string) => {
    dispatch(
      RegisterCheckListAction.defVal.done({
        params: null,
        result: defVal.map((def) =>
          def.id === fieldId && def.bizId === bizId
            ? {
                ...def,
                comparisonValue: comparison,
                values: [],
              }
            : { ...def }
        ),
      })
    );
  };

  const onChangeValue = (
    bizId: number,
    fieldId: number,
    values: IFilter["values"],
    comparison?: ComparisonOperatorEnum | string
  ) => {
    dispatch(
      RegisterCheckListAction.defVal.done({
        params: null,
        // @ts-ignore
        result: defVal.map((def) =>
          def.id === fieldId && def.bizId === bizId
            ? { ...def, values: values, comparisonValue: comparison }
            : { ...def }
        ),
      })
    );
  };

  const resetForm = () => {
    dispatch(
      RegisterCheckListAction.defVal.done({
        params: null,
        result: defVal.map((def) => ({
          ...def,
          comparisonValue: undefined,
          values: [],
        })),
      })
    );
  };

  const registerSubmit = () => {
    dispatch(
      RegisterCheckListThunk.updateControlListsFilter(
        {
          ...controlListFilter,
          // @ts-ignore
          filters: defVal
            .map((item, index) => ({
              fieldId: item.id,
              fieldBizObjId: item.bizId,
              id: index,
              value: "",
              values: item?.values?.map((val) => ({
                value: val?.value,
                displayValue: val?.displayValue,
                position: val?.position,
              })),
              comparison: item?.comparisonValue,
              condition: index === 0 ? ConditionOperatorEnum.None : ConditionOperatorEnum.And,
              position: index + 1,
              parentId: 0,
              filterLevel: 0,
            }))
            .filter((f) => f.comparison)
            .map((i, ind) => ({ ...i, position: ind + 1 })),
        },

        activeList,
        () => {
          getPatientControlList(activeList, 1, pageCount, searchText);
          drawer.close();
        }
      )
    );
  };
  const clearFormItem = (biz: IFormBiz) => {
    const curBiz = defVal.filter((field) => field?.bizId === biz.value)?.map((item) => item.bizId);
    dispatch(
      RegisterCheckListAction.defVal.done({
        params: null,
        result: defVal.map((def) =>
          curBiz.includes(def.bizId)
            ? { ...def, comparisonValue: undefined, values: [] }
            : {
                ...def,
              }
        ),
      })
    );
  };

  return (
    <DrawerContainer
      width={60}
      unitOfMeasureWidth={"vw"}
      title={
        <div>
          <h2>{name}</h2>
          <div style={{ fontWeight: "normal", marginTop: 4 }}>Настройка расширенного фильтра поиска</div>
        </div>
      }
      footer={
        <BottonContainer>
          <Button onClick={() => resetForm()}>Сбросить все</Button>
          <WrapperText>{filterError}</WrapperText>
          <Button onClick={() => registerSubmit()}>Сохранить</Button>
        </BottonContainer>
      }
    >
      <FormContent>
        {optionsBizObjWithFields?.map((biz) => (
          <FlexContainer
            key={"biz" + biz.id}
            style={{
              alignItems: "start",
              padding: "5px",
              border: `1px solid ${theme.colors.grayBlue}`,
              borderRadius: "5px",
              marginBottom: "5px",
              position: "relative",
            }}
          >
            <ClearButton onClick={() => clearFormItem(biz)}> Очистить поля</ClearButton>

            <h4> {biz.name}</h4>
            {defVal
              .filter((field) => field?.bizId === biz.value)
              .map((item, i) => (
                <FormItemContainer key={item.id}>
                  <FilterFormItem
                    currentField={item}
                    type={"filterCheckList"}
                    index={i}
                    onChangeValue={onChangeValue}
                    onChangeComparison={onChangeComparison}
                  />
                </FormItemContainer>
              ))}
          </FlexContainer>
        ))}
      </FormContent>
    </DrawerContainer>
  );
};

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  padding: 5px 20px;
  width: 178px;
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        opacity: 0.9;
      }
    `}
`;

const FormContent = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray};
`;

const FormItemContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BottonContainer = styled.div`
  max-height: 50px;
  display: flex;
  justify-content: space-between;
`;

const WrapperText = styled.div`
  align-self: center;
  height: 100%;
  overflow-y: auto;
  max-width: 750px;
  margin: 0 8px;
`;
const ClearButton = styled.div`
  position: absolute;
  right: 10px;
  top: 3px;
  padding: 3px;
  border: 1px solid ${theme.colors.lightRed};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.lightRed};
  }
`;
