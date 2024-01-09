import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryConfBlockSelector } from "../../module/dictionaryConfiguratorBlock/dictionaryConfBlockSelector";
import { DictionaryConfBlockThunk } from "../../module/dictionaryConfiguratorBlock/dictionaryConfBlockThunk";
import { pageSize } from "common/constants";
import { MetaTags } from "react-meta-tags";
import { useDebounce } from "../../common/hooks/useDebounce";

const tableHead = [{ name: "Название блока", value: "description" }];

export const PageDictionaryConfBlock: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(dictionaryConfBlockSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryConfBlockThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
  }, [dispatch, pageNumber, pageCount, debounceText]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  return (
    <>
      <MetaTags>
        <title>Справочник блоков раздела "Информация о заболевании"</title>
      </MetaTags>
      <TemplateDictionary
        access={false}
        search={searchChange}
        title={'Справочник блоков раздела "Информация о заболевании"'}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.data.totalCount}
        hideButtonAdd={true}
        clickShow={() => {}}
      />
    </>
  );
};
