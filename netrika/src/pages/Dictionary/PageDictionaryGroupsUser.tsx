import { IBaseDictionary } from "common/interfaces/dictionary/IBaseDictionary";
import { pageSize } from "common/constants";
import { dictionaryGroupsUserSelector } from "module/dictionaryGroupsUser/dictionaryGroupsUserSelector";
import { DictionaryGroupsUserThunk } from "module/dictionaryGroupsUser/dictionaryGroupsUserThunk";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { accessDictionary } from "./helpers/accessDictionary";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { ModalGroupUser } from "./component/Modal/ModalGroupUser";
import { useDebounce } from "../../common/hooks/useDebounce";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [{ name: "Наименование", value: "name" }];

export const PageDictionaryGroupsUser: React.FC = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const state = useSelector(dictionaryGroupsUserSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryGroupsUserThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const deleteGroupUser = async (value: number[]) => {
    await dispatch(DictionaryGroupsUserThunk.deleteUserGroup(value));
    dispatch(DictionaryGroupsUserThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const saveGroupUser = async (value: IBaseDictionary) => {
    if (value.id) await dispatch(DictionaryGroupsUserThunk.updateUserGroup(value));
    else await dispatch(DictionaryGroupsUserThunk.createUserGroup(value));
    dispatch(DictionaryGroupsUserThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalGroups = (id?: number) => {
    const groupUser = state?.data?.items?.find((item) => item.id === id);
    modal.open(<ModalGroupUser onSave={saveGroupUser} value={groupUser} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник групп пользователя</title>
      </MetaTags>
      <TemplateDictionary
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Справочник групп пользователя"}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        clickDelete={deleteGroupUser}
        clickShow={openModalGroups}
      />
    </>
  );
};
