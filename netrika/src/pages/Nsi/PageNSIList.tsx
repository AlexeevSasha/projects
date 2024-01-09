import { pageSize } from "common/constants";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { dictionaryNSISelector } from "module/dictionaryNSI/dictionaryNSISelector";
import { DictionaryNSIThunk } from "module/dictionaryNSI/dictionaryNSIThunk";
import moment from "moment";
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { ru } from "common/lang/ru";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { Footer } from "common/components/Footer";
import { Pagination } from "common/ui/Pagination/Pagination";
import { InputSearch } from "common/ui/Input/InputSearch";
import { TableHead } from "common/components/Table/TableHead";
import { IconContainerFloatingmes, Tbody, Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";
import { ModalAddNSI } from "./components/ModalAddNSI";
import { useSessionNsi } from "../../module/dictionaryNSI/useSessionNsi";
import { IconCross } from "../../common/components/Icon/IconCross";
import { useDebounce } from "../../common/hooks/useDebounce";
import { ModalDeleteWIthIcon } from "../../common/components/Modal/ModalDeleteWIthIcon";
import { ModalText } from "../../common/components/Popup/ui/ModalText";
import { modal } from "../../common/helpers/event/modalEvent";
import { ButtonStyles } from "../../common/ui/Button/styles/ButtonStyles";
import { Title } from "../../common/ui/Title/Title";

const tableHead = [
  { name: "OID справочника", value: "dictionaryName" },
  { name: "Название справочника", value: "dictionaryDescription" },
  { name: "Дата обновления", value: "updateDate", type: "date" },
];

export const PageNSIList: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading, sessionIdList } = useSelector(dictionaryNSISelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [sort, setSort] = useState<{ isDesc: boolean; field?: string }>({
    isDesc: false,
    field: "updateDate",
  });
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  const onSessionNsi = useSessionNsi();

  useEffect(() => {
    dispatch(
      DictionaryNSIThunk.getDictionaryNSIList(pageNumber, pageCount, debounceText, sort.field || "", sort.isDesc)
    );
  }, [dispatch, pageNumber, pageCount, debounceText, sort]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const updateSearchText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updatePageNumber(1);
    setSearchText(event.currentTarget.value);
  }, []);

  const updateDictionaryNSI = async (dictionaryOid: string) => {
    onSessionNsi(dictionaryOid);
  };

  const deleteDictionaryNSI = useCallback(
    async (dictionaryOid: string) => {
      await dispatch(DictionaryNSIThunk.deleteDictionaryNSI(dictionaryOid));
      dispatch(
        DictionaryNSIThunk.getDictionaryNSIList(
          pageNumber,
          pageCount,
          searchText,
          sort.field || "",
          sort.field ? sort.isDesc : true
        )
      );
    },
    [dispatch, pageNumber, pageCount, searchText, sort.field, sort.isDesc]
  );

  const updateList = () => {
    dispatch(DictionaryNSIThunk.getDictionaryNSIList(pageNumber, pageCount, searchText, sort.field || "", sort.isDesc));
  };

  const sortTable = useCallback(
    (nextField: string) => {
      const field = nextField === sort.field && sort.isDesc ? undefined : nextField;
      const isDesc = field === sort.field;
      setSort({ isDesc, field });
    },
    [setSort, sort]
  );

  const clickStop = useCallback(
    (id: string) => {
      dispatch(DictionaryNSIThunk.stopSessionInfo({ id: id, jobId: id }));
    },
    [dispatch]
  );

  const clickStopForTable = useCallback(
    (event: MouseEvent<HTMLElement>, dictionaryName?: string) => {
      event.preventDefault();
      event.stopPropagation();
      if (dictionaryName) {
        dispatch(DictionaryNSIThunk.stopSessionInfo({ id: dictionaryName, jobId: dictionaryName }));
      }
    },
    [dispatch]
  );

  const opneModalNsi = () => {
    modal.open(<ModalAddNSI onStop={clickStop} onSave={updateDictionaryNSI} updateList={updateList} />);
  };

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>NSI справочник</title>
      </MetaTags>

      <Container>
        <StatementData>
          <Title id={"dictionary_title"}>НСИ</Title>
          <InputSearch onChange={updateSearchText} maxLength={80} />
        </StatementData>
        <StatementData>
          <ButtonCreateElem onClick={opneModalNsi} text={ru.button.addNewElem} />
          <Pagination
            allCount={list.totalCount}
            countFromPage={pageCount}
            page={pageNumber}
            onClick={newPageNumber}
            selectPageCount={selectPageCount}
          />
        </StatementData>

        <StatementData />
        {loading ? (
          <IconLoading />
        ) : list.items && list.items.length > 0 ? (
          <TableHead tableHead={tableHead} control={true} sort={sortTable} fieldSort={sort}>
            <Tbody>
              {list.items.map((elem, index) => (
                <Tr key={"tr_" + index} id={`row_${index}`}>
                  <Td id={`column_oid_${index}`}>{elem.dictionaryName}</Td>
                  <Td id={`column_name_${index}`}>{elem.dictionaryDescription}</Td>
                  <Td id={`column_updated_${index}`}>{moment(elem.updateDate).format("DD MMMM YYYY")}</Td>
                  <Td id={`column_control_${index}`}>
                    <div style={{ display: "flex" }}>
                      {sessionIdList.find((loadColumn) => loadColumn.id === elem.dictionaryName) ? (
                        <LineLoadingContainer>
                          <IconLoading width={26} height={29} hidePadding />
                          <IconContainerFloatingmes
                            title={ru.floatingmes.cancel}
                            id={`close_load_control_list_${index}`}
                            onClick={(e: MouseEvent<HTMLElement>) =>
                              clickStopForTable(
                                e,
                                sessionIdList.find((loadColumn) => loadColumn.id === elem.dictionaryName)?.jobId
                              )
                            }
                          >
                            <IconCross hideFloatingmes />
                          </IconContainerFloatingmes>
                        </LineLoadingContainer>
                      ) : (
                        <ButtonUpdate id={`update_${index}`} onClick={() => updateDictionaryNSI(elem.dictionaryName)}>
                          Обновить
                        </ButtonUpdate>
                      )}
                      <ModalDeleteWIthIcon
                        key={index}
                        id={`delete_${index}`}
                        onDelete={async () => deleteDictionaryNSI(elem.dictionaryName)}
                        description={
                          <ModalText>
                            Справочник - {elem.dictionaryName}
                            <br />
                            Название - {elem.dictionaryDescription}
                          </ModalText>
                        }
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableHead>
        ) : (
          <h1 id={"result_not_found"}>{ru.resultNotFound}</h1>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};

const ButtonUpdate = styled(ButtonStyles)`
  padding: 4px 15px;

  background: ${theme.colors.white};
  color: ${theme.colors.green};
  white-space: nowrap;
  font-weight: 400;

  &:hover {
    opacity: 0.8;
  }
`;

const LineLoadingContainer = styled.div`
  //padding: 0 15px;
  width: 90px;
  line-height: 19px;
  justify-content: end;
  display: flex;

  div {
    width: fit-content;
  }
`;
