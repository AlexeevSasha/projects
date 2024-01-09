import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IDefaultRegisterFieldDictionary } from "../../../../common/interfaces/IDefaultRegisterFieldDictionary";
import { RegisterFieldTypeEnum } from "../../../../common/interfaces/RegisterFieldTypeEnum";
import { Input } from "../../../../common/ui/Input/Input";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import styled from "styled-components";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

const options: ICustomSelect[] = [
  { value: RegisterFieldTypeEnum.String, label: "Строка" },
  { value: RegisterFieldTypeEnum.Guid, label: RegisterFieldTypeEnum.Guid },
  { value: RegisterFieldTypeEnum.Number, label: "Число" },
  { value: RegisterFieldTypeEnum.DateTime, label: "Дата" },
  { value: RegisterFieldTypeEnum.Boolean, label: "Логический" },
  { value: RegisterFieldTypeEnum.DiagnosisCode, label: "Код диагноза" },
  { value: RegisterFieldTypeEnum.Json, label: " jsonpath" },
];

interface IProps {
  onSave: (date: IDefaultRegisterFieldDictionary) => void;
  value: IDefaultRegisterFieldDictionary;
  listName: ICustomSelect[];
  listBizObj: ICustomSelect[];
}

export const ModalFieldDefault: React.FC<IProps> = (props) => {
  const [description, setDescription] = useState("");
  const [isErrorDescription, setIsErrorDescription] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState({} as ICustomSelect);
  const [type, setType] = useState<ICustomSelect>({} as ICustomSelect);
  const [objId, setObjId] = useState<ICustomSelect>({} as ICustomSelect);

  useEffect(() => {
    if (props.value && props.value.name) {
      setName({ value: props.value.name, label: props.value.name } as ICustomSelect);
    }
    if (props.value && props.value.description) {
      setDescription(props.value.description);
    }
    if (props.value && props.value.type) {
      setType(options.find((item) => item.value === props.value.type) || ({} as ICustomSelect));
    }
    if (props.value && props.value.bizObjId) {
      setObjId(props.listBizObj.find((item) => item.value === props.value.bizObjId) || ({} as ICustomSelect));
    }
  }, [props.value, props.listName, props.listBizObj]);

  const clickSave = async () => {
    if (!isErrorDescription && name.value && description) {
      await props.onSave({
        id: props.value && props.value.id ? props.value.id : 0,
        name: name.value,
        description,
        type: type.value,
        bizObjId: objId.value,
      } as IDefaultRegisterFieldDictionary);
      setName({} as ICustomSelect);
      setDescription("");
      setType({} as ICustomSelect);
      setObjId({} as ICustomSelect);
      closeModal();
    } else {
      setIsError(true);
    }
  };

  const onChangeName = useCallback((value: ICustomSelect) => {
    setName(value);
  }, []);

  const onChangeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsErrorDescription(false);
    setDescription(event.target.value);
  }, []);

  const onChangeType = useCallback((value: ICustomSelect) => {
    setType(value);
  }, []);

  const onChangeObjId = useCallback((value: ICustomSelect) => {
    setObjId(value);
  }, []);

  const closeModal = useCallback(() => {
    setIsError(false);
    modal.close();
  }, []);

  return (
    <ModalContainer
      title={"Настройка группировки полей регистра"}
      width={800}
      footer={<ButtonsModalForm onSubmit={clickSave} onClose={closeModal} />}
    >
      <Content>
        <CustomSelect
          label={"Наименование"}
          isError={isError && !name}
          htmlID={"list_name"}
          SelectValue={name}
          options={props.listName}
          isDisabled={!!props.value}
          onChange={onChangeName}
        />

        <Input
          label={"Описание"}
          fullWidth
          onChange={onChangeDescription}
          error={(isError && !description) || isErrorDescription}
          value={description}
          maxLength={100}
        />

        <CustomSelect
          label={"Группа поля"}
          isError={isError && !objId.value}
          htmlID={"list_bizObj"}
          SelectValue={objId}
          options={props.listBizObj}
          isRelative
          onChange={onChangeObjId}
        />

        <CustomSelect
          label={"Тип поля"}
          htmlID={"type"}
          isError={isError && !type.value}
          SelectValue={type}
          options={options}
          isRelative
          onChange={onChangeType}
        />
      </Content>
    </ModalContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
