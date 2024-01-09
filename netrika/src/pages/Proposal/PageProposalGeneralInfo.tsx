import { DownloadFileContainer } from "pages/Register/PageRegisterCheckList";
import { saveAs } from "file-saver";
import { ProposalGeneralInfoAction } from "module/proposalGeneralInfo/proposalGeneralInfoAction";
import { UserListThunk } from "module/usersList/usersListThunk";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { IOrderAttachment } from "../../common/interfaces/order/IOrderAttachment";
import { IOrder } from "../../common/interfaces/order/IOrder";
import { styled } from "../../common/styles/styled";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import {
  proposalDownloadFileSelector,
  proposalGeneralInfoAttachmentsSelector,
  proposalGeneralInfoSelector,
} from "../../module/proposalGeneralInfo/proposalGeneralInfoSelector";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { Access, orderAccess } from "./helpers/access";
import { FormInfoProposal } from "./components/GeneralInfo/FormInfoProposal";
import { ModalAddFile } from "./components/GeneralInfo/ModalAddFile";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { ButtonCreateElem } from "../../common/ui/Button/ButtonCreateElem";
import { modal } from "../../common/helpers/event/modalEvent";
import { StatementDataProposal } from "./components/GeneralInfo/StatementDataProposal";
import { FormInfoFieldsEnum } from "./interfaces/FormInfoFieldsEnum";
import { visibilityChaptersUserSelector } from "../../module/usersList/usersListSelector";

const tableHead = [
  { name: "Описание вложения", value: "description" },
  { name: "Название файла", value: "name" },
];

export const PageProposalGeneralInfo = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const state = useSelector(proposalGeneralInfoSelector);
  const attachments = useSelector(proposalGeneralInfoAttachmentsSelector);
  const stateAuth = useSelector(authorizationSelector);
  const { seeAllChaptersOrder } = useSelector(visibilityChaptersUserSelector);
  const { orderStatus, orderName } = useSelector(orderStatusSelector);
  const { downloadFile, loadingFile } = useSelector(proposalDownloadFileSelector);
  const [access, setAccess] = useState<any>();
  const [info, updateInfo] = useState({} as IOrder);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getOrderMedProfiles());
    dispatch(ProposalGeneralInfoThunk.getInfo(+proposalId));
    dispatch(ProposalGeneralInfoThunk.getRegisterGroup());
    dispatch(ProposalGeneralInfoThunk.getInfoAttachment(+proposalId));
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(+proposalId));
    dispatch(ProposalGeneralInfoThunk.getVimisSystem());
    // Получение видимости поля для НСИ
    dispatch(ProposalGeneralInfoThunk.getEnableNsiOption());
    dispatch(UserListThunk.getUserGroups());
    dispatch(UserListThunk.getWorkPosition());
    dispatch(ProposalGeneralInfoThunk.getAvalableRegisterNetwork());

    return () => {
      dispatch(
        ProposalGeneralInfoAction.getFile.done({
          params: null,
          result: { isFile: false, file: undefined, name: "" },
        })
      );
    };
  }, [dispatch, proposalId]);

  useEffect(() => {
    updateInfo(state.order);
  }, [state]);

  useEffect(() => {
    return function cleanup() {
      dispatch(ProposalGeneralInfoAction.info.done({ params: null, result: {} as IOrder }));
    };
  }, [dispatch]);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const addAttachment = useCallback(
    async (description: string, file: File) => {
      const request = {
        description,
        name: file.name,
        orderId: +proposalId,
      } as IOrderAttachment;
      await dispatch(ProposalGeneralInfoThunk.addAttachment(request, file));
      dispatch(ProposalGeneralInfoThunk.getInfoAttachment(+proposalId));
    },
    [proposalId, dispatch]
  );

  const deleteAttachment = useCallback(
    async (id?: string) => {
      await dispatch(ProposalGeneralInfoThunk.deleteAttachment(Number(id)));
      dispatch(ProposalGeneralInfoThunk.getInfoAttachment(+proposalId));
    },
    [dispatch, proposalId]
  );

  const clickDownloadFile = useCallback(
    (id?: string, name?: string) => {
      dispatch(ProposalGeneralInfoThunk.downloadFile(Number(id), name));
    },
    [dispatch]
  );

  useEffect(() => {
    if (downloadFile.file) {
      saveAs(downloadFile.file, downloadFile.name || "без названия");
    }
  }, [downloadFile]);

  const control = useMemo(() => {
    return access === Access.Edit
      ? [
          { name: "delete", onClick: deleteAttachment, value: "id" } as IControlTable,
          { name: "download", onClick: clickDownloadFile, value: "id" } as IControlTable,
        ]
      : [{ name: "download", onClick: clickDownloadFile, value: "id" } as IControlTable];
  }, [deleteAttachment, clickDownloadFile, access]);

  const openModalAddFile = useCallback(() => {
    modal.open(<ModalAddFile onSubmit={addAttachment} />);
  }, [addAttachment]);

  const hiddenFields = useMemo(() => {
    if (seeAllChaptersOrder) return [];
    const keepFields = [FormInfoFieldsEnum.Name, FormInfoFieldsEnum.Description, FormInfoFieldsEnum.Group];
    return Object.values(FormInfoFieldsEnum).filter((value) => !keepFields.includes(value));
  }, [seeAllChaptersOrder]);

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister links={useNavigationProposal()} title breadcrumbs={orderName} sectionName="Заявки" />
      {state.loading ? (
        <IconLoading />
      ) : (
        <Container>
          {info && info?.status ? (
            <>
              {seeAllChaptersOrder && <StatementDataProposal {...info} />}
              <FormInfoProposal
                hiddenFields={hiddenFields}
                access={access}
                updateInfo={updateInfo}
                info={info}
                avalableRegisterNetworkList={state.avalableRegisterNetworkList}
                registerGroup={state.registerGroup}
              />
              <BlockAddFile>
                <Title>Вложенные файлы</Title>
                {access === Access.Edit && <ButtonCreateElem text={" Добавить вложение"} onClick={openModalAddFile} />}
              </BlockAddFile>
              <TableHead numbering disableScroll tableHead={tableHead} control={true}>
                <TableBody numbering tableHead={tableHead} tableBody={attachments.attachments} control={control} />
              </TableHead>
            </>
          ) : null}
        </Container>
      )}
      <Footer />

      {loadingFile ? (
        <DownloadFileContainer>
          <IconLoading />
        </DownloadFileContainer>
      ) : null}
    </ContainerWithFooter>
  );
};

const Title = styled.h2`
  margin-bottom: 20px;
`;

const BlockAddFile = styled.div`
  margin: 20px 0;
`;
