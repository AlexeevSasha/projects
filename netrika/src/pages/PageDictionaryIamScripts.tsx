import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { TemplateDictionary } from "./Dictionary/component/TemplateDictionary";
import { useDebounce } from "../common/hooks/useDebounce";
import { authorizationSelector } from "../module/authorization/authorizationSelector";
import { accessDictionary } from "./Dictionary/helpers/accessDictionary";
import { DictionaryIamScriptThunk } from "../module/dictionaryIamScript/dictionaryIamScriptThunk";
import { dictionaryIamScriptSelector } from "../module/dictionaryIamScript/dictionaryIamScriptSelector";
import { CreateIamScriptDto, IamScriptDto } from "../common/interfaces/IamScriptDto";
import { ModalScript } from "./Dictionary/component/Modal/ModalScript/ModalScript";
import { dictionaryDisplayFieldThunk } from "../module/dictionaryDisplayField/dictionaryDisplayFieldThunk";
import { modal } from "../common/helpers/event/modalEvent";

const tableHead = [
  { name: " Наименование", value: "name" },
  { name: " Комментарий", value: "comment" },
];

export const PageDictionaryIamScripts: React.FC = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const { loading, iamScriptList } = useSelector(dictionaryIamScriptSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [currentIamScript, setCurrentIamScript] = useState<IamScriptDto | undefined>();
  const debounceText = useDebounce(searchText, 500);

  const updateParamsCurrentIamScript = useCallback(
    (param: string[]) =>
      setCurrentIamScript(
        (prev) =>
          ({
            ...prev,
            params: param?.map((v) => ({
              idIamScript: currentIamScript?.id,
              name: v,
              description: "",
              nsiUid: "",
              exampleValue: "",
              catalog: false,
            })),
          } as IamScriptDto)
      ),
    [currentIamScript]
  );

  useEffect(() => {
    dispatch(DictionaryIamScriptThunk.getDictionaryIamScriptParamType());
    dispatch(dictionaryDisplayFieldThunk.getDictionariesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(DictionaryIamScriptThunk.getDictionaryIamScriptList(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = useCallback(
    (value: string | number) => {
      updatePageNumber(1);
      updatePageCount(Number(value));
    },
    [updatePageNumber, updatePageCount]
  );

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const deleteIamScript = useCallback(
    async (value: number[]) => {
      await dispatch(DictionaryIamScriptThunk.deleteIamScripts(value));
      dispatch(DictionaryIamScriptThunk.getDictionaryIamScriptList(pageNumber, pageCount, searchText));
    },
    [dispatch, pageNumber, pageCount, searchText]
  );

  const saveIamScript = useCallback(
    async (value: CreateIamScriptDto) => {
      if (value?.id) await dispatch(DictionaryIamScriptThunk.updateIamScript(value));
      else await dispatch(DictionaryIamScriptThunk.createIamScript(value));
      dispatch(DictionaryIamScriptThunk.getDictionaryIamScriptList(pageNumber, pageCount, searchText));
    },
    [dispatch, pageNumber, pageCount, searchText]
  );

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalScript = (id?: number) => {
    const value = iamScriptList?.items?.find((item) => item.id === id);
    if (value) setCurrentIamScript(value);

    modal.open(
      <ModalScript
        disabled={!accessDictionary(userRoles.login)}
        callbackAfterClose={() => setCurrentIamScript(undefined)}
        onSubmit={saveIamScript}
        value={value}
        updateParamsCurrentIamScript={updateParamsCurrentIamScript}
      />
    );
  };

  return (
    <>
      <MetaTags>
        <title>Справочник скриптов</title>
      </MetaTags>
      <TemplateDictionary
        hideButtonAdd={!accessDictionary(userRoles.login)}
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Справочник скриптов"}
        tableHead={tableHead}
        data={iamScriptList.items}
        loading={loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={iamScriptList.totalCount}
        clickDelete={accessDictionary(userRoles.login) ? deleteIamScript : undefined}
        clickShow={openModalScript}
        withShowModal
      />
    </>
  );
};
