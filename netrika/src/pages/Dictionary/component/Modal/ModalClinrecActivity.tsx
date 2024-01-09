import React, { useCallback } from "react";
import { ModalText } from "../../../../common/components/Popup/ui/ModalText";
import styled from "styled-components";
import { theme } from "../../../../common/styles/theme";
import {
  ICreateClinrecActivity,
  IDictionaryClinrecActivity,
} from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { useController, useForm } from "react-hook-form";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { ICustomBaseSelect } from "../../../../common/interfaces/ISelect";
import { TextArea } from "../../../../common/ui/Input/TextArea";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  currentActivity?: IDictionaryClinrecActivity;
  stageCode: string;
  disabled?: boolean;
  clinrecId: number;
  thesisClinrecCode: string;
  title: string;
}

interface IFormActivity extends Omit<ICreateClinrecActivity, "serviceCodes" | "medicationCodes"> {
  medicationCodes: ICustomBaseSelect[];
  serviceCodes: ICustomBaseSelect[];
}

export const ModalClinrecActivity = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingClinrecActivity } = useSelector(dictionaryClinrecPompSelector);

  const { errors, handleSubmit, control, register } = useForm<IFormActivity>({
    defaultValues: {
      name: props?.currentActivity?.name || "",
      comment: props?.currentActivity?.comment || "",
      medicationCodes: props?.currentActivity?.medicationCodes?.values?.map((m) => ({ value: m, label: m })) || [],
      serviceCodes: props?.currentActivity?.serviceCodes?.values?.map((m) => ({ value: m, label: m })) || [],
    },
  });

  const { field: serviceCodes } = useController({
    control,
    name: "serviceCodes",
    defaultValue: props?.currentActivity?.serviceCodes?.values?.map((m) => ({ value: m, label: m })) || [],
  });
  const { field: medicationCodes } = useController({
    control,
    name: "medicationCodes",
    defaultValue: props?.currentActivity?.medicationCodes?.values?.map((m) => ({ value: m, label: m })) || [],
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = async (data: IFormActivity) => {
    const activity = {
      ...data,
      clinrecId: props.clinrecId,
      thesisClinrecCode: props.thesisClinrecCode,
      medicationCodes: medicationCodes.value.map((m: ICustomBaseSelect) => m.value),
      serviceCodes: serviceCodes.value.map((m: ICustomBaseSelect) => m.value),
    };
    if (props?.currentActivity?.id) {
      dispath(
        DictionaryClinrecPompThunk.updateClinrecActivity(
          props.stageCode,
          {
            ...activity,
            idClinrecActivity: props.currentActivity.id,
          },
          onClose
        )
      );
    } else dispath(DictionaryClinrecPompThunk.createClinrecActivity(props.stageCode, activity, onClose));
  };

  return (
    <ModalContainer
      title={props.title}
      loading={loadingClinrecActivity}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      width={800}
    >
      <TextArea
        label={"Название"}
        isRequired
        name="name"
        ref={register({
          required: "Обязательное поле",
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        disabled={props.disabled}
        error={!!errors.name}
        errorMsg={errors.name?.message}
      />
      <TextArea
        styleContainer={{ marginTop: 30 }}
        label={"Комментарий"}
        name="comment"
        ref={register({
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        disabled={props.disabled}
        error={!!errors.comment}
        errorMsg={errors.comment?.message}
      />
      {(!!props.currentActivity?.medicationCodes?.display?.length ||
        !!props.currentActivity?.serviceCodes?.display?.length) && (
        <>
          <StyledTextModal>Список вмешательств</StyledTextModal>
          <ContentBlock disabled={props.disabled}>
            <ul style={{ paddingLeft: "0", margin: 0 }}>
              {props.currentActivity?.medicationCodes?.display?.map((i) => (
                <li key={i} style={{ listStyleType: "unset", marginLeft: "10px" }}>
                  {i}
                  <br />
                </li>
              ))}
              {props.currentActivity?.serviceCodes?.display?.map((i) => (
                <li key={i} style={{ listStyleType: "unset", marginLeft: "10px" }}>
                  {i}
                  <br />
                </li>
              ))}
            </ul>
          </ContentBlock>
        </>
      )}
      <StyledTextModal>Медицинские услуги</StyledTextModal>
      <CustomSelect
        htmlID={"Creatable_select_serviceCode" + props.currentActivity?.id}
        isDisabled={props.disabled}
        placeholder={"Введите строку..."}
        isCreatable
        isMulti
        isSearchable
        SelectValue={serviceCodes.value as unknown}
        options={[]}
        onChange={serviceCodes.onChange}
      />
      <ModalText error={false} />
      <StyledTextModal>Лекарственные препараты</StyledTextModal>
      <CustomSelect
        htmlID={"Creatable_select_medicationCodes" + props.currentActivity?.id}
        isDisabled={props.disabled}
        placeholder={"Введите строку..."}
        isCreatable
        isMulti
        isSearchable
        SelectValue={medicationCodes.value as unknown}
        options={[]}
        onChange={medicationCodes.onChange}
      />
    </ModalContainer>
  );
};

const StyledTextModal = styled(ModalText)`
  color: ${theme.colors.black};
  font-weight: normal;
`;

const ContentBlock = styled.div<{ disabled?: boolean }>`
  min-height: 21px;
  max-height: 500px;
  overflow: auto;
  padding: 5px 10px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "rgb(241,241,241)" : "initial")};
`;
