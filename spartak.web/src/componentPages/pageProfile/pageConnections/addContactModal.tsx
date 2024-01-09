import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { RelationType } from "../../../api/dto/ChildCard";
import { AddRelationsDto, userRepository } from "../../../api/userRepository";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { InputPhone } from "../../../components/input/inputPhone";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { Alert, FormContent, H1 } from "../../../components/modal/modalUi";
import { CustomSelect } from "../../../components/select/select";
import { LoadingScreen } from "../../../ui/LoadingScreen ";

interface IProps {
  onClose: (needRefresh?: boolean) => void;
}

export const AddContactModal = ({ onClose }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string | undefined>();

  const { handleSubmit, control, setError } = useForm<AddRelationsDto>({ mode: "onBlur" });

  const { field: phone, fieldState: phoneState } = useController({
    control,
    name: "PhoneNumber",
    rules: { required: lang[locale].form.validation.required },
  });
  const { field: type, fieldState: typeState } = useController({
    control,
    name: "RelationType",
    rules: { required: lang[locale].form.validation.required },
  });

  const typeOptions = useMemo(() => {
    return Object.values(RelationType).map((value) => ({
      value,
      label: lang[locale].pageProfileConnections.types[value],
    }));
  }, []);

  const onSubmit: SubmitHandler<AddRelationsDto> = async (data) => {
    setLoading(true);
    try {
      await userRepository.addRelations(data);
      onClose(true);
    } catch (e) {
      const error = e as { Message?: string; Data?: { ErrorCode?: number } };
      error.Message && setAlert(error.Message);
      error.Data?.ErrorCode &&
        setError("PhoneNumber", {
          message:
            lang[locale].pageProfileConnections.contacts[error.Data?.ErrorCode === 1 ? "existPhone" : "wrongPhone"],
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <Modal clickClose={() => onClose()}>
        <ModalLayout onClose={() => onClose()} hideSocial={true}>
          <Container>
            <H1>{lang[locale].modalWindow.modalTitle.contactBinding}</H1>

            {alert && (
              <ContactAlert>
                <WarningTriangle />
                <span>{alert}</span>
              </ContactAlert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormContent>
                <InputPhone
                  label={lang[locale].form.inputs.phone}
                  error={phoneState.error?.message}
                  value={phone.value}
                  onChange={(value) => {
                    setAlert(undefined);
                    phone.onChange(`+${value}`);
                  }}
                  lightStyle
                />

                <CustomSelect
                  label={lang[locale].modalWindow.inputsLabels.typeOfConnection}
                  error={typeState.error?.message}
                  value={typeOptions.find(({ value }) => (value as unknown as RelationType) === type.value)}
                  onChange={type.onChange}
                  options={typeOptions}
                  lightStyle
                />
              </FormContent>
            </form>

            <Button type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
              {lang[locale].form.validation.bindContact}
            </Button>
          </Container>
        </ModalLayout>
      </Modal>
    </>
  );
};

const Container = styled.div`
  width: 18.54vw;
  margin: 0 auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const ContactAlert = styled(Alert)`
  margin: 1.25vw 0 -0.26vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw 0 -3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0 -2.13vw;
  }
`;

const Button = styled(CustomButton)`
  margin-top: 2.91vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 7.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 15vw 0;
  }
`;
