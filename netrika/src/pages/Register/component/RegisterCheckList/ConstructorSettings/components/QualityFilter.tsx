import { IRegisterQualityCriterion } from "common/interfaces/register/IRegisterQualityCriterion";
import { theme } from "common/styles/theme";
import { qualityCriterionSelector } from "module/filter/filterConstructorSelector";
import { selectActiveListId } from "module/registerCheckList/registerCheckListSelector";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import { qualitySelector, selectErrors } from "module/registerSettingsCheckList/registerSettingsCheckListSelector";
import { RegisterSettingsCheckListThunk } from "module/registerSettingsCheckList/registerSettingsCheckListThunk";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FilterItem } from "./QualityFilterComponent/FilterItem";

interface IProps {
  registerId: number;
  disable?: boolean;
}

export const QualityFilter: FC<IProps> = ({ disable, registerId }) => {
  const currentCriterion = useSelector(qualitySelector);
  const allCriterion = useSelector(qualityCriterionSelector);
  const idControlList = useSelector(selectActiveListId);
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCriterion?.length > 0) {
      dispatch(RegisterSettingsCheckListAction.setErrorConditionsAndCurrentCriterion(false));
    }
  }, [dispatch, currentCriterion]);

  const addQuality = () => {
    const newCriterion = {
      ...allCriterion[0],
      idControlList,
      queryResult: 0,
      id: Math.round(Math.random() * 100000),
    } as IRegisterQualityCriterion;
    dispatch(RegisterSettingsCheckListAction.addQuality(newCriterion));
  };

  useEffect(() => {
    dispatch(RegisterSettingsCheckListThunk.getQualityCriterionList(registerId));
  }, [dispatch, registerId]);

  return allCriterion && allCriterion.length ? (
    <Container isErrors={errors.conditionsAndCurrentCriterion}>
      {!!currentCriterion &&
        currentCriterion.map((item) => <FilterItem registerId={registerId} key={item.id} item={item} />)}

      {!disable && (
        <AddContainer onClick={addQuality}>
          <Plus>+</Plus>Требование
        </AddContainer>
      )}
    </Container>
  ) : null;
};

const Container = styled.div<{ isErrors?: boolean }>`
  border: 1px solid ${(props) => (props.isErrors ? theme.colors.lightRed : theme.colors.grayBlue)};
  border-radius: 8px;
  margin-right: 10px;
  margin-top: 12px;
  margin-bottom: 20px;
  background: ${theme.colors.white};
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
