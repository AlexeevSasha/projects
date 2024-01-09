import React, { useCallback } from "react";
import { Input } from "../../../../common/ui/Input/Input";
import { IBaseDictionary } from "../../../../common/interfaces/dictionary/IBaseDictionary";
import { useForm } from "react-hook-form";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";

interface IProps {
  onSubmit: (date: IBaseDictionary) => void;
  value?: IBaseDictionary;
}

export const ModalRegisterGroup: React.FC<IProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: props?.value?.name || "",
    },
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = async (value: { name: string }) => {
    await props.onSubmit({
      id: props?.value?.id || 0,
      name: value.name.trim(),
    } as IBaseDictionary);
    onClose();
  };

  return (
    <ModalContainer
      footer={<ButtonsModalForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      width={800}
      title={"Настройка справочника групп регистров"}
    >
      <Input
        label={"Наименование"}
        fullWidth
        name="name"
        ref={register({
          required: "error message",
        })}
        error={!!errors.name}
        maxLength={100}
        id={"input_name"}
      />
    </ModalContainer>
  );
};
