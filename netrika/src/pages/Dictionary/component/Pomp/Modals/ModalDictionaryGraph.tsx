import React, { useCallback } from "react";
import { DictionaryClinrecPompApiRequest } from "../../../../../api/dictionaryClinrecPompApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { Input } from "../../../../../common/ui/Input/Input";
import { ICustomGraph } from "../../../../../common/interfaces/dictionary/IDictionaryPomp";
import styled from "styled-components";
import { DictionaryClinrecPompThunk } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { SelectCustomAsync } from "../../../../../common/ui/Select/SelectCustomAsync";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";

interface IProps {
  idPomp: number;
  currentGraph?: ICustomGraph;
  title: string;
  disabled: boolean;
}

export interface IFormDictionaryClinrec {
  isCustom: boolean;
  graphName: string;
  mkb10: ICustomBaseSelect[];
}

export const ModalDictionaryGraph = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingGraph } = useSelector(dictionaryClinrecPompSelector);

  const { register, errors, handleSubmit, control } = useForm<IFormDictionaryClinrec>({
    defaultValues: {
      graphName: props?.currentGraph?.graphName || "",
    },
  });

  const { field: mkb10 } = useController({
    control,
    name: "mkb10",
    defaultValue: props?.currentGraph?.mkb10?.map((m) => ({ value: m.code, label: `${m.code} - ${m.description}` })),
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const clickSave = (data: IFormDictionaryClinrec) => {
    const value = {
      idPomp: props.idPomp,
      graphName: data.graphName,
      mkb10: data.mkb10?.map((m) => String(m.value)),
    };

    if (props?.currentGraph?.idGraph) {
      dispath(
        DictionaryClinrecPompThunk.updateGraph(
          {
            ...value,
            idPompGraph: props.currentGraph.idGraph,
          },
          onClose
        )
      );
    } else dispath(DictionaryClinrecPompThunk.createGraph(value, onClose));
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={props.disabled || loadingGraph}
          onSubmit={handleSubmit(clickSave)}
          onClose={onClose}
        />
      }
      loading={loadingGraph}
      title={props.title}
      width={800}
    >
      <Content>
        <Input
          label={"Название"}
          isRequired
          fullWidth
          name="graphName"
          ref={register({
            required: "Обязательное поле",
            maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
          })}
          disabled={props.disabled}
          error={!!errors.graphName}
          errorMsg={errors.graphName?.message}
        />
        <SelectCustomAsync
          label={"Диагнозы"}
          isDisabled={props.disabled}
          isError={!!errors?.mkb10}
          htmlID={"field-dictionary"}
          SelectValue={mkb10.value || ""}
          options={[]}
          closeMenuOnSelect={false}
          isSearchable={true}
          onChange={(value) => mkb10.onChange(value)}
          isMulti={true}
          isRelative={true}
          withPaginateApiCallback={async (params) => {
            return new DictionaryClinrecPompApiRequest()
              .getDictionaryClinrecPompDiagnosis(params)
              .then((r) => r.result.items);
          }}
          // @ts-ignore
          errorMsg={errors.mkb10?.message}
        />
      </Content>
    </ModalContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
