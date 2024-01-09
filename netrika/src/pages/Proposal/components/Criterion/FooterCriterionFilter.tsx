import { theme } from "common/styles/theme";
import { proposalCriterionSelector } from "module/proposalCriterion/proposalCriterionSelector";
import { ProposalCriterionThunk } from "module/proposalCriterion/proposalCriterionThunk";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FilterConstructorAction } from "../../../../module/filter/filterConstructorAction";
import { ProposalCriterionAction } from "../../../../module/proposalCriterion/proposalCriterionAction";
import { ButtonStyles } from "../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  registerId: number;
}

export const FooterCriterionFilter = (props: IProps) => {
  const dispatch = useDispatch();
  const { test } = useSelector(proposalCriterionSelector);

  const checkRequest = useCallback(() => {
    dispatch(ProposalCriterionThunk.testCriterion(props.registerId));
  }, [dispatch, props.registerId]);

  const handleCreate = useCallback(() => {
    dispatch(ProposalCriterionThunk.autoCreateRegister(props.registerId));
  }, [dispatch, props.registerId]);

  const handleUpdate = useCallback(() => {
    dispatch(ProposalCriterionThunk.updateRegister(props.registerId));
  }, [dispatch, props.registerId]);

  const clearFilters = () => {
    dispatch(FilterConstructorAction.clearFilter(true));
    dispatch(ProposalCriterionAction.clearTestCriterion());
  };

  return (
    <SaveContainer>
      <Button onClick={checkRequest} id={"modal_save"}>
        Проверить запрос
      </Button>
      <Button onClick={clearFilters} id={"clear_criterion"}>
        Сбросить всё
      </Button>
      <div style={{ alignSelf: "center" }}>
        {test.result?.conclusion !== "" && <Text>{test.result?.conclusion}</Text>}
        {test?.message !== "" && <Text>{test?.message}</Text>}
      </div>

      <Button
        disabled={test.isError}
        onClick={test.isError ? undefined : test?.result?.registerExist ? handleUpdate : handleCreate}
        id="create_register"
      >
        {test?.result?.registerExist ? "Обновить критерии включения" : "Создать регистр"}
      </Button>
    </SaveContainer>
  );
};

const Text = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  align-self: center;
`;

const SaveContainer = styled.div`
  display: grid;
  grid: auto / 240px 240px auto 240px;
  column-gap: 30px;
  padding: 10px;
`;

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  height: fit-content;

  :hover {
    opacity: 0.9;
  }
`;
