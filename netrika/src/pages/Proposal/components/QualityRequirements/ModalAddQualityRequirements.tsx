import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Input } from "common/ui/Input/Input";
import { IOrderQualityCriterion } from "../../../../common/interfaces/order/IOrderQualityCriterion";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { validateNameRegister } from "../../../../common/constants/validate";
import { InputField } from "../../../../common/ui/Input/InputField/InputField";
import { IQualityParams } from "../../../../common/interfaces/quality/IQualityParams";
import { useDispatch, useSelector } from "react-redux";
import { proposalQualityRequirementsSelector } from "../../../../module/proposalQualityRequirements/proposalQualityRequirementsSelector";
import { IOrderQualityCriterionBase } from "../../../../common/interfaces/order/IOrderQualityCriterionBase";
import { SelectCustomAsync } from "../../../../common/ui/Select/SelectCustomAsync";
import { RegisterControlListApiRequest } from "../../../../api/registerControlListApiRequest";
import styled from "styled-components";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { LabelStyle } from "../../../../common/ui/Input/styles/labelStyles";
import { TextArea } from "../../../../common/ui/Input/TextArea";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ProposalQualityRequirementsAction } from "../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";

interface IProps {
  onSubmit?: (data: IOrderQualityCriterion) => void;
  onUpdate: (data: IOrderQualityCriterion) => void;
  callbackAfterClose?: () => Promise<void>;
  orderId: number;
  options: ICustomSelect[];
  option: IOrderQualityCriterionBase[];
  disabled?: boolean;
  formCrOrPomp?: boolean;
  title: string;
}

interface IQueryCustomSelect extends ICustomSelect {
  params: IQualityParams[];
}

export const ModalAddQualityRequirements: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { fullItem } = useSelector(proposalQualityRequirementsSelector);

  const [description, setDescription] = useState<string>(fullItem.description || "");
  const [name, setName] = useState<string>(fullItem.name || "");
  const [parent, setParent] = useState<ICustomSelect>(
    props.options.find((item) => Number(item.value) === fullItem.parentId) || props.options[0]
  );

  const [isError, setIsError] = useState(false);
  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [query, setQuery] = useState([] as IQueryCustomSelect[]);
  const [queryValue, setQueryValue] = useState<IQueryCustomSelect>({} as IQueryCustomSelect);
  const [paramsValues, setParamsValues] = useState(fullItem.qualityParamsValue || []);

  const onSelect = useCallback((value: IQueryCustomSelect) => {
    setQueryValue(value);
    setParamsValues([]);
  }, []);

  const closeModal = useCallback(async () => {
    await props?.callbackAfterClose?.();
    modal.close();
  }, [props]);

  const seParamValue = (paramId: number, paramValue: string, displayValue?: string[]) => {
    const isInArray = paramsValues?.some(({ idQueryPrim }) => idQueryPrim === paramId);

    const nextParams = isInArray
      ? paramsValues?.map((item) =>
          item.idQueryPrim === paramId ? { ...item, value: paramValue, displayValue: displayValue || null } : item
        )
      : [
          ...paramsValues,
          {
            id: Math.round(Math.random() * 100000),
            idQueryPrim: paramId,
            register: true,
            idSource: fullItem.id,
            value: paramValue,
            displayValue: displayValue || null,
          },
        ];
    setParamsValues(nextParams);
  };
  const handleValueChange = (paramId: number) => (value: string) => {
    seParamValue(paramId, value);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    if (validateNameRegister(event.target.value.trim())) {
      setIsErrorName(false);
    } else {
      setIsErrorName(true);
    }
    setName(event.target.value);
  };

  const onChangeDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const selectParentCriterion = useCallback((value: ICustomSelect) => {
    setParent(value);
  }, []);

  const clickSave = async () => {
    if (isErrorName || !name) {
      setIsError(true);
      return;
    }

    const value = {
      description,
      orderId: props.orderId,
      name,
      parentId: parent.value,
      idQuery: Number(queryValue.value),
      qualityParamsValue: paramsValues,
    };

    if (fullItem && fullItem.id) {
      await props.onUpdate({
        id: fullItem.id,
        ...value,
      } as IOrderQualityCriterion);
      closeModal();
      setIsError(false);
    } else {
      await props?.onSubmit?.(value as IOrderQualityCriterion);
      setName("");
      setDescription("");
      setParent({} as ICustomSelect);
      closeModal();
      setIsError(false);
    }
  };

  useEffect(() => {
    const items = props.option.map((item) => ({ value: item.id, label: item.name, params: item.params }));
    setQuery(items);
    if (fullItem && fullItem.qualityParamsValue && props.option) {
      const nextQueryValue = items.find((item) => item.value === fullItem?.idQuery);

      if (nextQueryValue) setQueryValue(nextQueryValue);
    }
  }, [props.option, fullItem]);

  return (
    <ModalContainer
      title={props.title}
      width={800}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={clickSave} onClose={closeModal} />}
      callbackAfterClose={() => {
        dispatch(ProposalQualityRequirementsAction.clearFullItem());
      }}
    >
      <ContentWrapper>
        {!props.formCrOrPomp && (
          <>
            <LabelStyle>Добавить как дочерний критерий к существующему</LabelStyle>
            <CustomSelect
              isDisabled={props.disabled}
              htmlID={"list_requirement"}
              SelectValue={parent}
              options={props.options.filter((item) => Number(item.value) !== fullItem.id)}
              onChange={selectParentCriterion}
            />
          </>
        )}
        <Input
          label={"Название"}
          isRequired
          disabled={props.disabled}
          id={"input_name"}
          fullWidth
          placeholder={"Название"}
          onChange={onChangeName}
          error={(isError && !name) || isErrorName}
          value={name}
        />

        <TextArea
          label={"Описание"}
          disabled={props.disabled}
          id={"input_description"}
          placeholder={"Описание"}
          onChange={onChangeDescription}
          value={description}
        />

        <CustomSelect
          isDisabled={props.disabled}
          htmlID={"settingQualityRequirements_query"}
          SelectValue={queryValue}
          options={query}
          onChange={onSelect}
          isRelative
        />

        <Params>
          {queryValue?.params?.map((item) => {
            const paramValue = paramsValues.find((val) => val.idQueryPrim === item.id);
            return (
              <ParamLine key={item.num}>
                <ParamsName>{item.name}</ParamsName>
                {!item.catalog ? (
                  <InputField
                    maxWidth={"100%"}
                    disabled={props.disabled}
                    defaultValue={paramValue?.value || ""}
                    type="String"
                    onChange={handleValueChange(item.id)}
                    placeholder={item.exampleValue}
                    timeout={1}
                  />
                ) : (
                  <SelectCustomAsync
                    menuPlacement={"top"}
                    isDisabled={props.disabled}
                    htmlID={"paramValueSelect"}
                    SelectValue={
                      paramValue?.value
                        ? {
                            value: paramValue?.value || "",
                            label: paramValue?.displayValue?.[0] || "",
                          }
                        : ""
                    }
                    options={[]}
                    isSearchable
                    onChange={(value) => seParamValue(item.id, value.value.toString(), [value.label.toString()])}
                    withPaginateApiCallback={async (params) =>
                      new RegisterControlListApiRequest()
                        .getDictionaryValues(item.nsiUid, params)
                        .then((r) => r.result.items)
                    }
                  />
                )}
              </ParamLine>
            );
          })}
        </Params>
      </ContentWrapper>
    </ModalContainer>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Params = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ParamLine = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 10px 0;
`;
const ParamsName = styled.div``;
