import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { DictionaryLogThunk } from "../../module/dictionaryLog/dictionaryLogThunk";
import { dictionaryLogSelector } from "../../module/dictionaryLog/dictionaryLogSelector";
import { TemplateDictionaryWithModal } from "./component/TemplateDictionaryWithModal";
import { useDebounce } from "../../common/hooks/useDebounce";

const tableHead = [
  { name: "id", value: "id" },
  { name: "process_id", value: "processId" },
  { name: "time_stamp", value: "timeStamp", type: "time" },
  { name: "level", value: "level" },
  { name: "thread_id", value: "threadId" },
  { name: "controller_name", value: "controllerName" },
  { name: "message", value: "message" },
  { name: "ex_message", value: "exMessage" },
  { name: "incoming_message", value: "incomingMessage" },
  { name: "request_id", value: "requestId" },
  { name: "user_name", value: "userName" },
  { name: "method_description_name", value: "methodDescriptionName" },
  { name: "user_mo", value: "userMo" },
];

export const PageDictionaryLog: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(dictionaryLogSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryLogThunk.getDictionarySearch(pageNumber, pageCount, debounceText));
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
        <title>Учётный журнал контроля изменений</title>
      </MetaTags>
      <TemplateDictionaryWithModal
        access={false}
        search={searchChange}
        title={"Учётный журнал изменений (log_table)"}
        tableHead={tableHead}
        data={state.dictionaryLogList?.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.dictionaryLogList.totalCount}
        hideButtonAdd={true}
        clickShow={() => true}
        noWordBreak={true}
      />
    </>
  );
};
