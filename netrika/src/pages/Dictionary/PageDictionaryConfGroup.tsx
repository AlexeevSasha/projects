import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryConfGroupSelector } from "../../module/dictionaryConfGroup/dictionaryConfGroupSelector";
import { DictionaryConfGroupThunk } from "../../module/dictionaryConfGroup/dictionaryConfGroupThunk";
import { ModalConfGroup } from "./component/Modal/ModalConfGroup";
import { IConfGroupDictionary } from "../../common/interfaces/dictionary/IConfGroupDictionary";
import { accessDictionary } from "./helpers/accessDictionary";
import { pageSize } from "common/constants";
import { MetaTags } from "react-meta-tags";
import { useDebounce } from "../../common/hooks/useDebounce";
import { dictionaryDisplayFieldThunk } from "../../module/dictionaryDisplayField/dictionaryDisplayFieldThunk";
import { FilterConfGroupDictionary } from "./component/FilterConfGroupDictionary";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Наименование", value: "name", sortName: "nameAsc" },
  { name: "nsi подгруппы", value: "nsiDictionarySubGroup" },
  { name: "nsi атрибута", value: "nsiDictionaryAttribute" },
  { name: "Название блока", value: "confBlockName" },
];

export const PageDictionaryConfGroup: React.FC = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const state = useSelector(dictionaryConfGroupSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sort, setSort] = useState<Record<string, boolean | undefined>>({ nameAsc: undefined });
  const debounceText = useDebounce(searchText, 500);

  const sortTable = useCallback(
    (fieldName: string) => {
      setSort((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName] === false ? undefined : !prev[fieldName],
      }));
    },
    [setSort]
  );

  useEffect(() => {
    dispatch(dictionaryDisplayFieldThunk.getDictionariesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      DictionaryConfGroupThunk.getDictionarySearch({
        ...sort,
        pageSize: pageCount,
        pageIndex: pageNumber,
        searchText: debounceText,
        confBlockName: filterText,
      })
    );
  }, [dispatch, pageNumber, pageCount, debounceText, sort, filterText]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const updateConfGroup = async (value: IConfGroupDictionary) => {
    await dispatch(DictionaryConfGroupThunk.updateConfGroup(value));
    dispatch(
      DictionaryConfGroupThunk.getDictionarySearch({
        pageSize: pageCount,
        pageIndex: pageNumber,
        searchText,
      })
    );
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalConfGroup = (id?: number) => {
    const confGroup = state?.data?.items?.find((item) => item.id === id);
    modal.open(<ModalConfGroup onSumbit={updateConfGroup} value={confGroup} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник групп и подгрупп карточки заболевания</title>s
      </MetaTags>
      <TemplateDictionary
        filterElem={<FilterConfGroupDictionary filterText={setFilterText} />}
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        title={"Справочник групп и подгрупп карточки заболевания"}
        tableHead={tableHead}
        data={state.data.items?.map((el) => ({ ...el, isDefault: false }))}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        hideButtonAdd={true}
        multiSort={sortTable}
        multiFieldSort={sort}
        clickShow={openModalConfGroup}
      />
    </>
  );
};
