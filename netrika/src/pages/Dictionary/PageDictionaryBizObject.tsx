import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { IRegisterBizObjDictionary } from "../../common/interfaces/register/IRegisterBizObjDictionary";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { dictionaryBizObjectSelector } from "../../module/dictionaryBizObject/dictionaryBizObjectSelector";
import { DictionaryBizObjectThunk } from "../../module/dictionaryBizObject/dictionaryBizObjectThunk";
import { accessDictionary } from "./helpers/accessDictionary";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { useDebounce } from "../../common/hooks/useDebounce";
import { ModalBizObject } from "./component/Modal/ModalBizObject";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Наименование", value: "name" },
  { name: "Описание", value: "description" },
];

export const PageDictionaryBizObject: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(dictionaryBizObjectSelector);
  const userRoles = useSelector(authorizationSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryBizObjectThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const deleteBizObject = async (value: number[]) => {
    await dispatch(DictionaryBizObjectThunk.deleteBizObject(value));
    dispatch(DictionaryBizObjectThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const saveBizObject = async (value: IRegisterBizObjDictionary) => {
    if (value.id) await dispatch(DictionaryBizObjectThunk.updateBizObject(value));
    else await dispatch(DictionaryBizObjectThunk.createBizObject(value));
    dispatch(DictionaryBizObjectThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalBizObject = (id?: number) => {
    const bizObject = state?.data?.items?.find((item) => item?.id === id);
    modal.open(<ModalBizObject onSubmit={saveBizObject} value={bizObject} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник объектов группировки полей регистра</title>
      </MetaTags>
      <TemplateDictionary
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Справочник объектов группировки полей регистра"}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        clickDelete={deleteBizObject}
        clickShow={openModalBizObject}
      />
    </>
  );
};
