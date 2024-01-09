import { pageSize } from "common/constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { SettingsTable } from "common/components/Table/SettingsTable";
import { TableHead } from "common/components/Table/TableHead";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { proposalContingentSelector } from "../../module/proposalContingent/proposalContingentSelector";
import { ProposalContingentThunk } from "../../module/proposalContingent/proposalContingentThunk";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { Access, orderAccess } from "./helpers/access";
import { ModalAddContingent } from "./components/Contingent/ModalAddContingent";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { IControlTable, TableBody } from "../../common/components/Table/TableBody";
import moment from "moment";
import { IOrderContingent } from "../../common/interfaces/order/IOrderContingent";
import { modal } from "../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../common/helpers/getTitle";

const tableHead = [
  { name: "Название", value: "name" },
  { name: "Описание", value: "description" },
  { name: "Тип отчёта", value: "elementType" },
  { name: "Ссылка на отчёт", value: "link" },
  { name: "Дата изменения", value: "updatedAt" },
];

export const PageProposalContingent = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const state = useSelector(proposalContingentSelector);
  const stateAuth = useSelector(authorizationSelector);
  const { orderStatus, orderName } = useSelector(orderStatusSelector);
  const [access, setAccess] = useState<Access>(Access.View);
  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);

  const selectPageCount = useCallback((value: string | number) => {
    updatePageNumber(1);
    updatePageCount(Number(value));
  }, []);

  const newPageNumber = useCallback((newPage: number) => {
    updatePageNumber(newPage);
  }, []);

  useEffect(() => {
    dispatch(ProposalContingentThunk.getList(proposalId, pageNumber, pageCount));
  }, [dispatch, proposalId, pageNumber, pageCount]);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(proposalId));
    dispatch(ProposalContingentThunk.getListType());
  }, [dispatch, proposalId]);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const createContingent = useCallback(
    async (data: IOrderContingent) => {
      if (data.id) {
        await dispatch(ProposalContingentThunk.update(data));
      } else {
        await dispatch(ProposalContingentThunk.create(data));
      }
      dispatch(ProposalContingentThunk.getList(proposalId, pageNumber, pageCount));
    },
    [dispatch, proposalId, pageNumber, pageCount]
  );

  const onDelete = useCallback(
    async (id: number) => {
      await dispatch(ProposalContingentThunk.delete(id));
      dispatch(ProposalContingentThunk.getList(proposalId, pageNumber, pageCount));
    },
    [proposalId, pageNumber, pageCount, dispatch]
  );

  const openModalContingent = (type: "add" | "edit" | "view", id?: number) => {
    const orderContingent = state?.contingentList?.items?.find((item) => item.id === id);
    modal.open(
      <ModalAddContingent
        disabled={type === "view"}
        value={orderContingent}
        onSubmit={createContingent}
        orderId={proposalId}
        options={state.type}
        title={getTitleModal(type, "report")}
      />
    );
  };

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister
        links={useNavigationProposal()}
        title={true}
        breadcrumbs={orderName}
        sectionName={"Заявки"}
      />
      <Container>
        <SettingsTable
          nameButtonOpenModal={"Добавить отчёт"}
          openModal={() => openModalContingent("add")}
          access={access}
          pageCount={pageCount}
          selectPageCount={selectPageCount}
          total={state.contingentList.totalCount}
          pageNumber={pageNumber}
          newPageNumber={newPageNumber}
        />

        {state.loading ? (
          <IconLoading />
        ) : (
          <TableHead tableHead={tableHead} numbering control={true}>
            <TableBody
              disabledApproveDelete
              numbering
              tableHead={tableHead}
              tableBody={state.contingentList.items?.map((e) => ({
                ...e,
                updatedAt: moment(e.updatedAt).format("DD MMMM YYYY"),
              }))}
              control={
                access === Access.Edit
                  ? ([
                      {
                        name: "edit",
                        onClick: (id: number) => openModalContingent("edit", id),
                        value: "id",
                      },
                      { name: "delete", onClick: onDelete, value: "id" },
                    ] as IControlTable[])
                  : ([
                      {
                        name: "watch",
                        onClick: (id: number) => openModalContingent("view", id),
                        value: "id",
                      },
                    ] as IControlTable[])
              }
            />
          </TableHead>
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};
