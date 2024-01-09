import { IUsersRequest } from "common/interfaces/user/IUsersRequest";
import { pageSize } from "common/constants";
import { UsersListAction } from "module/usersList/usersListAction";
import { profileSelector, usersListSelector } from "module/usersList/usersListSelector";
import { UserListThunk } from "module/usersList/usersListThunk";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import {
  Container,
  ContainerWithFooter,
  CustomStatementData,
  StatementData,
} from "common/components/Container/Container";
import { Pagination } from "common/ui/Pagination/Pagination";
import { Footer } from "../../common/components/Footer";
import { TableUserList } from "./components/TableUserList";
import { useDebounce } from "../../common/hooks/useDebounce";
import { Title } from "../../common/ui/Title/Title";

export const PageUsersList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list, loading } = useSelector(usersListSelector);
  const { profile } = useSelector(profileSelector);

  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchFr, setSearchFr] = useState("");
  const [searchGroup, setSearchGroup] = useState("");

  const debounceName = useDebounce(searchName, 500);
  const debounceFr = useDebounce(searchFr, 500);
  const debounceGroup = useDebounce(searchGroup, 500);

  const data = useMemo(
    () => ({
      ...list,
      items: list?.items ? list.items.filter((el) => (profile.isSysAcc ? el : !el.isSysAcc)) : [],
    }),
    [list, profile.isSysAcc]
  );

  useEffect(() => {
    dispatch(UsersListAction.clearUser(null));
  }, [dispatch]);

  const clickAddUsers = useCallback(() => {
    history.push("./users/create");
  }, [history]);

  const selectPageCount = useCallback(
    (value: string | number) => {
      updatePageNumber(1);
      updatePageCount(Number(value));
    },
    [updatePageNumber, updatePageCount]
  );

  const newPageNumber = useCallback(
    (newPage: number) => {
      updatePageNumber(newPage);
    },
    [updatePageNumber]
  );

  useEffect(() => {
    dispatch(
      UserListThunk.getList(pageCount, pageNumber, {
        searchName: debounceName,
        searchFr: debounceFr,
        searchGroup: debounceGroup,
      } as IUsersRequest)
    );
  }, [dispatch, pageCount, pageNumber, debounceName, debounceFr, debounceGroup]);

  const onDeleteUser = async (id: number) => {
    await dispatch(
      UserListThunk.deleteUser(id, pageCount, pageNumber, {
        searchName,
        searchFr,
        searchGroup,
      } as IUsersRequest)
    );
  };

  const updateSearchText = useCallback((event: ChangeEvent<HTMLInputElement>, type: "fio" | "fr" | "group") => {
    switch (type) {
      case "fio": {
        setSearchName(event.currentTarget.value);
        break;
      }
      case "fr": {
        setSearchFr(event.currentTarget.value);
        break;
      }
      case "group": {
        setSearchGroup(event.currentTarget.value);
        break;
      }
    }
    updatePageNumber(1);
  }, []);

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>Пользователи</title>
      </MetaTags>
      <Container>
        <CustomStatementData>
          <Title id={"users_title"}>Пользователи</Title>
        </CustomStatementData>
        <StatementData>
          <ButtonCreateElem onClick={clickAddUsers} text="Добавить пользователя" />

          <Pagination
            selectPageCount={selectPageCount}
            allCount={list.totalCount}
            countFromPage={pageCount}
            page={pageNumber}
            onClick={newPageNumber}
          />
        </StatementData>
        <StatementData />
        <TableUserList list={data} loading={loading} updateSearchText={updateSearchText} onDeleteUser={onDeleteUser} />

        <Footer />
      </Container>
    </ContainerWithFooter>
  );
};
