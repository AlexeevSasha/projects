import { IDictionaryUserRole } from "common/interfaces/dictionary/IDictionaryUserRole";
import { pageSize } from "common/constants";
import { dictionaryRolesUserSelector } from "module/dictionaryRolesUser/dictionaryRolesUserSelector";
import { DictionaryRolesUserThunk } from "module/dictionaryRolesUser/dictionaryRolesUserThunk";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { accessDictionary } from "./helpers/accessDictionary";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { ModalRoleUser } from "./component/Modal/ModalRoleUser";
import { useDebounce } from "../../common/hooks/useDebounce";
import { profileSelector } from "../../module/usersList/usersListSelector";
import { modal } from "../../common/helpers/event/modalEvent";
import { convertBooleanToYesNo } from "./helpers/convertBooleanToYesNo";

const tableHead = [
  { name: "Наименование", value: "sudName" },
  { name: "Описание", value: "description" },
  { name: "Доступ к перс. данным", value: "hasFioAccess" },
  { name: "Доступ ко всем разделам заявки", value: "seeAllChaptersOrder" },
  { name: "Доступ ко всем разделам регистра", value: "seeAllChaptersRegister" },
];

export const PageDictionaryRolesUser: React.FC = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);
  const state = useSelector(dictionaryRolesUserSelector);
  const userRoles = useSelector(authorizationSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  const data = useMemo(
    () =>
      state.data.items &&
      convertBooleanToYesNo(state.data.items, [
        "hasFioAccess",
        "seeAllChaptersOrder",
        "seeAllChaptersRegister",
      ]).filter((el) => (profile.isSysAcc ? el : !el.isSysRole)),
    [state.data.items, profile.isSysAcc]
  );

  useEffect(() => {
    dispatch(DictionaryRolesUserThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = (value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  };

  const newPageNumber = (newPage: number) => {
    updatePageNumber(newPage);
  };

  const deleteRolesUser = async (value: number[]) => {
    await dispatch(DictionaryRolesUserThunk.deleteRoleUser(value));
    dispatch(DictionaryRolesUserThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const saveRoleUser = async (value: IDictionaryUserRole) => {
    if (value.id) await dispatch(DictionaryRolesUserThunk.updateRoleUser(value));
    else await dispatch(DictionaryRolesUserThunk.createRoleUser(value));
    dispatch(DictionaryRolesUserThunk.getDictionarySearch(pageNumber, pageCount, searchText));
  };

  const searchChange = (value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  };

  const openModalRole = (id?: number) => {
    if (userRoles.login === UserRolesEnum.RegistryExpert || userRoles.login === UserRolesEnum.RegistrySuperExpert)
      return;
    const roleUser = state.data.items.find((item) => item.id === id);
    modal.open(<ModalRoleUser onSubmit={saveRoleUser} value={roleUser} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник ролей пользователя</title>
      </MetaTags>
      <TemplateDictionary
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Справочник ролей пользователя"}
        tableHead={tableHead}
        data={data}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        clickDelete={deleteRolesUser}
        clickShow={openModalRole}
      />
    </>
  );
};
