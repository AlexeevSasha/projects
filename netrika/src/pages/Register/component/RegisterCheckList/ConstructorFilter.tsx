import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComparisonOperatorEnum } from "../../../../common/interfaces/ComparisonOperatorEnum";
import { ConditionOperatorEnum } from "../../../../common/interfaces/ConditionOperatorEnum";
import { styled } from "../../../../common/styles/styled";
import {
  filterConstructorSelector,
  selectAdditionalConditionById,
  selectConditionById,
} from "../../../../module/filter/filterConstructorSelector";
import { FilterConstructorThunk } from "../../../../module/filter/filterConstructorThunk";
import { ConstructorFilterItem } from "./ConstructorFilterItem";
import { ConstructorFilterContainer } from "./ConstructorFilterContainer";
import { theme } from "common/styles/theme";
import { IFilterType } from "module/filter/IFilterType.g";
import { IconDelete } from "../../../../common/components/Icon/IconDelete";
import { IFilter } from "../../../../common/interfaces/IFilter";

interface IProps {
  itemId: number;
  disabled?: boolean;
  index: number;
  type: IFilterType["type"];
}

export const ConstructorFilter: FC<IProps> = ({ itemId, disabled, index, type }) => {
  const dispatch = useDispatch();
  const [isCondition, setIsCondition] = useState(false);
  const { conditions } = useSelector(filterConstructorSelector);
  const { selects } = useSelector(filterConstructorSelector);
  const { updateVariates, moveLeft, moveRight } = FilterConstructorThunk;

  const selector = useMemo(() => {
    if (type === "additionalCriterion") {
      return selectAdditionalConditionById(itemId);
    } else {
      return selectConditionById(itemId);
    }
  }, [itemId, type]);

  const item = useSelector(selector);
  const neighboringItem: IFilter | null =
    conditions.length - 1 > index && conditions[index + 1].jsonRuleId ? conditions[index + 1] : null;

  const handleUpdateVariates = (id: number) => () => {
    setIsCondition(true);
    if (!disabled) dispatch(updateVariates(id, type));
  };

  useEffect(() => {
    if (item.condition !== ConditionOperatorEnum.None) {
      setIsCondition(true);
    }
  }, [item]);

  const handleMoveLeft = (id: number) => () => dispatch(moveLeft(id, type));

  const handelMoveRight = (id: number) => () => dispatch(moveRight(id, type));

  const deleteFilter = (id: number) => {
    dispatch(FilterConstructorThunk.deleteElement(id, type));
    if (neighboringItem) dispatch(FilterConstructorThunk.deleteElement(neighboringItem.id, type));
  };

  return (
    <>
      <div key={item.id} style={{ position: "relative" }}>
        {!!index && (
          <BlockVariations condition={isCondition}>
            <Variant
              active={item.condition === ConditionOperatorEnum.And}
              id={
                item.condition === ConditionOperatorEnum.And
                  ? "element_" + item.id + "_and_active"
                  : "element_" + item.id + "_and"
              }
              onClick={handleUpdateVariates(item.id)}
            >
              <CustomRadioContainer active={item.condition === ConditionOperatorEnum.And}>
                <CustomRadio active={item.condition === ConditionOperatorEnum.And} />
              </CustomRadioContainer>
              и
            </Variant>
            {!item.jsonRuleId && (
              <Variant
                active={item.condition === ConditionOperatorEnum.Or}
                id={
                  item.condition === ConditionOperatorEnum.Or
                    ? "element_" + item.id + "_or_active"
                    : "element_" + item.id + "_or"
                }
                onClick={handleUpdateVariates(item.id)}
              >
                <CustomRadioContainer active={item.condition === ConditionOperatorEnum.Or}>
                  <CustomRadio active={item.condition === ConditionOperatorEnum.Or} />
                </CustomRadioContainer>{" "}
                или
              </Variant>
            )}
          </BlockVariations>
        )}

        <BlockContainer id={`condition_block_${itemId}`}>
          {item.condition !== ConditionOperatorEnum.None && <Lines />}
          {item.comparison !== ComparisonOperatorEnum.Parent ? (
            <BlockFilter>
              {!disabled && (
                <BlockButtons>
                  {!disabled && (
                    <div
                      id={`element_${item.id}_delete`}
                      style={{ margin: "0 8px", display: "flex", alignItems: "center" }}
                      onClick={() => deleteFilter(item.id)}
                    >
                      <IconDelete />
                    </div>
                  )}
                  <ContainerButtonMove>
                    <ButtonMove id={`inBracket_${itemId}`} onClick={handleMoveLeft(item.id)}>
                      за скобки
                    </ButtonMove>
                    <ButtonMove id={`toBracket_${itemId}`} onClick={handelMoveRight(item.id)}>
                      под скобки
                    </ButtonMove>
                  </ContainerButtonMove>
                </BlockButtons>
              )}
              <ConstructorFilterItem index={index} item={item} selects={selects} disabled={disabled} type={type} />
            </BlockFilter>
          ) : (
            <ConstructorFilterContainer parentId={item.position} disabled={disabled} type={type} />
          )}
        </BlockContainer>
      </div>
    </>
  );
};

const BlockContainer = styled.div`
  padding: 10px;
  display: flex;
`;
const CustomRadioContainer = styled.div<{ active: boolean }>`
  margin-right: 5px;
  width: 14px;
  height: 14px;
  padding: 2px;
  border: 1px solid ${({ active }) => (active ? theme.colors.green : theme.colors.gray)};
  border-radius: 50px;
`;
const CustomRadio = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border: 1px solid ${({ active }) => (active ? theme.colors.green : theme.colors.gray)};
  border-radius: 50px;
  background: ${({ active }) => (active ? theme.colors.green : theme.colors.white)};
`;

const BlockButtons = styled.div`
  align-items: center;
  display: flex;
  width: 15%;
  background: ${theme.colors.lightBlue};
  border-radius: 25px;
`;

const BlockFilter = styled.div`
  display: flex;
  width: 100%;
  background: ${theme.colors.lightBlue};
  border-radius: 25px;
  padding-bottom: 10px;
`;

const BlockVariations = styled.div<{ condition: boolean }>`
  top: -25px;
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ condition }) => (condition ? theme.colors.gray : theme.colors.lightRed)};
  border-left: none;
  background: ${theme.colors.white};
  border-radius: 0 7px 7px 0;
  z-index: 1;
`;

const Variant = styled.div<{ active: boolean }>`
  box-sizing: border-box;
  padding: 3px 20px;
  cursor: pointer;
  user-select: none;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.005em;
  color: ${({ active }) => (active ? theme.colors.green : theme.colors.gray)};
`;

const Lines = styled.div`
  position: absolute;
  border: 1px solid ${theme.colors.grayBlue};
  border-right: none;
  width: 50px;
  height: 108px;
  top: -42px;
  left: 0;
  z-index: -1;
`;

const ContainerButtonMove = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonMove = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayBlue};
  border-radius: 8px;
  color: ${theme.colors.green};
  padding: 4px 8px;
  margin-top: 8px;
  cursor: pointer;
`;
