import React, { useCallback, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Input } from "../../../../../common/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { RangeSwitch } from "../../../../DiseaseCard/component/RangeSwitch";
import { DictionaryClinrecPompThunk } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { CreateClinrecBasedOnFields } from "./CreateClinrecBasedOnFields";
import { DictionaryClinrecPompApiRequest } from "../../../../../api/dictionaryClinrecPompApiRequest";
import { IDictionaryClinrec } from "../../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { SelectCustomAsync } from "../../../../../common/ui/Select/SelectCustomAsync";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import styled from "styled-components";

interface IProps {
  curretClinrec?: IDictionaryClinrec;
  disabled: boolean;
}

export interface IFormDictionaryClinrec {
  isCustom: boolean;
  clinrecName: string;
  name?: string;
  mkb10?: ICustomBaseSelect[];
  status?: ICustomBaseSelect;
  usageStatus?: ICustomBaseSelect;
  ageGroup?: ICustomBaseSelect[];
  revisionBdate?: number;
  revisionEdate?: number;
  revisionId?: number;
  version?: number;
  idRubricatorMz?: number;
  BasedOn?: ICustomBaseSelect;
}

export const ModalDictionaryClinrec = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingClinrecSelects, loadingClinrecSelectsClinrecList, clinrecSelects } = useSelector(
    dictionaryClinrecPompSelector
  );
  const [createBasedOn, setCreateBasedOn] = useState<boolean>(false);

  const { register, errors, handleSubmit, control, getValues, setValue, setError } = useForm<IFormDictionaryClinrec>({
    defaultValues: {
      name: "",
      clinrecName: props?.curretClinrec?.clinrecName || "",
      revisionBdate: props?.curretClinrec?.revisionBdate ? Number(props.curretClinrec.revisionBdate) : undefined,
      revisionEdate: props?.curretClinrec?.revisionEdate ? Number(props.curretClinrec.revisionEdate) : undefined,
      revisionId: props?.curretClinrec?.revisionId || undefined,
      version: props?.curretClinrec?.version || undefined,
      idRubricatorMz: props?.curretClinrec?.idRubricatorMz || undefined,
    },
  });

  const { field: mkb10 } = useController({
    control,
    name: "mkb10",
    rules: {
      required: !createBasedOn && "Обязательное поле",
    },
    defaultValue: props?.curretClinrec?.mkb10Values?.map((m) => ({ value: m.code, label: m.description })),
  });
  const { field: ageGroup } = useController({
    control,
    name: "ageGroup",
    defaultValue: props?.curretClinrec?.ageGroup
      ? props?.curretClinrec?.ageGroup?.map((age) => ({ label: age.description, value: age.code }))
      : undefined,
  });
  const { field: status } = useController({
    control,
    name: "status",
    defaultValue:
      clinrecSelects?.clinrecStatus.find((f) => props?.curretClinrec?.status === Number(f.value)) ||
      clinrecSelects?.clinrecStatus[0],
  });
  const { field: usageStatus } = useController({
    control,
    name: "usageStatus",
    defaultValue:
      clinrecSelects?.clinrecUsageStatus.find((f) => props?.curretClinrec?.usageStatus === Number(f.value)) ||
      clinrecSelects?.clinrecUsageStatus[0],
  });
  const { field: version } = useController({
    control,
    name: "version",
    rules: {
      max: { value: 9999, message: "Максимально доступное число 9999" },
      min: { value: 0, message: "Минимально доступное число 0" },
      maxLength: { value: 4, message: "Максимально допустимое число символов: 4" },
      valueAsNumber: true,
    },
    defaultValue: props?.curretClinrec?.version,
  });
  const { field: idRubricatorMz } = useController({
    control,
    name: "idRubricatorMz",
    rules: {
      max: { value: 99999, message: "Максимально доступное число 9999" },
      min: { value: 0, message: "Минимально доступное число 0" },
      maxLength: { value: 5, message: "Максимально допустимое число символов: 5" },
      valueAsNumber: true,
    },
    defaultValue: props?.curretClinrec?.idRubricatorMz,
  });

  const closeModal = useCallback(() => {
    modal.close();
  }, []);

  const clickSave = (data: IFormDictionaryClinrec) => {
    if (createBasedOn) {
      if (data.name && data.BasedOn?.value) {
        dispath(DictionaryClinrecPompThunk.createClinrecBasedOn(Number(data.BasedOn?.value), data.name, closeModal));
      } else {
        !data.name && setError("name", { type: "custom", message: "Обязательное поле" });
        !data.BasedOn?.value && setError("BasedOn", { type: "custom", message: "Обязательное поле" });
      }
    } else {
      delete data.name;
      delete data.BasedOn;
      if (props?.curretClinrec?.idClinrec) {
        dispath(
          DictionaryClinrecPompThunk.editClinrec(
            {
              ...data,
              mkb10: data.mkb10?.map((i) => String(i.value)),
              usageStatus: data.usageStatus?.value
                ? data.usageStatus?.value === "null"
                  ? null
                  : Number(data.usageStatus?.value)
                : undefined,
              status: data.status?.value
                ? data.status?.value === "null"
                  ? null
                  : Number(data.status?.value)
                : undefined,
              ageGroup: data.ageGroup?.map((i) => Number(i.value)),
              isCustom: true,
              idClinrec: props.curretClinrec.idClinrec,
              sort: props.curretClinrec.sort || 0,
              revisionBdate: String(data.revisionBdate),
              revisionEdate: String(data.revisionEdate),
            },
            closeModal
          )
        );
      } else
        dispath(
          DictionaryClinrecPompThunk.createClinrec(
            {
              ...data,
              mkb10: data.mkb10?.map((i) => String(i.value)),
              usageStatus: data.usageStatus?.value
                ? data.usageStatus?.value === "null"
                  ? null
                  : Number(data.usageStatus?.value)
                : undefined,
              status: data.status?.value
                ? data.status?.value === "null"
                  ? null
                  : Number(data.status?.value)
                : undefined,
              ageGroup: data.ageGroup?.map((i) => Number(i.value)),
              isCustom: true,
              sort: 0,
              revisionBdate: String(data.revisionBdate),
              revisionEdate: String(data.revisionEdate),
            },
            closeModal
          )
        );
    }
  };

  return (
    <ModalContainer
      loading={loadingClinrecSelects || loadingClinrecSelectsClinrecList}
      footer={
        <ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(clickSave)} onClose={closeModal} />
      }
      width={800}
      title={
        props?.curretClinrec?.idClinrec ? "Настройка клинической рекомендации" : "Добавить клиническую рекомендацию"
      }
    >
      {!props?.curretClinrec?.idClinrec && (
        <RangeSwitch
          leftText={"Создать новую"}
          rightText={"Создать на основе существующей"}
          leftTextWidth={"110px"}
          rightTextWidth={"252px"}
          maxWidth={"432px"}
          onChange={(value) => {
            setCreateBasedOn(value);
            setValue("iscustom", !value);
          }}
          defaultValue={createBasedOn}
        />
      )}
      {createBasedOn ? (
        <CreateClinrecBasedOnFields control={control} errors={errors} />
      ) : (
        <Content>
          <Input
            styleContainer={{ marginTop: 10 }}
            isRequired
            label={"Название"}
            fullWidth
            name={"clinrecName"}
            ref={register({
              required: !createBasedOn && "Обязательное поле",
              maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
            })}
            disabled={props.disabled}
            error={!!errors.clinrecName}
            errorMsg={errors.clinrecName?.message}
          />
          <FlexContainer direction={"row"} justify={"space-between"}>
            <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
              <Input
                label={"Номер"}
                disabled={props.disabled}
                type={"text"}
                fullWidth
                name="idRubricatorMz"
                value={idRubricatorMz.value}
                onChange={(event) => {
                  const reg = new RegExp(/^[\d ]{0,1000}$/);
                  reg.test(event.currentTarget.value)
                    ? idRubricatorMz.onChange(event.currentTarget.value)
                    : idRubricatorMz.onChange(event.currentTarget.value.slice(0, -1));
                }}
                error={!!errors.idRubricatorMz}
                maxLength={5}
                errorMsg={errors.idRubricatorMz?.message}
              />
            </FlexContainer>

            <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
              <Input
                label={"Версия"}
                disabled={props.disabled}
                type={"text"}
                fullWidth
                name="version"
                value={version.value}
                onChange={(event) => {
                  const reg = new RegExp(/^[\d ]{0,1000}$/);
                  reg.test(event.currentTarget.value)
                    ? version.onChange(event.currentTarget.value)
                    : version.onChange(event.currentTarget.value.slice(0, -1));
                }}
                error={!!errors.version}
                max={1000}
                maxLength={4}
                errorMsg={errors.version?.message}
              />
            </FlexContainer>
          </FlexContainer>
          {typeof props?.curretClinrec?.revisionId === "number" ? (
            <Input label={"Номер редакции документа"} fullWidth disabled value={props.curretClinrec.revisionId} />
          ) : null}
          <SelectCustomAsync
            label={"Диагнозы"}
            isRequired
            isDisabled={props.disabled}
            isError={!!errors?.mkb10}
            htmlID={"field-dictionary"}
            SelectValue={mkb10.value || ""}
            options={[]}
            closeMenuOnSelect={false}
            isSearchable={true}
            onChange={(value: any) => mkb10.onChange(value)}
            isMulti={true}
            withPaginateApiCallback={async (params: { pageIndex: number; pageSize: number; search: string }) => {
              return new DictionaryClinrecPompApiRequest()
                .getDictionaryClinrecPompDiagnosis(params)
                .then((r) => r.result.items);
            }}
            // @ts-ignore
            errorMsg={errors.mkb10?.message}
          />

          <CustomSelect
            label={"Возрастная категория"}
            isDisabled={props.disabled}
            htmlID={"field-dictionary"}
            SelectValue={ageGroup.value || ""}
            options={clinrecSelects.ageCategory || []}
            isSearchable={true}
            isMulti
            closeMenuOnSelect={false}
            onChange={(value) => ageGroup.onChange(value)}
          />
          <FlexContainer direction={"row"} justify={"space-between"}>
            <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
              <Input
                label={"Год утверждения"}
                disabled={props.disabled}
                type={"number"}
                fullWidth
                name="revisionBdate"
                ref={register({
                  max: { value: 2100, message: "Максимально доступное число 2100" },
                  min: { value: 1900, message: "Минимально доступное число 1900" },
                  maxLength: 4,
                  validate: (event: number) => {
                    if (!!getValues("revisionEdate") && !!getValues("revisionBdate")) {
                      return event > Number(getValues("revisionEdate"))
                        ? 'Значение этого поля не может быть больше, чем в поле "Пересмотр не позднее"'
                        : true;
                    } else return true;
                  },
                })}
                error={!!errors.revisionBdate}
                maxLength={100}
                errorMsg={errors.revisionBdate?.message}
              />
            </FlexContainer>
            <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
              <Input
                label={"Пересмотр не позднее"}
                disabled={props.disabled}
                type={"number"}
                fullWidth
                name="revisionEdate"
                ref={register({
                  max: { value: 2100, message: "Максимально доступное число 2100" },
                  min: { value: 1900, message: "Минимально доступное число 1900" },
                  maxLength: 4,
                  validate: (event: number) => {
                    if (!!getValues("revisionEdate") && !!getValues("revisionBdate")) {
                      return event < Number(getValues("revisionBdate"))
                        ? 'Значение этого поля не может быть меньше, чем значение в поле "Год утверждения" '
                        : true;
                    } else return true;
                  },
                })}
                error={!!errors.revisionEdate}
                maxLength={100}
                errorMsg={errors.revisionEdate?.message}
              />
            </FlexContainer>
          </FlexContainer>
          <CustomSelect
            label={"Статус"}
            isDisabled={props.disabled}
            htmlID={"field-dictionary"}
            SelectValue={status.value || ""}
            options={clinrecSelects.clinrecStatus || []}
            closeMenuOnSelect
            isSearchable={true}
            menuPlacement={"top"}
            onChange={(value) => status.onChange(value)}
          />
          <CustomSelect
            label={"Статус применения"}
            isDisabled={props.disabled}
            htmlID={"field-dictionary"}
            SelectValue={usageStatus.value || ""}
            options={clinrecSelects.clinrecUsageStatus || []}
            closeMenuOnSelect
            isSearchable={true}
            menuPlacement={"top"}
            onChange={(value) => usageStatus.onChange(value)}
          />
        </Content>
      )}
    </ModalContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
