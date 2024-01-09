import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { dictionaryRegisterGroupSelector } from "../../module/dictionaryRegisterGroup/dictionaryRegisterGroupSelector";
import { DictionaryRegisterGroupThunk } from "../../module/dictionaryRegisterGroup/dictionaryRegisterGroupThunk";
import { accessDictionary } from "./helpers/accessDictionary";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { ModalRegisterGroup } from "./component/Modal/ModalRegisterGroup";
import { IBaseDictionary } from "../../common/interfaces/dictionary/IBaseDictionary";
import { useDebounce } from "../../common/hooks/useDebounce";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [{ name: "Наименование", value: "name" }];

export const PageDictionaryRegisterGroup: React.FC = () => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);
  const state = useSelector(dictionaryRegisterGroupSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryRegisterGroupThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const deleteRegisterGroup = async (value: number[]) => {
    await dispatch(DictionaryRegisterGroupThunk.deleteRegisterGroup(value));
    dispatch(DictionaryRegisterGroupThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const saveRegisterGroup = async (value: IBaseDictionary) => {
    if (value?.id) await dispatch(DictionaryRegisterGroupThunk.updateRegisterGroup(value));
    else await dispatch(DictionaryRegisterGroupThunk.createRegisterGroup(value));
    dispatch(DictionaryRegisterGroupThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalRegister = (id?: number) => {
    if (login === UserRolesEnum.RegistryExpert || login === UserRolesEnum.RegistrySuperExpert) return;
    const registerGroup = state.data.items.find((item) => item.id === id);
    modal.open(<ModalRegisterGroup onSubmit={saveRegisterGroup} value={registerGroup} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник групп регистров</title>
      </MetaTags>
      <TemplateDictionary
        access={accessDictionary(login)}
        search={searchChange}
        title={"Справочник групп регистров"}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        clickDelete={deleteRegisterGroup}
        clickShow={openModalRegister}
      />
    </>
  );
};
