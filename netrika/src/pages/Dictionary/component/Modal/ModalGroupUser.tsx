import { IBaseDictionary } from "common/interfaces/dictionary/IBaseDictionary";
import React, { useCallback } from "react";
import { Input } from "../../../../common/ui/Input/Input";
import { useForm } from "react-hook-form";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  onSave: (date: IBaseDictionary) => void;
  value?: IBaseDictionary;
}

export const ModalGroupUser: React.FC<IProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: props?.value?.name || "",
    },
  });

  const clickSave = async (value: { name: string }) => {
    await props.onSave({
      id: props?.value?.id || 0,
      name: value.name,
    } as IBaseDictionary);
    onClose();
  };

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  return (
    <ModalContainer
      title={"Настройка справочника групп пользователя"}
      width={800}
      footer={<ButtonsModalForm onSubmit={handleSubmit(clickSave)} onClose={() => modal.close()} />}
      style={{ margin: "30px 0" }}
    >
      <Input
        label={"Наименование"}
        fullWidth
        name="name"
        ref={register({
          required: "error message",
        })}
        error={!!errors.name}
        maxLength={50}
      />
    </ModalContainer>
  );
};
