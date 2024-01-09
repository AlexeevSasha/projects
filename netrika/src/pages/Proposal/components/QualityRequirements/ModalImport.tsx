import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ProposalQualityRequirementsThunk } from "../../../../module/proposalQualityRequirements/proposalQualityRequirementsThunk";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";

interface IProps {
  type: "pomp" | "clinrec";
  proposalId: number;
}

export const ModalImport = ({ type, proposalId }: IProps) => {
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onClick = async () => {
    type === "pomp"
      ? await dispatch(ProposalQualityRequirementsThunk.generateOrderPomp(proposalId))
      : await dispatch(ProposalQualityRequirementsThunk.generateOrderClinrec(proposalId));
    onClose();
  };

  return (
    <ModalContainer
      width={500}
      title={
        type === "pomp"
          ? "Импортировать порядки оказания медицинской помощи"
          : "Импортировать клинические рекомендации ВИМИС"
      }
    >
      <ButtonsModalForm textSubmit={"Импортировать"} onSubmit={onClick} onClose={onClose} />
    </ModalContainer>
  );
};
