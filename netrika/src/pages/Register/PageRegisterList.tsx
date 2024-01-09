import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { ru } from "common/lang/ru";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { InputSearch } from "common/ui/Input/InputSearch";
import { TableBodyWithGroups } from "common/components/Table/TableBodyWithGroups";
import { registerListSelector } from "../../module/registerList/registerListSelector";
import { RegisterListThunk } from "../../module/registerList/registerListThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { TableHeadRegisterList } from "./component/RegisterList/TableHeadRegisterList";
import { useDebounce } from "../../common/hooks/useDebounce";
import { useRegisterTable } from "./hooks/useRegisterTable";
import { Title } from "../../common/ui/Title/Title";

export const PageRegisterList = () => {
  const dispatch = useDispatch();
  const { loading, list } = useSelector(registerListSelector);

  const [archive, setArchive] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  const onDeleteRegister = useCallback(
    async (id: number) => {
      await dispatch(RegisterListThunk.deleteRegister(id));
      setSearchText("");
    },
    [dispatch]
  );

  const { tableHead, control } = useRegisterTable({ onDeleteRegister });

  useEffect(() => {
    dispatch(RegisterListThunk.getList(debounceText));
  }, [debounceText, dispatch]);

  const addDeleteElementToArchive = useCallback((id: number, check: boolean) => {
    setArchive((prev) => (check ? [...prev, id] : archive.filter((item: number) => item !== id)));
    // eslint-disable-next-line
  }, []);

  const updateSearchText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  }, []);

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>Регистры</title>
      </MetaTags>
      <Container>
        <StatementData>
          <Title id={"register_title"}>Регистры</Title>
          <InputSearch onChange={updateSearchText} maxLength={70} value={searchText} />
        </StatementData>
        <StatementData />
        {loading ? (
          <IconLoading />
        ) : list?.length ? (
          <TableHeadRegisterList tableHead={tableHead}>
            <TableBodyWithGroups
              tableHead={tableHead}
              list={list}
              checkControl={addDeleteElementToArchive}
              checkList={archive}
              control={control}
            />
          </TableHeadRegisterList>
        ) : (
          <h1 id={"result_not_found"}>{ru.resultNotFound}</h1>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};
