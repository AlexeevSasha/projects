import { RegisterFieldTypeEnum } from "common/interfaces/RegisterFieldTypeEnum";
import { IRegisterQualityCriterion } from "common/interfaces/register/IRegisterQualityCriterion";
import { theme } from "common/styles/theme";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "../../../../../../../common/styles/styled";
import { InputField } from "../../../../../../../common/ui/Input/InputField/InputField";
import { CustomSelect } from "../../../../../../../common/ui/Select/CustomSelect";
import { ICustomSelect } from "../../../../../../../common/interfaces/ISelect";
import { IconDelete } from "../../../../../../../common/components/Icon/IconDelete";
import { RegisterControlListApiRequest } from "../../../../../../../api/registerControlListApiRequest";
import { qualityCurrensCriterionSelector } from "../../../../../../../module/filter/filterConstructorSelector";
import { SelectCustomAsync } from "../../../../../../../common/ui/Select/SelectCustomAsync";

interface IProps {
  item: IRegisterQualityCriterion;
  registerId?: number;
  disable?: boolean;
}

const selectItems = [
  { value: "1", label: "Выполняется" },
  { value: "0", label: "Не выполняется" },
  { value: "-1", label: "Нет данных" },
];

export const FilterItem: FC<IProps> = ({ item, disable, registerId }) => {
  const dispatch = useDispatch();
  const currentCriterion = useSelector(qualityCurrensCriterionSelector);
  const selectItem = { value: item.id, label: item.name };
  const select2Item = selectItems.find(({ value }) => +value === item.queryResult);
  const handleUpdateCriterion = (value: ICustomSelect) => {
    const newItem = {
      ...currentCriterion.find(({ id }) => id === +value.value),
      queryResult: 0,
    } as IRegisterQualityCriterion;
    if (newItem) {
      dispatch(RegisterSettingsCheckListAction.updateQuality({ id: item.id, newItem }));
    }
  };
  const handleUpdateQueryResult = (value: ICustomSelect) =>
    dispatch(RegisterSettingsCheckListAction.updateQualityQueryResult({ id: item.id, queryResult: +value.value }));

  const handleDelete = () => dispatch(RegisterSettingsCheckListAction.deleteQuality(item.id));

  const setParamValue = (paramId: number, paramValue: string, displayValue?: string[]) => {
    const paramsValues = item.qualityParamsValue;
    const isInArray = paramsValues.some(({ idQueryPrim }) => idQueryPrim === paramId);
    const nextParamsValues = isInArray
      ? paramsValues.map((item) =>
          item.idQueryPrim === paramId ? { ...item, value: paramValue, displayValue: displayValue || null } : item
        )
      : [
          ...paramsValues,
          {
            id: Math.round(Math.random() * 100000),
            idQueryPrim: paramId,
            register: true,
            idSource: item.id,
            value: paramValue,
            displayValue: displayValue || null,
          },
        ];
    dispatch(
      RegisterSettingsCheckListAction.updateQualityParamsValue({
        id: item.id,
        value: nextParamsValues,
      })
    );
  };

  const handleValueChange = (paramId: number) => (value: string) => {
    setParamValue(paramId, value);
  };

  return (
    <Block>
      <Selects>
        {!disable && (
          <div
            style={{ margin: "0 8px", display: "flex", alignItems: "center" }}
            onClick={handleDelete}
            id={`element_${item.id}_delete`}
          >
            <IconDelete />
          </div>
        )}
        <ContainerSelect id={"filterItem_fieldBizObj"}>
          <SelectCustomAsync
            htmlID={"select_bizObj"}
            SelectValue={selectItem as unknown}
            options={[]}
            closeMenuOnSelect={false}
            isSearchable
            isDisabled={disable}
            onChange={handleUpdateCriterion}
            fieldID={String(registerId)}
            withPaginateConstructorRegisterQualityCriterion={async ({ pageIndex, pageSize, registerId, searchName }) =>
              new RegisterControlListApiRequest()
                .getOrderQuality(registerId, pageIndex, pageSize, searchName)
                .then((r) => r.result.items)
            }
          />
        </ContainerSelect>

        <ContainerSelect id={"select_fieldValue"}>
          <CustomSelect
            htmlID={"filterItem_field_value"}
            SelectValue={select2Item as unknown}
            options={selectItems}
            closeMenuOnSelect={false}
            isDisabled={disable}
            onChange={handleUpdateQueryResult}
          />
        </ContainerSelect>
      </Selects>
      <Params>
        {item.params?.map((param) => {
          const paramValue = item.qualityParamsValue.find((val) => val.idQueryPrim === param.id);

          return (
            <QualityParamsSettingsContainer key={param.num}>
              <div style={{ marginRight: "20px" }}>{param.name}</div>
              {!param.catalog ? (
                <InputField
                  error={!paramValue?.value.length}
                  defaultValue={paramValue?.value || ""}
                  type={RegisterFieldTypeEnum.String}
                  onChange={handleValueChange(param.id)}
                  placeholder={param.exampleValue}
                />
              ) : (
                <SelectCustomAsync
                  htmlID={"paramValueSelect"}
                  SelectValue={
                    paramValue?.value
                      ? { value: paramValue?.value || "", label: paramValue?.displayValue?.[0] || "" }
                      : ""
                  }
                  options={[]}
                  isSearchable
                  onChange={(value) => setParamValue(param.id, value.value.toString(), [value.label.toString()])}
                  withPaginateApiCallback={async (params) =>
                    new RegisterControlListApiRequest()
                      .getDictionaryValues(param.nsiUid, params)
                      .then((r) => r.result.items)
                  }
                />
              )}
            </QualityParamsSettingsContainer>
          );
        })}
      </Params>
    </Block>
  );
};

const Block = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px 30px 10px 20px;
  background: ${theme.colors.lightBlue};
  border-radius: 25px;
  margin: 4px 20px;
  position: relative;
`;
const QualityParamsSettingsContainer = styled.div`
  display: grid;
  grid: 1fr / 1fr 2fr;
  row-gap: 15px;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 15px;
`;

const Selects = styled.div`
  display: flex;
  align-items: center;
  #filterItem_fieldBizObj {
    margin-right: 20px;
  }
`;

const Params = styled.div`
  align-items: center;
  margin-top: 15px;
`;

const ContainerSelect = styled.div`
  width: 100%;
  display: flex;
  #filterItem_field_value {
    width: 50%;
  }
  #select_bizObj {
    width: 50%;
  }
`;
