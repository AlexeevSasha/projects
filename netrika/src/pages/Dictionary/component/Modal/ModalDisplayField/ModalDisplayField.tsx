import React, { useCallback, useEffect, useState } from "react";
import { dictionaryDisplayFieldThunk } from "../../../../../module/dictionaryDisplayField/dictionaryDisplayFieldThunk";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryDisplayFieldSelector } from "../../../../../module/dictionaryDisplayField/dictionaryDisplayFieldSelector";
import { DragList } from "./DragComponent/DragList";
import {
  IDictionaryDisplayFieldDrag,
  IDictionaryDisplayFieldForEdit,
} from "../../../../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { ICustomSelect } from "../../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { Controller, useForm } from "react-hook-form";
import { useOptionsSelector } from "./hooks/useOptionsSelector";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { LabelStyle } from "../../../../../common/ui/Input/styles/labelStyles";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  updateTable: (newPage: number) => void;
  fieldDefault?: IDictionaryDisplayFieldForEdit;
}

interface IFormProps {
  bizObj: ICustomSelect;
  attributes: ICustomSelect;
  dictionaries: ICustomSelect;
  tableField: ICustomSelect;
  fillingRule: ICustomSelect;
}

export const ModalDisplayField: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { errors, handleSubmit, setValue, control, getValues } = useForm<IFormProps>();

  const dictionary = getValues("dictionaries");
  const attributesId = getValues("attributes");

  const [isError, setIsError] = useState(false);
  const [tableFieldValue, setTableFieldValue] = useState<IDictionaryDisplayFieldDrag[]>();
  const { tableFieldList } = useSelector(dictionaryDisplayFieldSelector);

  const { attributesProps, dictionaryProps, tableFieldProps, tableFieldListLoading, objProps } = useOptionsSelector();

  const closeModal = useCallback(() => {
    setIsError(false);
    modal.close();
  }, []);

  // функции измененя значений в селектах.
  const onChangeObjId = (value: ICustomSelect) => {
    setValue("bizObj", value);
    dispatch(dictionaryDisplayFieldThunk.clearLists(true, true, true));
    setValue("attributes", {});
    setValue("dictionaries", {});
    setValue("tableField", {});
    dispatch(dictionaryDisplayFieldThunk.getAttributes(Number(value.value)));
  };

  const onChangeAttributes = (value: ICustomSelect) => {
    setValue("attributes", value);
    dispatch(dictionaryDisplayFieldThunk.clearLists(true, false, true));
    setValue("dictionaries", {});
    setValue("tableField", {});
    dispatch(dictionaryDisplayFieldThunk.getDictionariesList());
  };

  const onChangeDictionary = (value: ICustomSelect) => {
    if (dictionary !== value) {
      setValue("dictionaries", value);
      dispatch(dictionaryDisplayFieldThunk.clearLists(false, false, true));
      setValue("tableField", {});
    }
  };

  // получение items для
  useEffect(() => {
    if (dictionary?.value && attributesId?.value) {
      dispatch(
        dictionaryDisplayFieldThunk.getTableFields(
          String(dictionary.value),
          props.fieldDefault ? Number(getValues("attributes")?.value) : undefined
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionary?.value, attributesId?.value, dispatch, props.fieldDefault]);

  const onChangeTableFieldIsKey = useCallback(
    (value: ICustomSelect) => {
      setValue("tableField", value);
      dispatch(dictionaryDisplayFieldThunk.clearLists(false, false, false));
    },
    [dispatch, setValue]
  );

  const onChangeFillingRule = useCallback(
    (value: ICustomSelect) => {
      setValue("fillingRule", value);
    },
    [setValue]
  );

  const changeDragList = useCallback((value) => setTableFieldValue(value), [setTableFieldValue]);

  useEffect(() => {
    dispatch(dictionaryDisplayFieldThunk.getBizObjects());
    if (props.fieldDefault) {
      setValue("attributes", { value: props.fieldDefault.id, label: props.fieldDefault.description });
      dispatch(dictionaryDisplayFieldThunk.getDictionariesList());
      onChangeDictionary({ value: props.fieldDefault.tableName, label: props.fieldDefault.tableName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fieldDefault]);

  useEffect(() => {
    if (props.fieldDefault && dictionaryProps.length > 0) {
      const newDictionaries = dictionaryProps.find((item) => item.value === props?.fieldDefault?.tableName);
      setValue("dictionaries", newDictionaries);

      const newObjBiz = objProps.find((item) => item.value === props.fieldDefault?.bizObjId);
      setValue("bizObj", newObjBiz);

      const defTableField = tableFieldList
        .filter((item) => item.isKey)
        .map((item) => ({ value: item.tableField, label: item.tableField }));

      setValue("tableField", defTableField[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionaryProps, props.fieldDefault]);

  useEffect(() => {
    if (props.fieldDefault) {
      const defTableField = tableFieldList
        .filter((item) => item.isKey)
        .map((item) => ({ value: item.tableField, label: item.tableField }));
      const fillingRule = tableFieldList
        .filter((item) => item.isFillingRule)
        .map((item) => ({ value: item.tableField, label: item.tableField }));
      setValue("tableField", defTableField[0]);
      setValue("fillingRule", fillingRule.length ? fillingRule[0] : { value: "Не выбрано", label: "Не выбрано" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFieldList, props.fieldDefault]);

  const clickSave = async (values: IFormProps) => {
    const objDictionaryDisplayField = {
      dictionaryName: String(values.dictionaries.value),
      registerFieldId: Number(values.attributes.value),
      dictionaryDisplayFields: tableFieldValue?.map((item, index) => ({
        tableField: item.tableField,
        isList: item.isList,
        isKey: String(values.tableField.value) === item.tableField,
        orderNumber: index + 1,
        isFillingRule: String(values?.fillingRule?.value) === item.tableField,
      })),
    };

    if (props.fieldDefault) {
      await dispatch(
        dictionaryDisplayFieldThunk.updateDictionaryDisplayField(objDictionaryDisplayField, async () => {
          closeModal();
        })
      );
      dispatch(
        dictionaryDisplayFieldThunk.getDictionarySearch({
          pageSize: 25,
          currentPage: 1,
        })
      );
    } else if (dictionary && attributesId) {
      await dispatch(
        dictionaryDisplayFieldThunk.createDictionaryDisplayField(objDictionaryDisplayField, async () => {
          await closeModal();
        })
      );
      dispatch(
        dictionaryDisplayFieldThunk.getDictionarySearch({
          pageSize: 25,
          currentPage: 1,
        })
      );
    } else {
      setIsError(true);
    }
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={
            !getValues("tableField")?.value || tableFieldValue?.filter((item) => item.isList).length === 0
          }
          onSubmit={handleSubmit(clickSave)}
          onClose={closeModal}
        />
      }
      title={"Настройка получения значений справочника НСИ"}
      width={800}
      callbackAfterClose={() => {
        dispatch(dictionaryDisplayFieldThunk.clearLists(true, true, true));
      }}
    >
      <>
        <Controller
          name="bizObj"
          control={control}
          rules={{ required: true }}
          render={({ value }) => {
            return (
              <CustomSelect
                isError={isError && !!errors.bizObj}
                label={"Бизнес-объект"}
                htmlID={"list_bizObj"}
                isSearchable
                isDisabled={!!props.fieldDefault}
                SelectValue={value}
                options={objProps}
                onChange={onChangeObjId}
                isRelative
              />
            );
          }}
        />

        <Controller
          name="attributes"
          control={control}
          rules={{ required: true }}
          render={({ value }) => {
            return (
              <CustomSelect
                styleContainer={{ marginTop: 16 }}
                isError={isError && !attributesId.value}
                label={"Атрибут"}
                isRelative
                htmlID={"list_attributes"}
                isSearchable
                isDisabled={props.fieldDefault ? true : attributesProps.length === 0}
                SelectValue={value}
                options={attributesProps}
                onChange={onChangeAttributes}
              />
            );
          }}
        />
      </>

      <Controller
        name="dictionaries"
        control={control}
        rules={{ required: true }}
        render={({ value }) => {
          return (
            <CustomSelect
              styleContainer={{ marginTop: 16 }}
              isError={isError && !attributesId.value}
              label={"Справочник"}
              isRelative
              htmlID={"list_dictionaries"}
              isSearchable
              isDisabled={dictionaryProps.length === 0}
              SelectValue={value}
              options={dictionaryProps}
              onChange={onChangeDictionary}
            />
          );
        }}
      />

      {tableFieldList.length > 0 && !tableFieldListLoading ? (
        <>
          <div>
            <Controller
              name="tableField"
              control={control}
              rules={{ required: true }}
              render={({ value }) => {
                return (
                  <CustomSelect
                    styleContainer={{ marginTop: 16 }}
                    isError={isError && !attributesId.value}
                    label={"Ключевое поле"}
                    htmlID={"list_tableField"}
                    isSearchable
                    isDisabled={!dictionary?.value}
                    SelectValue={value}
                    options={tableFieldProps as ICustomSelect[]}
                    onChange={onChangeTableFieldIsKey}
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="fillingRule"
              control={control}
              render={({ value }) => {
                return (
                  <CustomSelect
                    styleContainer={{ marginTop: 16 }}
                    isError={isError && !attributesId.value}
                    label={"Тип данных"}
                    htmlID={"list_fillingRule"}
                    isSearchable
                    isDisabled={!dictionary?.value}
                    SelectValue={value}
                    options={
                      [
                        {
                          value: "Не выбрано",
                          label: "Не выбрано",
                        },
                        ...tableFieldProps,
                      ] as ICustomSelect[]
                    }
                    onChange={onChangeFillingRule}
                  />
                );
              }}
            />
          </div>
          <div>
            <LabelStyle style={{ margin: "16px 0 8px" }} error={isError && !attributesId.value}>
              Видимость полей
            </LabelStyle>
            <DragList contentList={tableFieldList} onChangeValue={changeDragList} />
          </div>
        </>
      ) : tableFieldListLoading ? (
        <IconLoading />
      ) : null}
    </ModalContainer>
  );
};
