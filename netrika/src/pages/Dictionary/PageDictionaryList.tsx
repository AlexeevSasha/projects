import { pageSize } from "common/constants";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useHistory } from "react-router";
import { ru } from "common/lang/ru";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { dictionaryList } from "../../module/dictionaryList/dictionaryListMock";
import { Footer } from "../../common/components/Footer";
import { Pagination } from "../../common/ui/Pagination/Pagination";
import { InputSearch } from "../../common/ui/Input/InputSearch";
import { AppSettings } from "../../common/constants/appSettings";
import { Title } from "../../common/ui/Title/Title";

const tableHead = [{ name: "Название справочника", value: "name" }];

export const PageDictionaryList: React.FC = () => {
  const history = useHistory();

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [list, setList] = useState(dictionaryList);

  useEffect(() => {
    setList(
      dictionaryList.filter((item, index) => index >= (pageNumber - 1) * pageCount && index < pageNumber * pageCount)
    );
  }, [pageCount, pageNumber]);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  const updateSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setList(
      dictionaryList.filter(
        (item) => item.name.toLocaleLowerCase().indexOf(event.currentTarget.value.toLocaleLowerCase().trim()) !== -1
      )
    );
  };

  const control = useMemo(() => {
    return [
      {
        name: "clickRow",
        onClick: (value) => history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary/${value}`),
        value: "url",
      } as IControlTable,
    ];
  }, [history]);

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>Справочники</title>
      </MetaTags>
      <Container>
        <StatementData>
          <Title id={"dictionary_title"}>Справочники</Title>
          <InputSearch onChange={updateSearchText} maxLength={80} />
        </StatementData>
        <StatementData>
          <div />
          <Pagination
            allCount={dictionaryList.length}
            countFromPage={pageCount}
            page={pageNumber}
            onClick={newPageNumber}
            selectPageCount={selectPageCount}
          />
        </StatementData>

        <StatementData />
        {list && list.length > 0 ? (
          <TableHead tableHead={tableHead}>
            <TableBody tableHead={tableHead} tableBody={list} control={control} clickRow={true} />
          </TableHead>
        ) : (
          <h1 id={"result_not_found"}>{ru.resultNotFound}</h1>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};
