import { theme } from "common/styles/theme";
import {
  qualitySelector,
  selectCommonSettings,
  selectDisabledSave,
  selectErrors,
  selectSearchType,
  selectTestResult,
} from "module/registerSettingsCheckList/registerSettingsCheckListSelector";
import { RegisterSettingsCheckListThunk } from "module/registerSettingsCheckList/registerSettingsCheckListThunk";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RegisterSettingsCheckListAction } from "../../../../../../module/registerSettingsCheckList/registerSettingsCheckListAction";
import { filterConstructorSelector } from "../../../../../../module/filter/filterConstructorSelector";
import { FilterConstructorAction } from "../../../../../../module/filter/filterConstructorAction";
import { ButtonStyles } from "../../../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  onClose: () => void;
  isCreate?: boolean;
}

export const SettingsButtons: FC<IProps> = ({ onClose, isCreate }) => {
  const testResult = useSelector(selectTestResult);
  const disabledSave = useSelector(selectDisabledSave);
  const { name } = useSelector(selectCommonSettings);
  const currentCriterion = useSelector(qualitySelector);
  const { conditions } = useSelector(filterConstructorSelector);
  const errors = useSelector(selectErrors);
  const searchType = useSelector(selectSearchType);

  const dispatch = useDispatch();
  const checkRequest = () => {
    if (name.length === 0) {
      dispatch(RegisterSettingsCheckListAction.setErrorName(true));
    } else if (
      conditions?.length === 0 &&
      (currentCriterion === undefined || currentCriterion?.length === 0) &&
      searchType
    ) {
      dispatch(RegisterSettingsCheckListAction.setErrorConditionsAndCurrentCriterion(true));
    } else {
      dispatch(RegisterSettingsCheckListThunk.testCheckList());
    }
  };

  const saveControlList = () => {
    const { createCheckList, updateCheckList } = RegisterSettingsCheckListThunk;
    const action = isCreate ? createCheckList : updateCheckList;
    dispatch(action());
    onClose();
  };

  const saveNewControlList = () => {
    dispatch(RegisterSettingsCheckListThunk.createCheckList());
    onClose();
  };

  const clearFilters = () => {
    RegisterSettingsCheckListAction.updateDisabledSave(true);
    dispatch(FilterConstructorAction.infoSettings([]));
    dispatch(RegisterSettingsCheckListAction.clearQuality());
  };

  return (
    <Buttons isCreate={isCreate}>
      <Button onClick={checkRequest} id={"check_request"}>
        Проверить запрос
      </Button>
      <Button onClick={clearFilters} id={"clear_conditions"}>
        Сбросить всё
      </Button>
      <WrapperText>
        {errors.conditionsAndCurrentCriterion && searchType ? (
          <Text id={"check_result"}>Необходимо заполнить один из разделов: Условие или Требование</Text>
        ) : testResult ? (
          testResult?.isError ? (
            <Text id={"check_result_error"}>{testResult.message}</Text>
          ) : (
            <Text id={"check_result_message"}>{testResult.result?.conclusion}</Text>
          )
        ) : null}
      </WrapperText>
      {!isCreate && (
        <WhiteButton
          disabled={!testResult || testResult?.isError || disabledSave}
          onClick={!testResult || testResult?.isError || disabledSave ? undefined : saveNewControlList}
          id={"save_as_new"}
        >
          Сохранить как новый
        </WhiteButton>
      )}
      <Button
        disabled={!testResult || testResult?.isError || disabledSave}
        onClick={!testResult || testResult?.isError || disabledSave ? undefined : saveControlList}
        id={"save"}
      >
        Сохранить
      </Button>
    </Buttons>
  );
};

const Buttons = styled.div<{ isCreate?: boolean }>`
  display: grid;
  grid: auto / 230px 230px auto 230px ${({ isCreate }) => (isCreate ? 0 : "230px")};
  grid-auto-flow: column;
  padding: 10px;
  grid-gap: 10px;
`;

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        opacity: 0.9;
      }
    `}
`;

const WhiteButton = styled(ButtonStyles)<{ disabled?: boolean }>`
  color: ${theme.colors.green};
  background: ${theme.colors.lightGray};
  padding: 10px 20px;
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        background: ${theme.colors.green};
        opacity: 0.9;
        color: ${theme.colors.white};
      }
    `}
`;

const WrapperText = styled.div`
  align-self: center;
  max-height: 100px;
  overflow-y: auto;
`;

const Text = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  align-self: center;
`;
