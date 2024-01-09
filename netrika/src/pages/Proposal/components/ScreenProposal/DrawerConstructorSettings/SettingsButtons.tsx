import { theme } from "common/styles/theme";
import React, { FC, useCallback } from "react";
import styled, { css } from "styled-components";
import { IAddOrderControlListRequest } from "../../../../../common/interfaces/order/IAddOrderControlListRequest";
import { ProposalCheckListThunk } from "../../../../../module/proposalCheckList/proposalCheckListThunk";
import { useDispatch } from "react-redux";
import { FilterConstructorAction } from "../../../../../module/filter/filterConstructorAction";
import { ButtonStyles } from "../../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  onClose: () => void;
  isCreate?: boolean;
  data: IAddOrderControlListRequest;
  editId: number | null;
  handleError: (name: boolean, description: boolean) => void;
}

export const SettingsButtons: FC<IProps> = ({ onClose, data, isCreate, editId, handleError }) => {
  const dispatch = useDispatch();
  const emptyFields = !data.name || !data.description;

  const saveControlList = () => {
    if (emptyFields) {
      handleError(!data.name, !data.description);
    } else {
      const { create, update } = ProposalCheckListThunk;
      if (editId) {
        const updateData = { ...data, id: editId };
        dispatch(update(updateData, onClose));
        onClose();
      } else if (isCreate) {
        dispatch(create(data, onClose));
      }
    }
  };

  const clearFilters = useCallback(() => {
    dispatch(FilterConstructorAction.clearFilter(true));
  }, [dispatch]);

  return (
    <Buttons>
      <Button onClick={saveControlList} id={"save"}>
        Сохранить
      </Button>
      <Button onClick={clearFilters} id={"clear_proposal_control"}>
        Сбросить всё
      </Button>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: grid;
  grid: auto / 230px 230px;
  grid-auto-flow: column;
  grid-auto-columns: 230px;
  padding: 10px;
  border-top: 2px solid ${theme.colors.green};
  grid-gap: 10px;
`;

export const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  padding: 10px 40px;
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        opacity: 0.9;
      }
    `}
`;
