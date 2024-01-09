import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { pageSize } from "../../common/constants";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { accessDictionary } from "./helpers/accessDictionary";
import { MetaTags } from "react-meta-tags";
import { dictionaryDisplayFieldThunk } from "../../module/dictionaryDisplayField/dictionaryDisplayFieldThunk";
import { dictionaryDisplayFieldSelector } from "../../module/dictionaryDisplayField/dictionaryDisplayFieldSelector";
import { ModalDisplayField } from "./component/Modal/ModalDisplayField/ModalDisplayField";
import { DictionaryDisplayFieldApiRequest } from "../../api/dictionaryDisplayFieldApiRequest";
import { errorPopup } from "../../common/helpers/toast/error";
import { useDebounce } from "../../common/hooks/useDebounce";
import { FilterNsiDictionary } from "./component/FilterNsiDictionary";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Наименование атрибута", value: "registerFieldDescription", sortName: "descriptionAsc" },
  { name: "Бизнес-объект", value: "bizObjName" },
  { name: "Справочник", value: "tableName" },
];

export const PageDictionaryDisplayField = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const state = useSelector(dictionaryDisplayFieldSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sort, setSort] = useState<Record<string, boolean | undefined>>({ descriptionAsc: undefined });
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
    dispatch(
      dictionaryDisplayFieldThunk.getDictionarySearch({
        ...sort,
        pageSize: pageCount,
        currentPage: pageNumber,
        searchText: debounceText,
        bizObjName: filterText,
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

  const deleteDisplayField = async (value: number[]) => {
    await dispatch(dictionaryDisplayFieldThunk.deleteDictionaryField(value));
    dispatch(
      dictionaryDisplayFieldThunk.getDictionarySearch({ pageSize: pageCount, currentPage: pageNumber, searchText })
    );
  };

  const getDisplayField = async (id?: number) => {
    if (!id) return;
    try {
      const result = await new DictionaryDisplayFieldApiRequest().getDictionaryDisplayFieldById(String(id));
      if (result.isError) throw result;
      return result.result;
    } catch (error) {
      errorPopup(error.message);
      return;
    }
  };

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const openModalDisplayField = async (id?: number) => {
    const field = await getDisplayField(id);
    modal.open(<ModalDisplayField updateTable={selectPageCount} fieldDefault={field} />);
  };

  return (
    <>
      <MetaTags>
        <title>Настройки получения значений справочников НСИ</title>
      </MetaTags>
      <TemplateDictionary
        filterElem={<FilterNsiDictionary filterText={setFilterText} />}
        access={accessDictionary(userRoles.login)}
        search={searchChange}
        searchText={searchText}
        title={"Настройки получения значений справочников НСИ"}
        tableHead={tableHead}
        data={state.displayFieldList.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.displayFieldList.totalCount}
        clickDelete={deleteDisplayField}
        clickShow={openModalDisplayField}
        multiSort={sortTable}
        multiFieldSort={sort}
      />
    </>
  );
};
