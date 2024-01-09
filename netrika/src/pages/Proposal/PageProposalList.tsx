import { OrderApiRequest } from "api/orderApiRequest";
import { orderStatusMap } from "common/helpers/orderStatusMap";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { TableHead } from "common/components/Table/TableHead";
import { Tbody, Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";
import { IAddOrderRequest } from "../../common/interfaces/order/IAddOrderRequest";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { proposalListSelector } from "../../module/proposalList/proposalListSelector";
import { ProposalListThunk } from "../../module/proposalList/proposalListThunk";
import { proposalInfo } from "../../common/constants/routes";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { errorPopup } from "../../common/helpers/toast/error";
import { Footer } from "../../common/components/Footer";
import { successPopup } from "../../common/helpers/toast/success";
import { ModalAddProposal } from "./components/ScreenProposal/ModalAddProposal";
import { UpdateStatus } from "./components/ScreenProposal/UpdateStatus";
import { TableGroup } from "../../common/components/Table/TableGroup";
import { IProposalFilter, ProposalFilter } from "./components/ScreenProposal/ProposalFilter";
import styled from "styled-components";
import { theme } from "../../common/styles/theme";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { drawer, modal } from "../../common/helpers/event/modalEvent";
import { Title } from "../../common/ui/Title/Title";

const tableHead = [
  { name: "ID Заявки", value: "id" },
  { name: "Название заявки", value: "name" },
  { name: "Статус", value: "status" },
  { name: "Дата создания", value: "creationDate", type: "date" },
  { name: "Заявитель", value: "userName" },
  { name: "Сеть МО", value: "networkName" },
];

export const PageProposalList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userRoles = useSelector(authorizationSelector);
  const state = useSelector(proposalListSelector);

  const [filter, setFilter] = useState<IProposalFilter>({});
  const [sort, setSort] = useState<{ isDesc: boolean; field?: string }>({
    isDesc: false,
    field: "id",
  });

  useEffect(() => {
    dispatch(ProposalListThunk.getList({ ...filter, orderColumn: sort.field ?? "id", orderAsc: sort.isDesc }));
  }, [dispatch, sort, filter]);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getAvalableRegisterNetwork());
    dispatch(ProposalListThunk.registerGroup());
  }, [dispatch]);

  const handleSort = useCallback(
    (nextField: string) => {
      const field = nextField === sort.field && sort.isDesc ? undefined : nextField;
      const isDesc = field === sort.field;
      setSort({ isDesc, field });
    },
    [setSort, sort]
  );

  const createProposal = useCallback(
    async (request: IAddOrderRequest) => {
      try {
        const result = await new OrderApiRequest().createOrder(request);
        if (result.isError) {
          throw result;
        }
        successPopup("Заявка успешно добавлена.");
        history.push(proposalInfo.path(result.result.id));
      } catch (error) {
        errorPopup(error.message);
      }
    },
    [history]
  );

  const editProposal = (id: number) => {
    history.push(proposalInfo.path(id));
  };

  const openModalAdd = useCallback(() => {
    modal.open(<ModalAddProposal onSave={createProposal} option={state.registerGroup} />);
  }, [createProposal, state.registerGroup]);

  const createElem = useMemo(() => {
    return userRoles.login === UserRolesEnum.RegistryExpert ||
      userRoles.login === UserRolesEnum.RegistrySuperExpert ||
      userRoles.login === UserRolesEnum.RegistryAdmin ||
      userRoles.login === UserRolesEnum.RegistrySuperUsr ? (
      <ButtonCreateElem text="Создать заявку" onClick={openModalAdd} />
    ) : (
      <div />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoles, openModalAdd]);

  const updateList = useCallback(() => {
    dispatch(ProposalListThunk.getList({ ...filter, orderColumn: sort.field ?? "id", orderAsc: sort.isDesc }));
  }, [sort.field, sort.isDesc, dispatch, filter]);

  const openDrawerFilter = () => {
    drawer.open(
      <ProposalFilter
        onClear={() => setFilter({})}
        defaultValue={filter}
        onSave={(value) => {
          setFilter(value);
          drawer.close();
        }}
      />
    );
  };

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>Заявки</title>
      </MetaTags>
      <Container>
        <StatementData>
          <Title id={"title"}>Заявки</Title>
          <ButtonFilter id={"button-filter"} onClick={openDrawerFilter}>
            Расширенный поиск
          </ButtonFilter>
        </StatementData>
        <StatementData>{createElem}</StatementData>
        <StatementData />
        <TableHead withGroup tableHead={tableHead} control={true} sort={handleSort} fieldSort={sort}>
          {!!state.list?.length && !state.loading ? (
            <>
              {state.list.map((group, index) => (
                <TableGroup key={index} index={index} name={group.nameRegisterGroup}>
                  <Tbody>
                    {group.orders.map((body) => {
                      return (
                        body && (
                          <Tr key={"tr" + body.id}>
                            <Td id={`column_hiden_check_${body.id}`} />
                            <Td id={`column_id_${body.id}`} onClick={() => editProposal(body.id)} isClicker>
                              {body.id}
                            </Td>
                            <Td id={`column_name_${body.id}`} onClick={() => editProposal(body.id)} isClicker>
                              {body.name}
                            </Td>
                            <Td id={`column_status_${body.id}`} onClick={() => editProposal(body.id)} isClicker>
                              {orderStatusMap.get(body.status)}
                            </Td>
                            <Td
                              id={`column_createdAt_${body.id}`}
                              noWrapText
                              onClick={() => editProposal(body.id)}
                              isClicker
                            >
                              {" "}
                              {moment(body.creationDate).format("DD MMMM YYYY")}
                            </Td>
                            <Td
                              id={`column_userName_${body.id}`}
                              noWrapText
                              onClick={() => editProposal(body.id)}
                              isClicker
                            >
                              {" "}
                              {body.userName}
                            </Td>
                            <Td
                              id={`column_networkName_${body.id}`}
                              noWrapText
                              onClick={() => editProposal(body.id)}
                              isClicker
                            >
                              {body.networkName}
                            </Td>
                            <Td>
                              <UpdateStatus
                                info={body}
                                openOrder={editProposal}
                                updateList={updateList}
                                orderID={body.id}
                                id={"column_control_"}
                              />
                            </Td>
                          </Tr>
                        )
                      );
                    })}
                  </Tbody>
                </TableGroup>
              ))}
            </>
          ) : null}
        </TableHead>
        {state.loading && (
          <StyledTitleH2>
            <IconLoading />
          </StyledTitleH2>
        )}
        {!state.list?.length && !state.loading && (
          <StyledTitleH2 id={"result_not_found"}>Результаты не найдены</StyledTitleH2>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};

const ButtonFilter = styled.div`
  cursor: pointer;
  align-items: center;
  margin-right: 12px;
  color: ${theme.colors.green};
  padding-bottom: 5px;

  &:hover {
    padding-bottom: 4px;
    border-bottom: 1px solid ${theme.colors.green};
  }
`;

const StyledTitleH2 = styled.h2`
  position: absolute;
  top: 25%;
  right: 45%;

  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
  margin: 33px 0;
`;
