import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import {
  dictionaryPatientReportFunctionSelector,
  dictionaryPatientReportSelector,
} from "../../module/dictionaryPatientReport/dictionaryPatientReportSelector";
import { DictionaryPatientReportThunk } from "../../module/dictionaryPatientReport/dictionaryPatientReportThunk";
import { ModalFunction } from "./component/Modal/ModalFunction";
import { TemplateDictionaryWithModal } from "./component/TemplateDictionaryWithModal";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "id", value: "id" },
  { name: "report_number", value: "reportNumber" },
  { name: "report_date", value: "reportDate", type: "date" },
  { name: "organization_biz_key", value: "organizationBizKey" },
  { name: "mkb10", value: "mkb10" },
  { name: "compl_count_pat", value: "complCountPat" },
  { name: "vit_count_pat", value: "vitCountPat" },
  { name: "qual_count_pat", value: "qualCountPat" },
  { name: "count_pat", value: "countPat" },
  { name: "reg_id", value: "regId" },
];

export const PageDictionaryPatientReport: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(dictionaryPatientReportSelector);
  const reportFunction = useSelector(dictionaryPatientReportFunctionSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(DictionaryPatientReportThunk.getDictionaryPatientReport(pageNumber, pageCount));
  }, [dispatch, pageNumber, pageCount, searchText]);

  useEffect(() => {
    dispatch(DictionaryPatientReportThunk.getDictionaryPatientReportFunction());
  }, [dispatch]);

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

  const openModal = useCallback(() => {
    if (reportFunction.functionLoading) return;
    modal.open(<ModalFunction value={reportFunction.reportFunction} />);
  }, [reportFunction.functionLoading, reportFunction.reportFunction]);

  return (
    <>
      <MetaTags>
        <title>Данные для передачи в систему Аналитика</title>
      </MetaTags>
      <TemplateDictionaryWithModal
        onOpenModal={openModal}
        isPatientReport={true}
        access={false}
        search={searchChange}
        title={"Данные для передачи в систему Аналитика"}
        tableHead={tableHead}
        data={state.dictionaryPatientReportList?.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={pageCount}
        newPageNumber={newPageNumber}
        pageNumber={pageNumber}
        allCount={state.dictionaryPatientReportList.totalCount}
        hideButtonAdd={true}
        clickShow={() => true}
      />
    </>
  );
};
