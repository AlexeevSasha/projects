import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { dictionaryClinrecPompSelector } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import {
  ICreateClinrecThesis,
  IDictionaryClinrecActivity,
  IDictionaryClinrecThesis,
} from "../../../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { Input } from "../../../../../../common/ui/Input/Input";
import { FlexContainer } from "../../../../../../common/ui/FlexContainer";
import { SelectCustomAsync } from "../../../../../../common/ui/Select/SelectCustomAsync";
import { DictionaryClinrecPompApiRequest } from "../../../../../../api/dictionaryClinrecPompApiRequest";
import { DictionaryClinrecPompThunk } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { theme } from "../../../../../../common/styles/theme";
import { modal } from "../../../../../../common/helpers/event/modalEvent";
import { ButtonsModalForm } from "../../../../../../common/ui/Button/ButtonsModalForm";
import { TextArea } from "../../../../../../common/ui/Input/TextArea";
import { ModalText } from "../../../../../../common/components/Popup/ui/ModalText";
import { ModalContainer } from "../../../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  currentThesis?: IDictionaryClinrecThesis;
  disabled: boolean;
  idClinrec: number;
  stageCode: string;
  callbackAfterClose?: () => void;
  title: string;
}

export const ModalDictionaryClinrecThesis = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingClinrecThesis, activityForModal } = useSelector(dictionaryClinrecPompSelector);

  const [activity, setActivity] = useState<IDictionaryClinrecActivity[] | null>(
    props?.currentThesis?.thesisCode ? null : []
  );
  const { errors, handleSubmit, control, register } = useForm<ICreateClinrecThesis>({
    defaultValues: {
      thesisText: props.currentThesis?.thesisText || "",
      comment: props.currentThesis?.comment || "",
      convincing: props.currentThesis?.convincing || "",
      evidential: props.currentThesis?.evidential || "",
      stadia: props.currentThesis?.stadia || "",
      tnm: props.currentThesis?.tnm || "",
      conditionParam: props.currentThesis?.conditionParam || "",
      businessRuleParam: props.currentThesis?.businessRuleParam || "",
    },
  });

  useEffect(() => {
    if (props?.currentThesis && Array.isArray(props?.currentThesis?.activities)) {
      setActivity(props.currentThesis.activities);
    } else if (activityForModal && props.currentThesis?.thesisCode) setActivity(activityForModal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForModal, props.currentThesis?.activities]);

  const { field: triggerPointCodes } = useController({
    control,
    name: "triggerPointCodes",
    defaultValue: props.currentThesis?.triggerPoints?.map((tr) => ({ label: tr.description, value: tr.code })) || "",
  });

  const closeModal = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = (data: ICreateClinrecThesis) => {
    const value = {
      ...data,
      stageCode: props.stageCode,
      idClinrec: props.idClinrec,
      triggerPointCodes: Array.isArray(triggerPointCodes?.value)
        ? triggerPointCodes?.value?.map((tr) => Number(tr.value))
        : undefined,
    };
    if (props.currentThesis?.thesisCode) {
      dispath(
        DictionaryClinrecPompThunk.updateClinrecThesis(
          {
            thesisCode: props.currentThesis?.thesisCode,
            ...value,
          },
          closeModal
        )
      );
    } else dispath(DictionaryClinrecPompThunk.createClinrecThesis(value, closeModal));
  };

  return (
    <ModalContainer
      loading={loadingClinrecThesis}
      footer={
        <ButtonsModalForm
          disabledSubmit={props.disabled || loadingClinrecThesis}
          onSubmit={handleSubmit(onSubmit)}
          onClose={closeModal}
        />
      }
      callbackAfterClose={props.callbackAfterClose}
      title={props.title}
      width={800}
    >
      <TextArea
        styleContainer={{ marginTop: 10 }}
        isRequired
        label={"Название"}
        name="thesisText"
        ref={register({
          required: "Обязательное поле",
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        disabled={props.disabled}
        error={!!errors.thesisText}
        errorMsg={errors.thesisText?.message}
      />

      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Комментарий"}
        name="comment"
        ref={register({
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        disabled={props.disabled}
        error={!!errors.comment}
        errorMsg={errors.comment?.message}
      />

      {props.currentThesis?.thesisCode && activity && (
        <>
          <StyledTextModal>Список вмешательств</StyledTextModal>
          <ContentBlock disabled={props.disabled}>
            <ul style={{ paddingLeft: "0", margin: 0 }}>
              {!!activity?.flatMap((i) => i.medicationCodes?.display).length
                ? activity
                    ?.flatMap((i) => i.medicationCodes?.display)
                    ?.map((act) => (
                      <li key={act} style={{ listStyleType: "unset", marginLeft: "10px" }}>
                        {act}
                        <br />
                      </li>
                    ))
                : ""}
              {!!activity?.flatMap((i) => i.serviceCodes?.display).length
                ? activity
                    ?.flatMap((i) => i.serviceCodes?.display)
                    ?.map((act) => (
                      <li key={act} style={{ listStyleType: "unset", marginLeft: "10px" }}>
                        {act}
                        <br />
                      </li>
                    ))
                : ""}
            </ul>
          </ContentBlock>
        </>
      )}

      <FlexContainer direction={"row"} justify={"space-between"}>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={"Уровень убедительности"}
            fullWidth
            name="convincing"
            ref={register({
              maxLength: {
                value: 1,
                message: "Максимально допустимое число символов: 1",
              },
            })}
            disabled={props.disabled}
            maxLength={100}
            error={!!errors.convincing}
            errorMsg={errors.convincing?.message}
          />
        </FlexContainer>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={"Уровень доказательности"}
            fullWidth
            name="evidential"
            ref={register({
              maxLength: {
                value: 3,
                message: "Максимально допустимое число символов: 3",
              },
            })}
            disabled={props.disabled}
            error={!!errors.evidential}
            errorMsg={errors.evidential?.message}
          />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer direction={"row"} justify={"space-between"}>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={"Стадия"}
            fullWidth
            name="stadia"
            ref={register({
              maxLength: {
                value: 200,
                message: "Максимально допустимое число символов: 200",
              },
            })}
            disabled={props.disabled}
            error={!!errors.stadia}
            errorMsg={errors.stadia?.message}
          />
        </FlexContainer>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={"TNM"}
            fullWidth
            name="tnm"
            ref={register({
              maxLength: {
                value: 200,
                message: "Максимально допустимое число символов: 200",
              },
            })}
            disabled={props.disabled}
            error={!!errors.tnm}
            errorMsg={errors.tnm?.message}
          />
        </FlexContainer>
      </FlexContainer>

      <StyledTextModal>Триггерная точка</StyledTextModal>
      <SelectCustomAsync
        isMulti
        isError={!!errors.triggerPointCodes}
        isDisabled={props.disabled}
        htmlID={"triggerPointCodes"}
        SelectValue={triggerPointCodes.value || ""}
        options={[]}
        closeMenuOnSelect={true}
        isSearchable={true}
        onChange={(value) => triggerPointCodes.onChange(value)}
        isRelative={true}
        withPaginateApiCallback={async (params) => {
          return new DictionaryClinrecPompApiRequest().getClinrecTriggerPoint(params).then((r) => r.result.items);
        }}
      />

      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Условие применения"}
        name="businessRuleParam"
        ref={register({
          maxLength: {
            value: 1000,
            message: "Максимально допустимое число символов: 1000",
          },
        })}
        disabled={props.disabled}
        error={!!errors.businessRuleParam}
        errorMsg={errors.businessRuleParam?.message}
      />

      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Условие проверки"}
        name="conditionParam"
        ref={register({
          maxLength: {
            value: 1000,
            message: "Максимально допустимое число символов: 1000",
          },
        })}
        disabled={props.disabled}
        error={!!errors.conditionParam}
        errorMsg={errors.conditionParam?.message}
      />
    </ModalContainer>
  );
};

const StyledTextModal = styled(ModalText)`
  margin-top: 10px;
  margin-bottom: 10px;
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
