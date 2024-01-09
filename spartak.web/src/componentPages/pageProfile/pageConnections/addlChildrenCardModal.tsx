import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { RelationType } from "../../../api/dto/ChildCard";
import { UserRelationDto } from "../../../api/dto/UserRelation";
import { BindChildCardDto, userRepository } from "../../../api/userRepository";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { Alert, FormContent, H1 } from "../../../components/modal/modalUi";
import { CustomSelect } from "../../../components/select/select";
import { LoadingScreen } from "../../../ui/LoadingScreen ";

interface IProps {
  onClose: (needRefresh?: boolean) => void;
  allRelations: UserRelationDto[];
}

export const AddChildrenCardModal = ({ onClose, allRelations }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string | undefined>();

  const { handleSubmit, control, setError } = useForm<BindChildCardDto>();

  const { field: number, fieldState: numberState } = useController({
    control,
    name: "Number",
    rules: { required: lang[locale].form.validation.required },
  });

  const { field: scratch, fieldState: scratchState } = useController({
    control,
    name: "ScretchCode",
    rules: { required: lang[locale].form.validation.required },
  });

  const { field: relations, fieldState: relationsState } = useController({
    control,
    name: "RelationId",
    rules: { required: lang[locale].form.validation.required },
  });

  const relationsOptions = useMemo(
    () =>
      allRelations
        .filter(({ Type }) => Type === RelationType.child)
        .map(({ ContactName, Id }) => ({ value: Id, label: ContactName })),
    [relations]
  );

  const onSubmit: SubmitHandler<BindChildCardDto> = async (data) => {
    setLoading(true);
    try {
      await userRepository.bindChildCard(data);
      onClose(true);
    } catch (e) {
      const error = e as { Message?: string; Data?: { ErrorCode?: number } };
      error.Message && setAlert(error.Message);
      error.Data?.ErrorCode === 15 &&
        setError("Number", { message: lang[locale].pageProfileConnections.childrenCards.wrongCard });
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
            <H1>{lang[locale].modalWindow.modalTitle.bindingChildrenCard} </H1>

            {alert && (
              <ContactAlert>
                <WarningTriangle />
                <span>{alert}</span>
              </ContactAlert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormContent>
                <Input
                  lightStyle
                  error={numberState.error?.message}
                  value={number.value}
                  onChange={(value) => {
                    setAlert(undefined);
                    number.onChange(value);
                  }}
                  label={lang[locale].modalWindow.inputsLabels.cardNumber}
                />

                <Input
                  lightStyle
                  error={scratchState.error?.message}
                  value={scratch.value}
                  onChange={scratch.onChange}
                  label={lang[locale].modalWindow.inputsLabels.scratchCode}
                />

                <CustomSelect
                  lightStyle
                  error={relationsState.error?.message}
                  value={relationsOptions.find(({ value }) => value === relations.value)}
                  onChange={relations.onChange}
                  label={lang[locale].modalWindow.inputsLabels.child}
                  options={relationsOptions}
                />
              </FormContent>
            </form>

            <Button type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
              {lang[locale].modalWindow.nameOfButton.bindCard}
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
