import React, { useMemo } from "react";
import { Input } from "../../../../common/ui/Input/Input";
import { TextArea } from "../../../../common/ui/Input/TextArea";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { IOrderContingent } from "../../../../common/interfaces/order/IOrderContingent";
import { useController, useForm } from "react-hook-form";
import { SelectCustomAsync } from "../../../../common/ui/Select/SelectCustomAsync";
import { OrderContingentApiRequest } from "../../../../api/orderContingentApiRequest";
import { ProposalContingentThunk } from "../../../../module/proposalContingent/proposalContingentThunk";
import { useDispatch, useSelector } from "react-redux";
import { proposalContingentSelector } from "../../../../module/proposalContingent/proposalContingentSelector";
import { styled } from "../../../../common/styles/styled";
import { ParamsField } from "./ParamsField";
import { ProposalContingentAction } from "../../../../module/proposalContingent/proposalContingentAction";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  value?: IOrderContingent;
  onSubmit: (data: IOrderContingent) => Promise<void>;
  orderId: number;
  options: ICustomSelect[];
  disabled: boolean;
  title: string;
}

interface IForm extends Omit<IOrderContingent, "elementType" | "elementTypeId"> {
  elementType: ICustomSelect;
  script: ICustomSelect;
}

export const ModalAddContingent: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { iamScriptsParams, loadingIamScriptsParams } = useSelector(proposalContingentSelector);

  const paramsArr = useMemo(
    () =>
      iamScriptsParams === null
        ? []
        : iamScriptsParams?.length
        ? iamScriptsParams
        : props.value?.scriptParams?.length
        ? props.value?.scriptParams
        : [],
    [iamScriptsParams, props.value]
  );

  const { register, errors, handleSubmit, control, reset } = useForm<IForm>({
    defaultValues: {
      name: props.value?.name || "",
      description: props.value?.description || "",
      link: props.value?.link || "",
      scriptParams: iamScriptsParams ?? props.value?.scriptParams ?? [],
    },
  });

  const { field: elementType } = useController({
    control,
    name: "elementType",
    defaultValue: props.options.find((item) => Number(item.value) === props.value?.elementTypeId) || "",
    rules: { required: "Обязательное поле" },
  });
  const { field: script } = useController({
    control,
    name: "script",
    defaultValue: props.value?.scriptId ? { value: props.value.scriptId, label: props.value.scriptName } : "",
  });

  const onClose = () => {
    reset({});
    dispatch(
      ProposalContingentAction.iamScriptsParams.done({
        params: null,
        result: [],
      })
    );
    modal.close();
  };

  const onSubmit = async (data: IForm) => {
    await props.onSubmit({
      id: props.value?.id,
      description: data.description,
      elementTypeId: Number(elementType.value.value),
      orderId: props.orderId,
      name: data.name,
      link: data.link,
      scriptId: data.script?.value ? Number(data.script.value) : undefined,
      scriptParams: data.scriptParams?.map((sP) => ({
        value: sP.value,
        paramId: sP.paramId,
      })),
    } as IOrderContingent);
    onClose();
  };

  return (
    <ModalContainer
      loading={loadingIamScriptsParams}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
      title={props.title}
      width={800}
    >
      <Content>
        <Input
          label={"Название"}
          isRequired
          id={"input_name"}
          fullWidth
          placeholder={"Название"}
          name="name"
          ref={register({
            required: "Обязательное поле",
            validate: (value: string) => {
              if (value.trim().length === 0) return "Название не может состоять только из пробелов";
              else return true;
            },
            maxLength: { message: "Максимально допустимое число символов: 100", value: 100 },
          })}
          disabled={props.disabled}
          error={!!errors.name}
          errorMsg={errors.name?.message}
        />

        <TextArea
          isRequired
          label={"Описание"}
          id={"input_description"}
          placeholder={"Описание"}
          name={"description"}
          ref={register({
            required: "Обязательное поле",
            validate: (value: string) => {
              if (value.trim().length === 0) return "Описание не может состоять только из пробелов";
              else return true;
            },
            maxLength: { message: "Максимально допустимое число символов: 500", value: 500 },
          })}
          error={!!errors.description}
          disabled={props.disabled}
          errorMsg={errors.description?.message}
        />
        <CustomSelect
          label={"Тип отчёта"}
          isRequired
          htmlID={"type_report"}
          SelectValue={elementType.value}
          options={props.options}
          onChange={elementType.onChange}
          isRelative
          isError={!!errors.elementType}
          isDisabled={props.disabled}
          //@ts-ignore
          errorMsg={errors.elementType?.message}
        />
        <SelectCustomAsync
          label={"Скрипт отчёта"}
          htmlID={"script_script"}
          SelectValue={script.value}
          options={[]}
          closeMenuOnSelect
          isSearchable={true}
          withPaginateApiCallback={async (params) => {
            return new OrderContingentApiRequest().getOrderContingentScripts(params).then((r) => r.result.items);
          }}
          onChange={(value) => {
            script.onChange(value);
            dispatch(ProposalContingentThunk.getIamScriptsParam(value.value));
          }}
          isDisabled={props.disabled}
          isRelative
        />

        {paramsArr?.length ? (
          <Params>
            {paramsArr?.map((param, index) => (
              <ParamsField
                key={index}
                item={param}
                control={control}
                index={index}
                type={param.type}
                disabled={props.disabled}
              />
            ))}
          </Params>
        ) : null}

        <TextArea
          label={"Ссылка на отчёт"}
          id={"input_link"}
          placeholder={"Ссылка на отчёт"}
          name={"link"}
          ref={register({
            maxLength: { message: "Максимально допустимое число символов: 500", value: 500 },
          })}
          error={!!errors.link}
          disabled={props.disabled}
          errorMsg={errors.link?.message}
        />
      </Content>
    </ModalContainer>
  );
};

const Params = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
