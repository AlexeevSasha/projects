import { IDictionaryUserRole } from "common/interfaces/dictionary/IDictionaryUserRole";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../../../../common/ui/Input/Input";
import { ModalText } from "../../../../common/components/Popup/ui/ModalText";
import { useForm } from "react-hook-form";
import { CheckBox } from "../../../../common/ui/Input/CheckBox";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import styled from "styled-components";

interface IProps {
  onSubmit: (date: IDictionaryUserRole) => void;
  value?: IDictionaryUserRole;
}

export const ModalRoleUser: React.FC<IProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<{ name: string; description: string }>({
    defaultValues: {
      name: props?.value?.sudName || "",
      description: props?.value?.description || "",
    },
  });

  const [accessData, setAccessData] = useState<
    Pick<IDictionaryUserRole, "hasFioAccess" | "seeAllChaptersOrder" | "seeAllChaptersRegister">
  >({
    hasFioAccess: false,
    seeAllChaptersOrder: false,
    seeAllChaptersRegister: false,
  });

  const onChecked = useCallback(
    (key: keyof typeof accessData) => {
      setAccessData((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (!props.value) return;
    setAccessData({
      seeAllChaptersRegister: props.value.seeAllChaptersRegister,
      seeAllChaptersOrder: props.value.seeAllChaptersOrder,
      hasFioAccess: props.value.hasFioAccess,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onSubmit = (values: { name: string; description: string }) => {
    props.onSubmit({
      id: props?.value?.id || 0,
      sudName: values.name,
      description: values.description,
      ...accessData,
    } as IDictionaryUserRole);
    onClose();
  };

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  return (
    <ModalContainer
      footer={<ButtonsModalForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      width={800}
      title={" Настройка справочника ролей пользователя"}
    >
      <Container>
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

        <Input
          label={"Описание"}
          name="description"
          fullWidth
          ref={register({
            required: "error message",
          })}
          error={!!errors.description}
          maxLength={50}
        />

        <ContainerCheckBox>
          <CheckBox
            check={accessData.hasFioAccess}
            checkId={0}
            onCheck={() => onChecked("hasFioAccess")}
            hideMarginLeft
          />
          <ModalText style={{ margin: 0 }}>Доступ к перс. данным</ModalText>
        </ContainerCheckBox>

        <ContainerCheckBox>
          <CheckBox
            check={accessData.seeAllChaptersOrder}
            checkId={0}
            onCheck={() => onChecked("seeAllChaptersOrder")}
            hideMarginLeft
          />
          <ModalText style={{ margin: 0 }}>Доступ ко всем разделам заявки</ModalText>
        </ContainerCheckBox>

        <ContainerCheckBox>
          <CheckBox
            check={accessData.seeAllChaptersRegister}
            checkId={0}
            onCheck={() => onChecked("seeAllChaptersRegister")}
            hideMarginLeft
          />
          <ModalText style={{ margin: 0 }}>Доступ ко всем разделам регистра</ModalText>
        </ContainerCheckBox>
      </Container>
    </ModalContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContainerCheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
