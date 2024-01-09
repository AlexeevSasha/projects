import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { DictionaryClinrecPompThunk } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { ModalText } from "../../../../../common/components/Popup/ui/ModalText";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import {
  ICreatePompActivity,
  IDictionaryPompActivity,
} from "../../../../../common/interfaces/dictionary/IDictionaryPomp";
import { theme } from "../../../../../common/styles/theme";
import styled from "styled-components";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { TextArea } from "../../../../../common/ui/Input/TextArea";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  currentActivity?: IDictionaryPompActivity;
  stageCode: string;
  disabled?: boolean;
  idPomp: number;
  idPompGraph: number;
  idPompState: number;
  title: string;
}

interface IFormActivity extends Omit<ICreatePompActivity, "serviceCodes"> {
  serviceCodes: ICustomBaseSelect[];
}

export const ModalPompActivity = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingPompActivity } = useSelector(dictionaryClinrecPompSelector);

  const { errors, handleSubmit, control, register } = useForm<IFormActivity>({
    defaultValues: {
      name: props?.currentActivity?.name || "",
      comment: props?.currentActivity?.comment || "",
      serviceCodes: props?.currentActivity?.serviceCodes?.values?.map((m) => ({ value: m, label: m })) || [],
    },
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const { field: serviceCodes } = useController({
    control,
    name: "serviceCodes",
    defaultValue: props?.currentActivity?.serviceCodes?.values?.map((m) => ({ value: m, label: m })) || [],
  });

  const onSubmit = (data: IFormActivity) => {
    const value = {
      ...data,
      pompId: props.idPomp,
      idPompState: props.idPompState,
      serviceCodes: serviceCodes.value.map((m: ICustomBaseSelect) => m.value),
    };

    if (props?.currentActivity?.id) {
      dispath(
        DictionaryClinrecPompThunk.updatePompActivity(
          {
            ...value,
            idPompActivity: props.currentActivity.id,
          },
          props.idPomp,
          props.idPompGraph,
          props.stageCode,
          onClose
        )
      );
    } else
      dispath(
        DictionaryClinrecPompThunk.createPompActivity(value, props.idPomp, props.idPompGraph, props.stageCode, onClose)
      );
  };

  return (
    <ModalContainer
      loading={loadingPompActivity}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      width={800}
      title={props.title}
    >
      <TextArea
        styleContainer={{ marginTop: 30 }}
        isRequired
        label={"Название"}
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
