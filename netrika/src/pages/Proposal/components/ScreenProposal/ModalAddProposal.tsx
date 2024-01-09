import { validateNameRegister } from "common/constants/validate";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IAddOrderRequest } from "../../../../common/interfaces/order/IAddOrderRequest";
import { IRegisterGroup } from "../../../../common/interfaces/register/IRegisterGroup";
import { Input } from "../../../../common/ui/Input/Input";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import styled from "styled-components";
import { modal } from "../../../../common/helpers/event/modalEvent";

interface IProps {
  onSave: (date: IAddOrderRequest) => void;
  option: IRegisterGroup[];
}

export const ModalAddProposal: React.FC<IProps> = (props) => {
  const [register, setRegister] = useState<ICustomSelect>();
  const [name, setName] = useState<string>();
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [options, setOptions] = useState<ICustomSelect[]>([] as ICustomSelect[]);

  const clickSave = async () => {
    setIsSubmit(true);
    if (!isError && register && name) {
      await props.onSave({
        authorId: 1,
        authorName: "Новый пользователь",
        name: name.trim(),
        registerGroupId: register.value,
      } as IAddOrderRequest);
      closeModal();
    } else {
      setIsError(true);
    }
  };

  const onSelect = useCallback((value: ICustomSelect) => {
    setRegister(value);
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validateNameRegister(event.target.value.trim())) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setName(event.target.value);
  };

  const closeModal = useCallback(() => {
    setIsError(false);
    modal.close();
  }, []);

  useEffect(() => {
    if (props.option.length > 0) {
      setRegister({ value: props.option[0].id, label: props.option[0].name });
      setOptions(
        props.option.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    }
  }, [props.option]);

  return (
    <ModalContainer
      footer={<ButtonsModalForm onSubmit={clickSave} onClose={closeModal} />}
      width={800}
      title={"Добавление нового регистра"}
    >
      <Container>
        <Input
          label={"Наименование регистра"}
          isRequired
          id={"input_name_order"}
          error={isSubmit && isError}
          placeholder={"Наименование регистра"}
          onChange={onChange}
          fullWidth
          value={name}
          maxLength={80}
        />

        <CustomSelect
          label={"Группа регистра"}
          htmlID={"addProposal_group_register"}
          isRelative
          SelectValue={register}
          options={options}
          onChange={onSelect}
        />
      </Container>
    </ModalContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
