import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { useDispatch, useSelector } from "react-redux";
import { DictionaryFieldDefaultThunk } from "../../module/dictionaryFieldDefault/dictionaryFieldDefaultThunk";
import { IDefaultRegisterFieldDictionary } from "../../common/interfaces/IDefaultRegisterFieldDictionary";
import { dictionaryFieldDefaultSelector } from "../../module/dictionaryFieldDefault/dictionaryFieldDefaultSelector";
import { ModalFieldDefault } from "./component/Modal/ModalFieldDefault";
import { accessDictionary } from "./helpers/accessDictionary";
import { pageSize } from "common/constants";
import { MetaTags } from "react-meta-tags";
import { useDebounce } from "../../common/hooks/useDebounce";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Наименование", value: "name" },
  { name: "Описание", value: "description" },
  { name: "Бизнес-объект", value: "bizObjName" },
];

export const PageDictionaryFieldDefault: React.FC = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const state = useSelector(dictionaryFieldDefaultSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryFieldDefaultThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  useEffect(() => {
    dispatch(DictionaryFieldDefaultThunk.getRegistersFieldsName());
    dispatch(DictionaryFieldDefaultThunk.getBizObj());
  }, [dispatch]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const saveBizObject = async (value: IDefaultRegisterFieldDictionary) => {
    if (value.id) await dispatch(DictionaryFieldDefaultThunk.updateDefaultRegisterField(value));
    else await dispatch(DictionaryFieldDefaultThunk.createDefaultRegisterField(value));
    dispatch(DictionaryFieldDefaultThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalField = (id?: number) => {
    const fieldDefault = state.data.items.find((item) => item.id === id);
    if (!fieldDefault) return;

    modal.open(
      <ModalFieldDefault
        onSave={saveBizObject}
        value={fieldDefault}
        listName={state.listName}
        listBizObj={state.listBizObj}
      />
    );
  };

  return (
    <>
      <MetaTags>
        <title>Описание группировки полей регистра</title>
      </MetaTags>
      <TemplateDictionary
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Описание группировки полей регистра"}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        clickShow={openModalField}
        hideButtonAdd={true}
      />
    </>
  );
};
