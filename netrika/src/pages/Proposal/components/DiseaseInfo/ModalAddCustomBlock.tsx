import { proposalDiseaseCardSelector } from "module/proposalDiseaseCard/proposalDiseaseCardSelector";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "common/ui/Input/Input";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { useForm } from "react-hook-form";
import { ProposalDiseaseCardThunk } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardThunk";

interface IProps {
  orderId: number;
  chapterId: number;
  callbackAfterClose: () => void;
}

export const ModalAddCustomBlock: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { loadingPopup } = useSelector(proposalDiseaseCardSelector);
  const { register, errors, handleSubmit } = useForm<{ name: string }>();

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = async (data: { name: string }) => {
    await dispatch(
      ProposalDiseaseCardThunk.createCustomBlock(
        {
          id: 0,
          description: data.name,
          idOrder: props.orderId,
          isChecked: false,
          sort: 0,
          chapterId: props.chapterId,
        },
        onClose
      )
    );
  };

  return (
    <ModalContainer
      footer={<ButtonsModalForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      width={800}
      loading={loadingPopup}
      title={"Добавить новый блок"}
      callbackAfterClose={props.callbackAfterClose}
    >
      <Input
        label={"Название"}
        name={"name"}
        ref={register({
          required: "Обязательное поле",
          maxLength: { value: 100, message: "Максимально допустимое число символов: 100" },
        })}
        id={"input_name"}
        fullWidth
        placeholder={"Название"}
        error={!!errors.name}
        errorMsg={errors.name?.message}
      />
    </ModalContainer>
  );
};
