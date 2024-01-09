import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { ModalText } from "../../../../../../common/components/Popup/ui/ModalText";
import styled from "styled-components";
import { dictionaryClinrecPompSelector } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import {
  IDictionaryPompActivity,
  IDictionaryState,
} from "../../../../../../common/interfaces/dictionary/IDictionaryPomp";
import { TextArea } from "../../../../../../common/ui/Input/TextArea";
import { theme } from "../../../../../../common/styles/theme";
import { SelectCustomAsync } from "../../../../../../common/ui/Select/SelectCustomAsync";
import { DictionaryClinrecPompApiRequest } from "../../../../../../api/dictionaryClinrecPompApiRequest";
import { FlexContainer } from "../../../../../../common/ui/FlexContainer";
import { IconContainerFloatingmes } from "../../../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../../../common/lang/ru";
import { FromOrToStateField } from "./FromOrToStateField";
import { IFromOrToStateForForm } from "../../../../../../common/interfaces/IPompState";
import { ButtonCreateElem } from "../../../../../../common/ui/Button/ButtonCreateElem";
import { DictionaryClinrecPompThunk } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { ICustomSelect } from "../../../../../../common/interfaces/ISelect";
import { IconCross } from "../../../../../../common/components/Icon/IconCross";
import { IconArrow } from "../../../../../../common/components/Icon/IconArrow";
import { ButtonsModalForm } from "../../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../../../common/components/Popup/components/ModalContainer";
import { DictionaryClinrecPompAction } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompAction";

interface IProps {
  idGraph: number;
  idPomp: number;
  stageCode: string;
  currentState?: IDictionaryState;
  disabled: boolean;
  title: string;
}

export interface IFormDictionaryState extends Omit<IDictionaryState, "fromState" | "toState"> {
  triggerPointCodes: ICustomSelect[] | "";
  fromState: IFromOrToStateForForm[];
  toState: IFromOrToStateForForm[];
}

export const ModalDictionaryPompState = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingPompState, activityForModal, loadingListTimeoutUnit } = useSelector(dictionaryClinrecPompSelector);

  const [isClickedPrev, setIsClickedPrev] = useState<boolean>(false);
  const [isClickedNext, setIsClickedNext] = useState<boolean>(false);
  const [activity, setActivity] = useState<IDictionaryPompActivity[] | null>(props?.currentState?.idState ? null : []);

  useEffect(() => {
    if (props.currentState && Array.isArray(props.currentState?.activities)) {
      setActivity(props.currentState?.activities);
    } else if (activityForModal && props.currentState?.idState) setActivity(activityForModal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForModal, props.currentState?.activities]);

  const { errors, handleSubmit, control, register, watch } = useForm<IFormDictionaryState>({
    defaultValues: {
      stateName: props.currentState?.stateName || "",
      description: props.currentState?.description || "",
      conditionParam: props.currentState?.conditionParam || "",
      stateLabel: props.currentState?.stateLabel || "",
      businessRuleParam: props.currentState?.businessRuleParam || "",
      fromState:
        props.currentState?.fromState?.map((fr) => ({
          associatedStateIdSelect: { value: fr.associatedStateId, label: fr.associatedStateDisplay },
          timeout: fr.timeout,
          timeoutUnit: fr.timeoutUnit,
        })) || [],
      toState:
        props.currentState?.toState?.map((fr) => ({
          associatedStateIdSelect: { value: fr.associatedStateId, label: fr.associatedStateDisplay },
          timeout: fr.timeout,
          timeoutUnit: fr.timeoutUnit,
        })) || [],
    },
  });

  const { field: triggerPointCodes } = useController({
    control,
    name: "triggerPointCodes",
    defaultValue: props.currentState?.triggerPoints?.map((tr) => ({ label: tr.description, value: tr.code })) || "",
  });
  const { fields: fromState, append: fromStateAppend, remove: fromStateRemove } = useFieldArray({
    control,
    name: "fromState",
  });
  const { fields: toState, append: toStateAppend, remove: toStateRemove } = useFieldArray({
    control,
    name: "toState",
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSumbit = (data: IFormDictionaryState) => {
    const value = {
      ...data,
      idPomp: props.idPomp,
      idPompGraph: props.idGraph,
      stageCode: props.stageCode,
      triggerPointCodes: Array.isArray(data.triggerPointCodes)
        ? data.triggerPointCodes?.map((tr) => Number(tr.value))
        : undefined,
      fromState:
        data.fromState?.map((fs) => ({
          associatedStateId: Number(fs.associatedStateIdSelect?.value),
          timeout: fs.timeout || null,
          timeoutUnit: Number(fs.timeoutUnit) || null,
        })) || [],
      toState:
        data.toState?.map((fs) => ({
          associatedStateId: Number(fs.associatedStateIdSelect?.value),
          timeout: fs.timeout || null,
          timeoutUnit: Number(fs.timeoutUnit) || null,
        })) || [],
    };

    if (props.currentState?.idState) {
      dispath(
        DictionaryClinrecPompThunk.updatePompState(
          {
            ...value,
            idPompState: props.currentState.idState,
          },
          props.idPomp,
          onClose
        )
      );
    } else {
      dispath(DictionaryClinrecPompThunk.createPompState(value, props.idPomp, onClose));
    }
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={props.disabled || loadingPompState}
          onSubmit={handleSubmit(onSumbit)}
          onClose={onClose}
        />
      }
      loading={loadingPompState || !activity || loadingListTimeoutUnit}
      width={800}
      title={props.title}
      callbackAfterClose={() => {
        dispath(DictionaryClinrecPompAction.activityForModal(null));
      }}
    >
      <TextArea
        styleContainer={{ marginTop: 10 }}
        isRequired
        label={"Название"}
        name="stateName"
        disabled={props.disabled}
        error={!!errors.stateName}
        ref={register({
          required: "Обязательное поле",
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        errorMsg={errors.stateName?.message}
      />
      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Описание"}
        name="description"
        style={{ resize: "vertical", height: "40px" }}
        ref={register({
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        disabled={props.disabled}
        error={!!errors.description}
        errorMsg={errors.description?.message}
      />
      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Ярлык"}
        style={{ resize: "vertical", height: "40px" }}
        ref={register({
          maxLength: { value: 250, message: "Максимально допустимое число символов: 250" },
        })}
        error={!!errors.stateLabel}
        disabled={props.disabled}
        name={"stateLabel"}
        placeholder={"Ярлык"}
        errorMsg={errors.stateLabel?.message}
      />

      {activity && (
        <>
          <StyledTextModal>Список вмешательств</StyledTextModal>
          <ContentBlock disabled={props.disabled}>
            <ul style={{ paddingLeft: "0", margin: 0 }}>
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

      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Условие применения"}
        name="conditionParam"
        ref={register({
          maxLength: {
            value: 1000,
            message: "Максимально допустимое число символов: 1000",
          },
        })}
        disabled={props.disabled}
        error={!!errors?.conditionParam}
        errorMsg={errors.conditionParam?.message}
      />

      <TextArea
        styleContainer={{ marginTop: 10 }}
        label={"Условие проверки"}
        name="businessRuleParam"
        ref={register({
          maxLength: {
            value: 1000,
            message: "Максимально допустимое число символов: 1000",
          },
        })}
        disabled={props.disabled}
        error={!!errors?.businessRuleParam}
        errorMsg={errors.businessRuleParam?.message}
      />
      <StyledTextModal>Триггерная точка</StyledTextModal>
      <SelectCustomAsync
        isMulti
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
      <StyledTextModalWithIcon onClick={() => setIsClickedPrev(!isClickedPrev)}>
        Предыдущий подэтап
        <IconContainer>
          <IconArrow rotate={isClickedPrev ? "" : "270deg"} />
        </IconContainer>
      </StyledTextModalWithIcon>
      <FlexContainer direction={"column"} fullWidth alignItems={"start"}>
        {isClickedPrev &&
          fromState?.map((fSt, index) => (
            <CustomStackWithCross direction={"row"} id={fSt.id} key={index} fullWidth>
              {!props.disabled && (
                <IconContainerFloatingmes
                  title={ru.floatingmes.delete}
                  position={"left"}
                  onClick={() => {
                    fromStateRemove(index);
                  }}
                >
                  <IconCross />
                </IconContainerFloatingmes>
              )}

              <FromOrToStateField
                watchObj={watch("fromState")[index]}
                errors={errors}
                key={fSt.id}
                graphId={props.idGraph}
                disabled={props.disabled}
                item={fSt as IFromOrToStateForForm}
                index={index}
                formKeyName={"fromState"}
                control={control}
              />
            </CustomStackWithCross>
          ))}
        {!props.disabled && (
          <ButtonCreateElem
            onClick={() => {
              !isClickedPrev && setIsClickedPrev(true);
              fromStateAppend({});
            }}
            text={"Добавить предыдущий подэтап"}
          />
        )}
      </FlexContainer>
      <StyledTextModalWithIcon onClick={() => setIsClickedNext(!isClickedNext)}>
        Следующий подэтап{" "}
        <IconContainer>
          <IconArrow rotate={isClickedNext ? "" : "270deg"} />
        </IconContainer>
      </StyledTextModalWithIcon>
      <FlexContainer direction={"column"} fullWidth alignItems={"start"}>
        {isClickedNext &&
          toState?.map((TSt, index) => (
            <CustomStackWithCross direction={"row"} id={TSt.id} key={TSt.id} fullWidth>
              {!props.disabled && (
                <IconContainerFloatingmes
                  title={ru.floatingmes.delete}
                  position={"left"}
                  onClick={() => {
                    toStateRemove(index);
                  }}
                >
                  <IconCross />
                </IconContainerFloatingmes>
              )}

              <FromOrToStateField
                watchObj={watch("toState")[index]}
                errors={errors}
                key={TSt.id}
                graphId={props.idGraph}
                control={control}
                disabled={props.disabled}
                item={TSt as IFromOrToStateForForm}
                formKeyName={"toState"}
                index={index}
              />
            </CustomStackWithCross>
          ))}
        {!props.disabled && activity && (
          <ButtonCreateElem
            onClick={() => {
              !isClickedNext && setIsClickedNext(true);
              toStateAppend({});
            }}
            text={"Добавить следующий подэтап"}
          />
        )}
      </FlexContainer>
    </ModalContainer>
  );
};
const StyledTextModal = styled(ModalText)`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
`;
const StyledTextModalWithIcon = styled(StyledTextModal)`
  cursor: pointer;
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

const CustomStackWithCross = styled(FlexContainer)`
  position: relative;

  .iconFloatingmes {
    position: absolute;
    right: 6px;
    top: 8px;
  }
`;
const IconContainer = styled.div`
  padding: 5px 8px;
  display: flex;
  align-items: center;
`;
