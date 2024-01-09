import { pageSize } from "common/constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { TableHead } from "common/components/Table/TableHead";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { proposalCheckListSelector } from "../../module/proposalCheckList/proposalCheckListSelector";
import { ProposalCheckListThunk } from "../../module/proposalCheckList/proposalCheckListThunk";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { SettingsTable } from "../../common/components/Table/SettingsTable";
import { Access, orderAccess } from "./helpers/access";
import { ProposalCheckListTableBody } from "./components/ProposalCheckListTableBody";
import { ProposalCriterionThunk } from "../../module/proposalCriterion/proposalCriterionThunk";
import { DrawerConstructorSettings } from "./components/ScreenProposal/DrawerConstructorSettings/DrawerConstructorSettings";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { ProposalCheckListAction } from "../../module/proposalCheckList/proposalCheckListAction";
import { FilterConstructorAction } from "../../module/filter/filterConstructorAction";
import { drawer } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Название", value: "name" },
  { name: "Описание", value: "description" },
  { name: "Дата изменения", value: "date" },
];

export const PageProposalCheckList = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const state = useSelector(proposalCheckListSelector);
  const stateAuth = useSelector(authorizationSelector);
  const { orderStatus, orderName } = useSelector(orderStatusSelector);
  const [access, setAccess] = useState<any>();
  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(proposalId));
    dispatch(ProposalCriterionThunk.getCriterionFind());
    dispatch(ProposalCriterionThunk.getCriterionText(proposalId));
    dispatch(FilterConstructorAction.clearFilter(true));
  }, [dispatch, proposalId]);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  /* Функция для обновления списка после изменения элемента таблицы */
  const getCheckLists = useCallback(() => {
    dispatch(ProposalCheckListThunk.getList(proposalId, pageNumber, pageCount));
  }, [dispatch, proposalId, pageNumber, pageCount]);

  useEffect(() => {
    dispatch(ProposalCheckListThunk.getList(proposalId, pageNumber, pageCount));
  }, [dispatch, proposalId, pageNumber, pageCount]);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const closeDrawer = useCallback(() => {
    dispatch(ProposalCheckListAction.clearSettings(true));
    dispatch(FilterConstructorAction.clearFilter(true));
  }, [dispatch]);

  const openDrawer = useCallback(
    (isEdit: boolean) => {
      drawer.open(
        <DrawerConstructorSettings
          proposalId={proposalId}
          access={access}
          disabled={access === Access.View}
          onClose={closeDrawer}
          isCreate={!isEdit}
        />
      );
    },
    [proposalId, access, closeDrawer]
  );

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister title links={useNavigationProposal()} breadcrumbs={orderName} sectionName={"Заявки"} />
      <Container>
        <SettingsTable
          nameButtonOpenModal={"Добавить новый список"}
          openModal={openDrawer}
          access={access}
          pageCount={pageCount}
          selectPageCount={selectPageCount}
          total={state.controlCheckList.totalCount}
          pageNumber={pageNumber}
          newPageNumber={newPageNumber}
        />

        {state.loading ? (
          <IconLoading />
        ) : (
          <TableHead numbering tableHead={tableHead} control={true}>
            <ProposalCheckListTableBody
              handlerModal={openDrawer}
              access={access}
              controlCheckList={state.controlCheckList}
              onUpdateRow={getCheckLists}
            />
          </TableHead>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};
