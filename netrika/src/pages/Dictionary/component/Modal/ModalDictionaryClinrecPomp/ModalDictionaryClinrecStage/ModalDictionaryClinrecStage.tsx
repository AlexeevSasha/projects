import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";
import { ICustomBaseSelect } from "../../../../../../common/interfaces/ISelect";
import { DictionaryClinrecPompThunk } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { dictionaryClinrecPompSelector } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { IDictionaryClinrecStage } from "../../../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { DictionaryClinrecPompApiRequest } from "../../../../../../api/dictionaryClinrecPompApiRequest";
import { SelectCustomAsync } from "../../../../../../common/ui/Select/SelectCustomAsync";
import { ButtonsModalForm } from "../../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  idClinrec: number;
  stagesLength: number;
  currentStage?: IDictionaryClinrecStage;
  disabled: boolean;
  title: string;
}

interface IFormStageCode extends ICustomBaseSelect, IDictionaryClinrecStage {}

export interface IFormDictionaryClinrec {
  idClinrec: number;
  stageOrder: number;
  stageCode: IFormStageCode;
}

export const ModalDictionaryClinrecStage = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingClinrecStage } = useSelector(dictionaryClinrecPompSelector);
  const { errors, handleSubmit, control, getValues } = useForm<IFormDictionaryClinrec>({
    defaultValues: {
      idClinrec: props.idClinrec,
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

  const onSubmit = async (data: IFormDictionaryClinrec) => {
    if (props.currentStage?.stageName) {
      dispath(
        DictionaryClinrecPompThunk.updateClinrecStage(
          {
            idClinrec: props.idClinrec,
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
        DictionaryClinrecPompThunk.createClinrecStage(
          {
            idClinrec: props.idClinrec,
            stageOrder: props.stagesLength + 1,
            stageCode: String(data.stageCode.value),
          },
          onClose
        )
      );
  };

  return (
    <ModalContainer
      loading={loadingClinrecStage}
      width={800}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      title={props.title}
    >
      <SelectCustomAsync
        isRequired
        label={"Этап"}
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
        //@ts-ignore
        errorMsg={errors.stageCode?.message}
      />
    </ModalContainer>
  );
};
