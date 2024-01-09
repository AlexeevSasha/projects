import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { DictionaryClinrecPompThunk } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { DictionaryClinrecPompApiRequest } from "../../../../../api/dictionaryClinrecPompApiRequest";
import { IDictionaryStage } from "../../../../../common/interfaces/dictionary/IDictionaryPomp";
import { SelectCustomAsync } from "../../../../../common/ui/Select/SelectCustomAsync";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";

interface IProps {
  idGraph: number;
  idPomp: number;
  stagesLength: number;
  currentStage?: IDictionaryStage;
  title: string;
  disabled: boolean;
}

interface IFormStageCode extends ICustomBaseSelect, IDictionaryStage {}

export interface IFormDictionaryClinrec {
  idGraph: number;
  stageOrder: number;
  stageCode: IFormStageCode;
}

export const ModalDictionaryPompStage = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingPompStage } = useSelector(dictionaryClinrecPompSelector);

  const { errors, handleSubmit, control, getValues } = useForm<IFormDictionaryClinrec>({
    defaultValues: {
      idGraph: props.idGraph,
      stageOrder: props.currentStage?.stageCode ? props.currentStage?.stageOrder : props.stagesLength + 1,
    },
  });

  const { field: stageCode } = useController({
    control,
    name: "stageCode",
    defaultValue: props.currentStage?.stageCode
      ? { ...props.currentStage, label: props.currentStage.stageName, value: props.currentStage.stageCode }
      : "",
    rules: {
      required: "Обязательное поле",
      validate: () => {
        if (!!getValues("stageCode")) {
          if (getValues("stageCode")?.value === props.currentStage?.stageCode) {
            return "Выбранный этап уже существует";
          }
          return true;
        } else return false;
      },
    },
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = (data: IFormDictionaryClinrec) => {
    if (props.currentStage?.stageName) {
      dispath(
        DictionaryClinrecPompThunk.updatePompStage(
          {
            idPomp: props.idPomp,
            idGraph: props.idGraph,
            stageOrder:
              props.currentStage?.stageCode !== undefined ? props.currentStage?.stageOrder : props.stagesLength + 1,
            newStageCode: String(data.stageCode.value),
            currentStageCode: props.currentStage?.stageCode,
          },
          onClose
        )
      );
    } else
      dispath(
        DictionaryClinrecPompThunk.createPompStage(
          {
            idPomp: props.idPomp,
            idGraph: props.idGraph,
            stageOrder: props.stagesLength + 1,
            stageCode: String(data.stageCode.value),
          },
          onClose
        )
      );
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={props.disabled || loadingPompStage}
          onSubmit={handleSubmit(onSubmit)}
          onClose={onClose}
        />
      }
      loading={loadingPompStage}
      title={props.title}
      width={800}
    >
      <SelectCustomAsync
        label={"Этап"}
        isRequired
        isDisabled={props.disabled}
        isError={!!errors?.stageCode}
        htmlID={"field-dictionary"}
        SelectValue={stageCode.value || ""}
        options={[]}
        closeMenuOnSelect={true}
        isSearchable={true}
        onChange={(value) => stageCode.onChange(value)}
        isRelative={true}
        withPaginateApiCallback={async (params) => {
          return new DictionaryClinrecPompApiRequest().getClinrecStsgeList(params).then((r) => r.result.items);
        }}
        // @ts-ignore
        errorMsg={errors.stageCode?.message}
      />
    </ModalContainer>
  );
};
