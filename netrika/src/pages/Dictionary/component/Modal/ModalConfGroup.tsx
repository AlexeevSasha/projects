import React, { useCallback, useEffect, useMemo } from "react";
import { IConfGroupDictionary } from "../../../../common/interfaces/dictionary/IConfGroupDictionary";
import { useSelector } from "react-redux";
import { dictionaryDisplayFieldSelector } from "../../../../module/dictionaryDisplayField/dictionaryDisplayFieldSelector";
import { Controller, useForm } from "react-hook-form";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { LabelStyle } from "../../../../common/ui/Input/styles/labelStyles";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  onSumbit: (date: IConfGroupDictionary) => void;
  value?: IConfGroupDictionary;
}

interface IFormProps {
  nsiDictionarySubGroup: ICustomSelect;
  nsiDictionaryAttribute: ICustomSelect;
}

const notSelected = { value: "", label: "Не выбрано" };

export const ModalConfGroup: React.FC<IProps> = (props) => {
  const { dictionariesList } = useSelector(dictionaryDisplayFieldSelector);

  const data = useMemo(
    () => [notSelected, ...dictionariesList.map((el) => ({ value: el.code, label: el.description }))],
    [dictionariesList]
  );

  const { handleSubmit, control, reset } = useForm<IFormProps>();

  useEffect(() => {
    if (props.value) {
      const nsiAttribute = props.value?.nsiDictionaryAttribute
        ? {
            value: props.value.nsiDictionaryAttribute,
            label: props.value.nsiDictionaryAttribute,
          }
        : notSelected;

      const nsiSubGroup = props.value?.nsiDictionarySubGroup
        ? {
            value: props.value.nsiDictionarySubGroup,
            label: props.value.nsiDictionarySubGroup,
          }
        : notSelected;

      reset({
        nsiDictionaryAttribute: nsiAttribute,
        nsiDictionarySubGroup: nsiSubGroup,
      });
    }
  }, [props.value, reset]);

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const clickSave = async (values: IFormProps) => {
    if (props.value) {
      await props.onSumbit({
        id: props.value.id,
        confBlockId: props.value.confBlockId,
        isDefault: props.value.isDefault,
        name: props.value.name,
        nsiDictionarySubGroup: values?.nsiDictionarySubGroup?.value || null,
        nsiDictionaryAttribute: values?.nsiDictionaryAttribute?.value || null,
      } as IConfGroupDictionary);
      onClose();
    }
  };

  return (
    <ModalContainer
      width={800}
      title={"Настройка справочника групп и подгрупп карточки заболевания"}
      footer={<ButtonsModalForm onSubmit={handleSubmit(clickSave)} onClose={onClose} />}
    >
      <LabelStyle>nsi справочник подгруппы</LabelStyle>
      <Controller
        name="nsiDictionarySubGroup"
        control={control}
        render={({ onChange, value }: { onChange: any; value: any }) => {
          return (
            <CustomSelect
              isRelative
              htmlID={"nsi_nsiDictionarySubGroup"}
              isSearchable
              SelectValue={value}
              options={data}
              onChange={(val) => onChange(val)}
            />
          );
        }}
      />

      <LabelStyle style={{ marginTop: 24 }}>nsi справочник атрибута</LabelStyle>
      <Controller
        name="nsiDictionaryAttribute"
        control={control}
        render={({ onChange, value }) => {
          return (
            <CustomSelect
              isRelative
              htmlID={"nsi_nsiDictionaryAttribute"}
              isSearchable
              SelectValue={value}
              options={data}
              onChange={(val) => onChange(val)}
            />
          );
        }}
      />
    </ModalContainer>
  );
};
