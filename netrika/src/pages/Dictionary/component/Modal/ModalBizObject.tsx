import React, { useCallback } from "react";
import { IRegisterBizObjDictionary } from "../../../../common/interfaces/register/IRegisterBizObjDictionary";
import { Input } from "../../../../common/ui/Input/Input";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  onSubmit: (date: IRegisterBizObjDictionary) => void;
  value?: IRegisterBizObjDictionary;
}

export const ModalBizObject: React.FC<IProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<{ name: string; description: string }>({
    defaultValues: {
      name: props?.value?.name || "",
      description: props?.value?.description || "",
    },
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = async (values: { name: string; description: string }) => {
    await props.onSubmit({
      id: props.value && props.value.id ? props.value.id : 0,
      name: values.name,
      description: values.description,
    });

    onClose();
  };

  return (
    <ModalContainer
      title={"Настройка справочник объектов группировки полей регистра"}
      width={800}
      footer={<ButtonsModalForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
    >
      <Content>
        <Input
          id={"biz-name"}
          label={"Наименование"}
          fullWidth
          name="name"
          ref={register({
            required: "error message",
          })}
          error={!!errors.name}
          maxLength={100}
        />
        <Input
          id={"biz-description"}
          label={"Описание"}
          name="description"
          fullWidth
          ref={register({
            required: "error message",
          })}
          error={!!errors.description}
          maxLength={100}
        />
      </Content>
    </ModalContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
