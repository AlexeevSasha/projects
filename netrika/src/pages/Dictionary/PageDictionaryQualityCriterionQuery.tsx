import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { IQualityCriterionQueryDictionary } from "../../common/interfaces/quality/IQualityCriterionQueryDictionary";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { dictionaryQualityCriterionQuerySelector } from "../../module/dictionaryQualityCriterionQuery/dictionaryQualityCriterionQuerySelector";
import { DictionaryQualityCriterionQueryThunk } from "../../module/dictionaryQualityCriterionQuery/dictionaryQualityCriterionQueryThunk";
import { TemplateDictionary } from "./component/TemplateDictionary";
import { ModalQualityCriterionQuery } from "./component/Modal/ModalQualityCriterionQuery/ModalQualityCriterionQuery";
import { useDebounce } from "../../common/hooks/useDebounce";
import { dictionaryDisplayFieldThunk } from "../../module/dictionaryDisplayField/dictionaryDisplayFieldThunk";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [{ name: "Наименование", value: "name" }];

const {
  getDictionarySearch,
  deleteQualityCriterionQuery,
  updateQualityCriterionQuery,
  createQualityCriterionQuery,
} = DictionaryQualityCriterionQueryThunk;

export const PageDictionaryQualityCriterionQuery: React.FC = () => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);
  const state = useSelector(dictionaryQualityCriterionQuerySelector);

  const [filter, setFilter] = useState({ pageIndex: 1, pageSize: 10, searchText: "" });
  const debounceText = useDebounce(filter.searchText, 500);

  useEffect(() => {
    dispatch(dictionaryDisplayFieldThunk.getDictionariesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDictionarySearch(filter));

    // eslint-disable-next-line
  }, [dispatch, filter.pageIndex, filter.pageSize, debounceText]);

  const selectPageCount = useCallback((pageSize: string | number) => {
    setFilter({ ...filter, pageIndex: 1, pageSize: +pageSize });

    // eslint-disable-next-line
  }, []);

  const newPageNumber = useCallback((pageIndex: number) => {
    setFilter({ ...filter, pageIndex });

    // eslint-disable-next-line
  }, []);

  const searchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, pageIndex: 1, searchText: e.currentTarget.value });

    // eslint-disable-next-line
  }, []);

  const handleSave = (params: IQualityCriterionQueryDictionary) => {
    const action = params.id ? updateQualityCriterionQuery : createQualityCriterionQuery;
    dispatch(action(params, filter));
  };

  const deleteRegisterGroup = (value: number[]) => dispatch(deleteQualityCriterionQuery(value, filter));

  const openModalCriterion = (id?: number) => {
    const item = state.data.items.find((item) => item.id === id);
    modal.open(<ModalQualityCriterionQuery value={item} onSubmit={handleSave} />);
  };

  return (
    <>
      <MetaTags>
        <title>Справочник запросов, соответствующих критериям качества</title>
      </MetaTags>
      <TemplateDictionary
        access={login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr}
        search={searchChange}
        title={"Справочник запросов, соответствующих критериям качества"}
        tableHead={tableHead}
        data={state.data.items}
        loading={state.loading}
        selectPageCount={selectPageCount}
        pageCount={filter.pageSize}
        newPageNumber={newPageNumber}
        pageNumber={filter.pageIndex}
        allCount={state.data.totalCount}
        clickDelete={deleteRegisterGroup}
        clickShow={openModalCriterion}
      />
    </>
  );
};
