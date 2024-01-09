import { styled } from "common/styles/styled";
import React, { ChangeEvent, useMemo } from "react";
import {
  ContainerControl,
  IconContainerFloatingmes,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "common/components/Table/UIcomponent/UIcomponent";
import { InputSearch } from "common/ui/Input/InputSearch";
import { IconEye } from "common/components/Icon/IconEye";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Table } from "common/components/Table/TableHead";
import { useHistory } from "react-router";
import { IUser } from "common/interfaces/user/IUser";
import { IPaginateItems } from "../../../common/interfaces/dictionary/IDictionaryDisplayField";
import { ModalDeleteWIthIcon } from "../../../common/components/Modal/ModalDeleteWIthIcon";
import { ModalText } from "../../../common/components/Popup/ui/ModalText";

interface IProps {
  list: IPaginateItems<IUser[]>;
  loading: boolean;
  onDeleteUser: (id: number) => void;
  updateSearchText: (value: ChangeEvent<HTMLInputElement>, type: "fio" | "fr" | "group") => void;
}

export const TableUserList = (props: IProps) => {
  const history = useHistory();

  const bodyTable = useMemo(() => {
    return props.list.items?.map((item) => (
      <Tr key={`row_${item.id}`}>
        <Td id={`column_fio_${item.id}`} isClicker onClick={() => history.push(`./users/edit/${item.id}`)}>
          {item.familyName} {item.givenName} {item.middleName}
        </Td>
        <Td id={`column_frmr_${item.id}`} isClicker onClick={() => history.push(`./users/edit/${item.id}`)}>
          {item.lpuNameFrmr}
        </Td>
        <Td id={`column_group_${item.id}`} isClicker onClick={() => history.push(`./users/edit/${item.id}`)}>
          {item?.availableGroups.map((item) => item?.groupName).join(", ")}
        </Td>
        <Td id={`column_activity_${item.id}`} isClicker onClick={() => history.push(`./users/edit/${item.id}`)}>
          {item.isActive && !item.frmrBlock
            ? "Активна"
            : item.isActive === false || item.frmrBlock
            ? "Заблокирована"
            : "Н/Д"}
        </Td>
        <Td>
          <ContainerControl>
            <IconContainerFloatingmes
              id={`watch_${item.id}`}
              title={"Открыть"}
              onClick={() => history.push(`./users/edit/${item.id}`)}
            >
              <IconEye />
            </IconContainerFloatingmes>
            <ModalDeleteWIthIcon
              description={
                <ModalText>
                  Удалить следующего пользователя?
                  <br />
                  <br />
                  {`${item?.familyName} ${item?.givenName} ${item?.middleName}`}
                </ModalText>
              }
              id={`delete_${item.id}`}
              onDelete={() => props.onDeleteUser(item.id)}
            />
          </ContainerControl>
        </Td>
      </Tr>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.list, props.onDeleteUser]);

  const headTable = useMemo(() => {
    return (
      <Thead>
        <Tr>
          <StyledTh id={"fio_thead"}>
            <SearchContainer>
              ФИО
              <InputSearch
                onChange={(value: ChangeEvent<HTMLInputElement>) => props.updateSearchText(value, "fio")}
                id={"serach_fio"}
                maxLength={80}
                width={300}
              />
            </SearchContainer>
          </StyledTh>
          <StyledTh id={"frmr_thead"}>
            <SearchContainer>
              МО ФРМР
              <InputSearch
                onChange={(value: ChangeEvent<HTMLInputElement>) => props.updateSearchText(value, "fr")}
                id={"serach_frmr"}
                maxLength={100}
                width={300}
              />
            </SearchContainer>
          </StyledTh>
          <StyledTh id={"group_thead"}>
            <SearchContainer>
              Группа
              <InputSearch
                onChange={(value: ChangeEvent<HTMLInputElement>) => props.updateSearchText(value, "group")}
                id={"serach_group"}
                maxLength={30}
                width={300}
              />
            </SearchContainer>
          </StyledTh>
          <StyledTh id={"activity_thead"}>
            <SearchContainer>Статус учетной записи</SearchContainer>
          </StyledTh>
          <StyledTh id={"controls"}>Действия</StyledTh>
        </Tr>
      </Thead>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateSearchText]);

  return (
    <Container>
      <Table>
        {headTable}
        {!props.loading && <Tbody>{bodyTable}</Tbody>}
      </Table>
      {props.loading && <IconLoading />}
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
  height: 100%;
`;

const SearchContainer = styled.span`
  display: flex;
  align-items: center;

  div {
    margin-left: 30px;

    #search {
      width: auto;
    }
  }
`;

const StyledTh = styled(Th)`
  padding: 12px 12px;
`;
