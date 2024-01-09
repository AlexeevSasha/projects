import React, { FC, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "../../../../common/styles/styled";
import { selectAdditionalConditionIds, selectConditionIds } from "../../../../module/filter/filterConstructorSelector";
import { ConstructorFilter } from "./ConstructorFilter";
import { FilterConstructorThunk } from "module/filter/filterConstructorThunk";
import { theme } from "common/styles/theme";
import { IFilterType } from "module/filter/IFilterType.g";
import { proposalCriterionSelector } from "../../../../module/proposalCriterion/proposalCriterionSelector";
import { selectErrors } from "../../../../module/registerSettingsCheckList/registerSettingsCheckListSelector";
import { RegisterSettingsCheckListAction } from "../../../../module/registerSettingsCheckList/registerSettingsCheckListAction";

interface IProps {
  id?: number;
  parentId?: number;
  disabled?: boolean;
  type: IFilterType["type"];
}

export const ConstructorFilterContainer: FC<IProps> = ({ id = 0, parentId = 0, disabled, type }) => {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  const { test } = useSelector(proposalCriterionSelector);

  const selector = useMemo(() => {
    if (type === "additionalCriterion") {
      return selectAdditionalConditionIds(parentId);
    } else {
      return selectConditionIds(parentId);
    }
  }, [parentId, type]);
  const conditionsIds = useSelector(selector);

  const addFilter = () => dispatch(FilterConstructorThunk.addElement(parentId, type));
  const hasConditionsIds = conditionsIds?.length > 0;

  useEffect(() => {
    if (hasConditionsIds) {
      dispatch(RegisterSettingsCheckListAction.setErrorConditionsAndCurrentCriterion(false));
    }
  }, [dispatch, hasConditionsIds]);

  return (
    <Container
      isErrors={(test.isError && !hasConditionsIds && type === "criterion") || errors.conditionsAndCurrentCriterion}
      id={`main_container_criterion_${id}`}
    >
      {conditionsIds &&
        conditionsIds.map((itemId, index) => (
          <ContainerConstructor key={itemId}>
            <ConstructorFilter key={itemId} itemId={itemId} disabled={disabled} index={index} type={type} />
          </ContainerConstructor>
        ))}

      {!disabled && (
        <AddContainer onClick={addFilter} id={`element_add_${parentId}`}>
          <Plus>+</Plus>Условие
        </AddContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ isErrors?: boolean }>`
  border: 1px solid ${(props) => (props.isErrors ? theme.colors.lightRed : theme.colors.grayBlue)};
  width: 99%;
  border-radius: 8px;
  margin-right: 10px;
  background: ${theme.colors.white};
`;
const ContainerConstructor = styled.div`
  width: 100%;
`;
const AddContainer = styled.div`
  margin: 10px 0 20px 0;
  line-height: 130%;
  letter-spacing: 0.005em;
  color: ${theme.colors.hightBlue};
  cursor: pointer;
`;

const Plus = styled.span`
  background: ${theme.colors.green};
  color: ${theme.colors.white};
  padding: 0 6px;
  border-radius: 2px;
  margin-right: 16px;
`;
