import { pageSize } from "common/constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { TableHead } from "common/components/Table/TableHead";
import { IOrderControlEvent } from "../../common/interfaces/order/IOrderControlEvent";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { proposalControlEventsSelector } from "../../module/proposalControlEvents/proposalControlEventsSelector";
import { ProposalControlEventsThunk } from "../../module/proposalControlEvents/proposalControlEventsThunk";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { SettingsTable } from "../../common/components/Table/SettingsTable";
import { Access, orderAccess } from "./helpers/access";
import { ModalAddControlEvents } from "./components/ModalAddControlEvents";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { IControlTable, TableBody } from "../../common/components/Table/TableBody";
import moment from "moment";
import { modal } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Название", value: "name" },
  { name: "Дата события", value: "eventDate" },
  { name: "Дата изменения", value: "updatedAt" },
];

export const PageProposalControlEvents = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const state = useSelector(proposalControlEventsSelector);
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
    dispatch(ProposalControlEventsThunk.getList(proposalId, pageNumber, pageCount));
  }, [dispatch, proposalId, pageNumber, pageCount]);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(proposalId));
  }, [dispatch, proposalId]);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const createQualityRequirements = useCallback(
    async (data: IOrderControlEvent) => {
      if (data.id) {
        await dispatch(ProposalControlEventsThunk.update(data));
      } else {
        await dispatch(ProposalControlEventsThunk.create(data));
      }
      dispatch(ProposalControlEventsThunk.getList(proposalId, pageNumber, pageCount));
    },

    [dispatch, proposalId, pageNumber, pageCount]
  );

  const onDelete = useCallback(
    async (id: number) => {
      await dispatch(ProposalControlEventsThunk.delete(id));
      dispatch(ProposalControlEventsThunk.getList(proposalId, pageNumber, pageCount));
    },
    [proposalId, pageNumber, pageCount, dispatch]
  );

  const openModalControl = async (id?: number, disabled?: boolean) => {
    modal.open(
      <ModalAddControlEvents
        disabled={disabled || false}
        save={createQualityRequirements}
        orderId={proposalId}
        currentEventID={id || null}
      />
    );
  };

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister title links={useNavigationProposal()} breadcrumbs={orderName} sectionName={"Заявки"} />
      <Container>
        <SettingsTable
          nameButtonOpenModal={"Добавить событие"}
          openModal={() => openModalControl()}
          access={access}
          pageCount={pageCount}
          selectPageCount={selectPageCount}
          total={state.controlEventsList.totalCount}
          pageNumber={pageNumber}
          newPageNumber={newPageNumber}
        />

        {state.loading ? (
          <IconLoading />
        ) : (
          <TableHead numbering tableHead={tableHead} control={true}>
            <TableBody
              disabledApproveDelete
              numbering
              tableHead={tableHead}
              tableBody={state.controlEventsList.items?.map((item) => ({
                ...item,
                updatedAt: moment(item.updatedAt).format("DD MMMM YYYY"),
                eventDate: moment(item.eventDate).format("DD MMMM YYYY"),
              }))}
              control={
                access === Access.Edit
                  ? ([
                      { name: "edit", onClick: (id: number) => openModalControl(id), value: "id" },
                      { name: "delete", onClick: (id: number) => onDelete(Number(id)), value: "id" },
                    ] as IControlTable[])
                  : ([
                      {
                        name: "watch",
                        onClick: (id: number) => openModalControl(id, true),
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
