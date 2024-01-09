import { theme } from "common/styles/theme";
import { RegisterCheckListAction } from "module/registerCheckList/registerCheckListAction";
import { useSessionCheckList } from "module/registerCheckListSession/useSessionCheckList";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IconLoading } from "common/components/Icon/IconLoading";
import { styled } from "../../common/styles/styled";
import {
  registerCheckListSelector,
  selectLoadingControl,
  selectPatientList,
} from "../../module/registerCheckList/registerCheckListSelector";
import { RegisterCheckListThunk } from "../../module/registerCheckList/registerCheckListThunk";
import { RegisterGeneralInfoThunk } from "../../module/registerGeneralInfo/registerGeneralInfoThunk";
import { registerNameSelector } from "../../module/registerName/registerNameSelector";
import { RegisterSettingsCheckListThunk } from "../../module/registerSettingsCheckList/registerSettingsCheckListThunk";
import { Footer } from "../../common/components/Footer";
import { HorisontalNavMenuRegister } from "../../common/components/HorisontalNavMenuRegister";
import { ConstructorSettings } from "./component/RegisterCheckList/ConstructorSettings/ConstructorSettings";
import { PatientListTable } from "./component/RegisterCheckList/PatientListTable";
import { useRegisterNavigation } from "./hooks/useRegisterNavigation";
import { useDebounce } from "../../common/hooks/useDebounce";
import { RegisterCheckListTable } from "./component/RegisterCheckList/RegisterCheckListTable";
import { RegisterCheckListFilterFieldsThunk } from "../../module/registerCheckListFilterFields/registerCheckListFilterFieldsThunk";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { drawer } from "../../common/helpers/event/modalEvent";

export const PageRegisterCheckList = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const registerId = useMemo(() => +id, [id]);
  const userRoles = useSelector(authorizationSelector);

  const state = useSelector(registerCheckListSelector);
  const patientList = useSelector(selectPatientList);
  const stateRegisterName = useSelector(registerNameSelector);

  const loadingLetTable = useSelector(selectLoadingControl);

  const [pageCount, updatePageCount] = useState<number>(50);
  const [pageNumber, updatePageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [sort, setSort] = useState<{ isDesc: boolean; field?: string }>();
  const debounceText = useDebounce(searchText, 500);

  const getPatientControlList = useSessionCheckList();

  const [visibleActiveList, setVisibleActiveList] = useState<boolean>(false);

  useEffect(() => {
    dispatch(RegisterCheckListThunk.getControlList(registerId));
    dispatch(RegisterSettingsCheckListThunk.getFilters());
    dispatch(RegisterGeneralInfoThunk.getRegisterName(registerId));
    dispatch(RegisterCheckListFilterFieldsThunk.getRegisterDefaultFilterFields(registerId));
    dispatch(RegisterCheckListThunk.checkDownloadXls());

    return () => {
      dispatch(RegisterCheckListAction.updateLastLoadList(undefined));
    };
  }, [dispatch, registerId]);

  const clickOpen = useCallback(
    (id: number) => {
      dispatch(RegisterCheckListAction.updateActiveList(id));
      getPatientControlList(id, 1, pageCount, searchText);
      updatePageNumber(1);
      setVisibleActiveList(true);
    },
    [getPatientControlList, dispatch, updatePageNumber, pageCount, searchText]
  );
  const clickRecalculation = useCallback(
    (id: number) => {
      dispatch(RegisterCheckListAction.updateActiveList(id));
      getPatientControlList(id, 1, pageCount, searchText);
      updatePageNumber(1);
    },
    [getPatientControlList, dispatch, updatePageNumber, pageCount, searchText]
  );

  const selectPageCount = (value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
    getPatientControlList(state.activeList, 1, Number(value), searchText, sort?.field, sort?.isDesc);
  };

  const newPageNumber = useCallback(
    (newPage: number) => {
      updatePageNumber(newPage);
      getPatientControlList(state.activeList, newPage, pageCount, searchText, sort?.field, sort?.isDesc);
    },
    [getPatientControlList, state.activeList, pageCount, searchText, sort]
  );

  const onSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    if (state.activeList) {
      getPatientControlList(state.activeList, pageNumber, pageCount, debounceText, sort?.field, sort?.isDesc);
    }
    // eslint-disable-next-line
  }, [debounceText]);

  const handleSort = useCallback(
    (nextField: string) => {
      const field = nextField === sort?.field && sort?.isDesc ? undefined : nextField;
      const isDesc = field === sort?.field;
      setSort({ isDesc, field });
      getPatientControlList(state.activeList, pageNumber, pageCount, debounceText, field, isDesc);
    },
    [setSort, sort, state.activeList, pageNumber, pageCount, debounceText, getPatientControlList]
  );

  const openConstructorSetting = useCallback(
    (isCreate?: boolean) => {
      if (isCreate) {
        dispatch(RegisterSettingsCheckListThunk.addNewCheckList(registerId));
      }
      drawer.open(
        <ConstructorSettings isSuperExpert={userRoles?.isSuperExpert} isCreate={isCreate} registerId={registerId} />
      );
    },
    [registerId, userRoles, dispatch]
  );

  const loadSettings = useCallback(
    async (id: number) => {
      dispatch(RegisterCheckListFilterFieldsThunk.getRegisterFilterFields(String(registerId), id));
      dispatch(RegisterSettingsCheckListThunk.getSettings(id));
      openConstructorSetting();
    },
    [registerId, openConstructorSetting, dispatch]
  );

  return (
    <>
      <HorisontalNavMenuRegister
        links={useRegisterNavigation()}
        title={true}
        breadcrumbs={stateRegisterName.registerName}
      />
      <ContainerTable>
        {loadingLetTable ? (
          <IconLoading />
        ) : (
          <RegisterCheckListTable
            clickRecalculation={clickRecalculation}
            registerId={registerId}
            clickOpen={clickOpen}
            clickAddList={openConstructorSetting}
            loadSettings={loadSettings}
          />
        )}

        {!state.loadingControl && patientList && visibleActiveList && (
          <PatientListTable
            getPatientControlList={getPatientControlList}
            searchText={searchText}
            onSearch={onSearch}
            registerId={registerId}
            selectPageCount={selectPageCount}
            pageCount={pageCount}
            pageNumber={pageNumber}
            newPageNumber={newPageNumber}
            onClose={() => setVisibleActiveList(false)}
            fieldSort={sort}
            sort={handleSort}
          />
        )}
      </ContainerTable>

      <Footer />
    </>
  );
};

const ContainerTable = styled.div`
  display: flex;
  overflow: hidden;
  height: 70vh;
`;

export const DownloadFileContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${theme.colors.opacityGray};
  display: flex;
  align-items: center;
  z-index: 1002;
`;
