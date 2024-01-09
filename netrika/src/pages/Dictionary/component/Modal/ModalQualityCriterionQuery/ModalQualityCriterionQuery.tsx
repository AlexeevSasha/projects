import { DictionaryQualityCriterionQueryApiRequest } from "api/dictionaryQualityCriterionQueryApiRequest";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { ChangeEvent, useCallback, useState } from "react";
import { CheckBox } from "common/ui/Input/CheckBox";
import { errorPopup } from "common/helpers/toast/error";
import { IQualityCriterionQueryDictionary } from "../../../../../common/interfaces/quality/IQualityCriterionQueryDictionary";
import { Input } from "../../../../../common/ui/Input/Input";
import { QueryParamInput } from "./QueryParamInput";
import { CodeEdit } from "../../../../../common/ui/CodeEdit";
import { useOptionsSelector } from "../ModalDisplayField/hooks/useOptionsSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { LabelStyle } from "../../../../../common/ui/Input/styles/labelStyles";
import { ButtonStyles } from "../../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  value?: IQualityCriterionQueryDictionary;
  onSubmit: (params: IQualityCriterionQueryDictionary) => void;
}

const getParams = (count: number, idQuery: number) =>
  new Array(count)
    .fill({ idQuery, name: "", catalog: false, nsiUid: "", exampleValue: "" })
    .map((item, i) => ({ ...item, id: i, num: i + 1 }));

export const ModalQualityCriterionQuery: React.FC<IProps> = ({ value, onSubmit }) => {
  const { dictionaryProps } = useOptionsSelector();

  const [state, setState] = useState<IQualityCriterionQueryDictionary>(
    value || { id: 0, params: [], name: "", query: "" }
  );
  const [isError, setIsError] = useState(false);
  const [isCheckingQuery, setIsCheckingQuery] = useState(!!value);

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const clickSave = () => {
    if (
      !state.name ||
      !state.query ||
      (!!state.params?.length && state.params.find((param) => !param.name)) ||
      state.params.find((param) => param.catalog && !param.nsiUid)
    ) {
      setIsError(true);
    } else {
      onSubmit(state);
      onClose();
    }
  };

  const handleGetParams = async () => {
    const res = await new DictionaryQualityCriterionQueryApiRequest().getQualityCriterionQueryParams(state.query);
    if (res.isError) {
      errorPopup(res.message);
    } else {
      setState({ ...state, params: getParams(res.result, state.id) });
      setIsCheckingQuery(true);
      setIsError(false);
    }
  };

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, name: event.target.value }));
  }, []);

  const onChangeQuery = useCallback((value: string) => {
    setIsCheckingQuery(false);
    setState((prev) => ({ ...prev, query: value }));
  }, []);

  const handleParamChange = useCallback(
    (id: number) => (name: string) => {
      setState((prev) => ({
        ...prev,
        params: prev.params.map((item) => (item.id === id ? { ...item, name } : item)),
      }));
    },
    []
  );

  const handleCatalogChange = useCallback((id: number, value: ICustomBaseSelect) => {
    setState((prev) => ({
      ...prev,
      params: prev.params.map((item) => (item.id === id ? { ...item, nsiUid: String(value.value) } : item)),
    }));
  }, []);

  const handleExampleChange = useCallback(
    (id: number) => (exampleValue: string) => {
      setState((prev) => ({
        ...prev,
        params: prev.params.map((item) => (item.id === id ? { ...item, exampleValue } : item)),
      }));
    },
    []
  );

  const handleCheckCatalog = useCallback((id: number | string) => {
    setState((prev) => ({
      ...prev,
      params: prev?.params?.map((item) => (item.id === +id ? { ...item, catalog: !item.catalog } : item)),
    }));
  }, []);

  return (
    <ModalContainer
      footer={<ButtonsModalForm onSubmit={clickSave} onClose={onClose} disabledSubmit={!isCheckingQuery} />}
      width={800}
      title={"Настройка запроса, соответствующего критериям качества"}
    >
      <Input
        label={"Наименование"}
        fullWidth
        onChange={onChangeName}
        error={isError && !state.name}
        value={state.name}
        maxLength={150}
      />

      <LabelStyle style={{ marginTop: 16 }}>Запрос</LabelStyle>
      <CodeEdit
        language={"sql"}
        placeholder={""}
        onChange={onChangeQuery}
        isError={isError && !state.query}
        defaultValue={state.query}
      />
      <GetButton onClick={state.query ? handleGetParams : undefined} disabled={!state.query} id="get_params">
        Получить параметры
      </GetButton>

      <Params>
        {isCheckingQuery && !state.params?.length ? "Нет параметров" : ""}
        {state.params?.map((param) => (
          <React.Fragment key={param.num + param.id}>
            <Line>
              <span>Наименование параметра {param.num}:</span>
              <QueryParamInput
                onChange={handleParamChange(param.id)}
                value={param.name}
                error={isError && !param.name}
              />
            </Line>
            <Line>
              <CheckBox check={param.catalog} onCheck={handleCheckCatalog} checkId={param.id} hideMarginLeft>
                Справочник
              </CheckBox>
              <ValueWrapper>
                {param.catalog && (
                  <>
                    <CustomSelect
                      isError={isError && !param.nsiUid}
                      isRelative
                      htmlID={"list_dictionaries"}
                      isSearchable
                      SelectValue={param.catalog ? dictionaryProps.find((d) => d.value === param.nsiUid) || "" : ""}
                      options={dictionaryProps}
                      onChange={(value) => handleCatalogChange(param.id, value)}
                    />
                  </>
                )}
              </ValueWrapper>
            </Line>

            <Line>
              {!param.catalog && (
                <>
                  <div>Образец заполнения:</div>
                  <QueryParamInput onChange={handleExampleChange(param.id)} value={param.exampleValue} />
                </>
              )}
            </Line>
            <br />
          </React.Fragment>
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

const Line = styled.div`
  display: grid;
  grid-template: 30px / 1fr 1fr;
  margin-bottom: 8px;
`;

const ValueWrapper = styled.div`
  input {
    width: 100%;
  }
`;
