import { theme } from "common/styles/theme";
import {
  selectActiveList,
  selectControlList,
  selectControlListFields,
  selectControlListFilter,
  selectLoadingPatient,
  selectPatientList,
} from "module/registerCheckList/registerCheckListSelector";
import { RegisterCheckListThunk } from "module/registerCheckList/registerCheckListThunk";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { diseaseCardInfo } from "common/constants/routes";
import { IconLoading } from "common/components/Icon/IconLoading";
import styled from "styled-components";
import { Pagination } from "common/ui/Pagination/Pagination";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { InputSearch } from "../../../../common/ui/Input/InputSearch";
import { FieldsSettings } from "./FieldsSettings";
import { IControlListsFieldsItem } from "../../../../common/interfaces/control/IControlListsField";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { FilterDrawer } from "./FilterDrawer/FilterDrawer";
import { DrawerAnimate, PopupBackdrop } from "../../../../common/components/Popup/ui/PopupAnimate";
import { useDebouncePopup } from "../../../../common/hooks/useDebouncePopup";
import { drawer } from "../../../../common/helpers/event/modalEvent";
import { ModalHeader } from "../../../../common/components/Popup/components/ModalHeader";
import { RegisterExportFile } from "./RegisterExportFile";

interface IProps {
  selectPageCount: (value: string | number) => void;
  pageCount: number;
  pageNumber: number;
  newPageNumber: (value: number) => void;
  registerId: number;
  onSearch: (searchText: string) => void;
  searchText: string;
  onClose: () => void;
  sort?: (field: string) => void;
  fieldSort?: { field?: string; isDesc: boolean };
  getPatientControlList: (
    id: number,
    page: number,
    count: number,
    filter?: string,
    orderColumn?: string,
    orderAsc?: boolean
  ) => void;
}

export const PatientListTable = ({
  selectPageCount,
  pageCount,
  pageNumber,
  newPageNumber,
  registerId,
  onSearch,
  searchText,
  onClose,
  sort,
  fieldSort,
  getPatientControlList,
}: IProps) => {
  const dispatch = useDispatch();

  const { closeModal, isClose } = useDebouncePopup({
    cb: onClose,
    delay: 250,
  });

  const controlList = useSelector(selectControlList);
  const activeList = useSelector(selectActiveList);
  const patientList = useSelector(selectPatientList);
  const isLoading = useSelector(selectLoadingPatient);
  const { controlListFields, loadingControlListFields } = useSelector(selectControlListFields);
  const { loadingControlListFilter } = useSelector(selectControlListFilter);
  const { controlListFilter } = useSelector(selectControlListFilter);

  const tableHead = useMemo(
    () =>
      (patientList["itemsNames"] || []).map((item: any) => ({
        value: item["Name"],
        name: item["Desc"],
        type: item["Type"],
      })),
    [patientList]
  );

  const title = useMemo(() => {
    return controlList.find((item) => item.id === activeList)?.name;
  }, [controlList, activeList]);

  useEffect(() => {
    dispatch(RegisterCheckListThunk.getControlListsFields(activeList));
    dispatch(RegisterCheckListThunk.getControlListsFilter(activeList));
  }, [activeList, dispatch]);

  useEffect(() => {
    onSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const clickOpenPatient = useCallback(
    (patientId?: string) => {
      window.open(`${diseaseCardInfo.path(registerId, patientId || "")}`);
    },
    [registerId]
  );

  const updateFieldsSettings = (items: IControlListsFieldsItem[]) => {
    dispatch(
      RegisterCheckListThunk.updateControlListsFields({ ...controlListFields, fields: items }, activeList, () =>
        getPatientControlList(activeList, 1, pageCount, searchText, fieldSort?.field, !fieldSort?.isDesc)
      )
    );
  };

  const openDrawerFilter = () => {
    drawer.open(
      <FilterDrawer
        getPatientControlList={getPatientControlList}
        name={title || ""}
        pageCount={pageCount}
        searchText={searchText}
      />
    );
  };

  if (!activeList) return null;
  return (
    <Wrapper>
      <Container position={"right"} isClosed={isClose} id="right_table_control_list">
        <ModalHeader titleId={"title_control_list"} onClose={closeModal}>
          {title}
        </ModalHeader>
        <FilterContainer>
          <RegisterExportFile activeList={activeList} controlListName={title || ""} filterSearchText={searchText} />
          <SearchAndFilters>
            <InputSearch value={searchText} onChange={(value) => onSearch(value.target.value)} maxLength={70} />
            <FilterSettingsContainer
              isMargin={
                loadingControlListFilter || loadingControlListFields || isLoading || !!controlListFilter.filters.length
              }
            >
              <ButtonFilter
                id={"btn_advanced_filter"}
                onClick={async () => {
                  if (!loadingControlListFilter && !loadingControlListFields && !isLoading) {
                    await dispatch(RegisterCheckListThunk.getControlListsFilter2());
                    openDrawerFilter();
                  }
                }}
              >
                <AdvansedFilterButton>Расширенный фильтр</AdvansedFilterButton>
              </ButtonFilter>
              <FieldsSettings
                items={controlListFields.fields}
                onClick={updateFieldsSettings}
                loading={loadingControlListFields}
              />
            </FilterSettingsContainer>
            <StatusContainer>
              {loadingControlListFilter || loadingControlListFields || isLoading ? (
                <IconLoading width={16} height={16} hidePadding={true} />
              ) : !!controlListFilter.filters.length ? (
                <Status />
              ) : null}
            </StatusContainer>
          </SearchAndFilters>
        </FilterContainer>
        <FlexContainer style={{ marginBottom: 15 }} justify={"end"} direction={"row"}>
          <Pagination
            selectPageCount={selectPageCount}
            allCount={patientList["FilteredTotal"]}
            countFromPage={pageCount}
            page={pageNumber}
            onClick={newPageNumber}
          />
        </FlexContainer>

        {isLoading ? (
          <div style={{ height: "60vh" }}>
            <IconLoading />
          </div>
        ) : (
          <TableHead tableHead={tableHead} classNameContainer={"RightTable"} sort={sort} fieldSort={fieldSort}>
            <TableBody
              withHover={true}
              tableHead={tableHead}
              tableBody={patientList["items"] || []}
              control={
                [
                  {
                    name: "clickRow",
                    onClick: clickOpenPatient,
                    value: "patient_link_id_local_pat",
                  },
                ] as IControlTable[]
              }
              activeLine={activeList}
              clickRow={true}
            />
          </TableHead>
        )}
      </Container>
      <PopupBackdrop onClick={closeModal} isClosed={isClose} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1200;
`;

const Container = styled(DrawerAnimate)`
  box-sizing: border-box;
  padding: 0 20px 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1002;
  top: 0;
  bottom: 0;
  right: 0;
  width: 90%;
  background: ${theme.colors.white};
  box-shadow: -4px 0 31px rgba(0, 0, 0, 0.15);
  justify-content: start;

  .RightTable {
    padding-bottom: 20px;
  }

  transition: width 1s ease;
`;

const FilterContainer = styled.div`
  margin-bottom: 15px;
  color: ${theme.colors.hightBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const ButtonFilter = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  margin-right: 35px;
  margin-left: 10px;
  color: ${theme.colors.green};

  :hover {
    color: ${theme.colors.grayBlue};
  }
`;

const StatusContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 11px;
`;

const Status = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: ${theme.colors.lightRed};
`;

const AdvansedFilterButton = styled.div`
  min-width: max-content;
  padding: 4px 30px;
  color: ${theme.colors.hightBlue};
  border-radius: 19px;
  border: 1px solid ${theme.colors.hightBlue};

  &:hover {
    color: ${theme.colors.green};
    border: 1px solid ${theme.colors.green};
  }
`;

const SearchAndFilters = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const FilterSettingsContainer = styled(SearchAndFilters)<{ isMargin?: boolean }>`
  margin-right: ${({ isMargin }) => (isMargin ? "35px" : 0)};
`;
