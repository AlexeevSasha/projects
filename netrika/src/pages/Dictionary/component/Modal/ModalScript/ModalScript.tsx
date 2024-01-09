import React, { useCallback, useMemo, useState } from "react";
import { Input } from "../../../../../common/ui/Input/Input";
import { useController, useForm } from "react-hook-form";
import { CreateIamScriptDto, IamScriptDto, IamScriptParamDto } from "../../../../../common/interfaces/IamScriptDto";
import { CodeEdit } from "../../../../../common/ui/CodeEdit";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { ParamField } from "./ParamField";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryIamScriptSelector } from "../../../../../module/dictionaryIamScript/dictionaryIamScriptSelector";
import { DictionaryIamScriptThunk } from "../../../../../module/dictionaryIamScript/dictionaryIamScriptThunk";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { TextArea } from "../../../../../common/ui/Input/TextArea";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import { LabelStyle } from "../../../../../common/ui/Input/styles/labelStyles";
import { ButtonStyles } from "../../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  onSubmit: (date: CreateIamScriptDto) => void;
  callbackAfterClose: () => void;
  value?: IamScriptDto;
  disabled: boolean;
  updateParamsCurrentIamScript: (value: string[]) => void;
}

export const ModalScript: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [isCheckParams, setIsCheckParams] = useState<boolean>(false);
  const { paramTypes, loadingCountParams } = useSelector(dictionaryIamScriptSelector);

  const paramTypeOptions = useMemo(() => paramTypes.map((item) => ({ value: item.code, label: item.description })), [
    paramTypes,
  ]);

  const { register, errors, handleSubmit, control } = useForm<
    Omit<IamScriptDto, "createdDateTime" | "updatedDateTime">
  >({
    defaultValues: {
      name: props?.value?.name || "",
      comment: props?.value?.comment || "",
      id: props?.value?.id,
      params: props?.value?.params || [],
    },
  });

  const { field: scriptField } = useController({
    control,
    name: "script",
    defaultValue: props?.value?.script || "",
    rules: { required: 'Необходимо заполнить поле "Скрипт"' },
  });

  const closeModal = useCallback(() => {
    props.callbackAfterClose();
    modal.close();
  }, [props]);

  const onSubmit = (value: IamScriptDto) => {
    props.onSubmit({
      ...value,
      id: props?.value?.id,
      isShow: true,
      params: props?.value?.id ? value.params?.map((v) => ({ ...v, idIamScript: props.value?.id })) : value.params,
    });
    closeModal();
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={props.disabled || loadingCountParams || !isCheckParams}
          onSubmit={handleSubmit(onSubmit)}
          onClose={closeModal}
        />
      }
      title={props?.value?.id ? "Редактирование скрипта" : "Добавление скрипта"}
      width={800}
    >
      <Input
        isRequired
        disabled={props.disabled}
        label={"Наименование"}
        fullWidth
        name="name"
        ref={register({
          required: "Обязательное поле",
        })}
        error={!!errors.name}
        maxLength={50}
        errorMsg={errors.name?.message}
      />
      <TextArea
        styleContainer={{ marginTop: 30 }}
        label={"Комментарий"}
        disabled={props.disabled}
        name="comment"
        ref={register({
          maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
        })}
        error={!!errors.comment}
        errorMsg={errors.comment?.message}
      />
      <LabelStyle style={{ marginTop: 15 }} isRequired>
        Скрипт
      </LabelStyle>
      <CodeEdit
        readonly={props.disabled}
        onChange={(value) => {
          scriptField.onChange(value);
          setIsCheckParams(false);
          props.updateParamsCurrentIamScript([]);
        }}
        isError={!!errors.script}
        defaultValue={scriptField.value}
        language={"sql"}
        placeholder={""}
      />
      {errors.script?.message && <ErrorText>{errors.script?.message}</ErrorText>}

      <GetButton
        disabled={loadingCountParams || props.disabled}
        onClick={() =>
          !(loadingCountParams || props.disabled) &&
          dispatch(
            DictionaryIamScriptThunk.iamScriptsCountParams(scriptField?.value || "", (param) => {
              setIsCheckParams(true);
              props.updateParamsCurrentIamScript(param);
            })
          )
        }
        id="get_params"
      >
        Получить параметры
      </GetButton>

      <Params>
        {loadingCountParams && <IconLoading />}
        {!loadingCountParams &&
          props.value?.params?.map((item, index) => (
            <ParamField
              key={index}
              param={item as IamScriptParamDto}
              control={control}
              index={index}
              register={register}
              disabled={props.disabled}
              errors={errors}
              options={paramTypeOptions}
            />
          ))}
      </Params>
    </ModalContainer>
  );
};

const GetButton = styled(ButtonStyles)<{ disabled: boolean }>`
  width: 190px;
  color: ${theme.colors.white};
  background: ${(props) => (props.disabled ? theme.colors.hightGray : theme.colors.green)};
  border: 0;
  margin-top: 30px;
`;

const Params = styled.div`
  min-height: 100px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  color: ${theme.colors.lightRed};
`;
