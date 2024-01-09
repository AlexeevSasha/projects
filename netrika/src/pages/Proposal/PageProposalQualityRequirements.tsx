import { pageSize } from "common/constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { TableHead } from "common/components/Table/TableHead";
import { IOrderQualityCriterion } from "../../common/interfaces/order/IOrderQualityCriterion";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { proposalQualityRequirementsSelector } from "../../module/proposalQualityRequirements/proposalQualityRequirementsSelector";
import { ProposalQualityRequirementsThunk } from "../../module/proposalQualityRequirements/proposalQualityRequirementsThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { SettingsTable } from "../../common/components/Table/SettingsTable";
import { Access, orderAccess } from "./helpers/access";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { IControlTable, TableBody } from "../../common/components/Table/TableBody";
import moment from "moment";
import { ButtonCreateElem } from "../../common/ui/Button/ButtonCreateElem";
import { CardClinrec } from "../DiseaseCard/component/IntegralDiseaseEpicrisis/CardClinrec";
import styled from "styled-components";
import { CardPomp } from "../DiseaseCard/component/IntegralDiseaseEpicrisis/CardPomp";
import { ModalImport } from "./components/QualityRequirements/ModalImport";
import { DictionaryClinrecPompThunk } from "../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { dictionaryClinrecPompSelector } from "../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { ModalAddQualityRequirements } from "./components/QualityRequirements/ModalAddQualityRequirements";
import { modal } from "../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../common/helpers/getTitle";

const tableHead = [
  { name: "Название", value: "name" },
  { name: "Описание", value: "description" },
  { name: "Дата изменения", value: "updatedAt", width: "100px" },
];

export const accessContext = React.createContext<{
  access?: Access;
}>({ access: undefined });

export const PageProposalQualityRequirements = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const state = useSelector(proposalQualityRequirementsSelector);
  const stateAuth = useSelector(authorizationSelector);
  const { orderStatus, orderName } = useSelector(orderStatusSelector);
  const { loadingClinrecSelects } = useSelector(dictionaryClinrecPompSelector);
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

  /* Функция для обновления списка после изменения элемента таблицы */

  useEffect(() => {
    dispatch(ProposalQualityRequirementsThunk.getList(proposalId, pageNumber, pageCount));
  }, [dispatch, proposalId, pageNumber, pageCount]);

  useEffect(() => {
    dispatch(ProposalQualityRequirementsThunk.getParentCriterion(proposalId));
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(proposalId));
    dispatch(ProposalQualityRequirementsThunk.getOrderCriterionQualityQuery());
    dispatch(ProposalQualityRequirementsThunk.getOrderPomp(proposalId));
    dispatch(ProposalQualityRequirementsThunk.getOrderClinrec(proposalId));
    dispatch(DictionaryClinrecPompThunk.getInfoForCreateClinrec());
    dispatch(DictionaryClinrecPompThunk.getPompProfiles());
  }, [dispatch, proposalId]);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const createQualityRequirements = async (data: IOrderQualityCriterion) => {
    await dispatch(ProposalQualityRequirementsThunk.create(data));
    dispatch(ProposalQualityRequirementsThunk.getList(proposalId, pageNumber, pageCount));
    dispatch(ProposalQualityRequirementsThunk.getParentCriterion(proposalId));
  };
  const updateQualityRequirements = async (data: IOrderQualityCriterion) => {
    await dispatch(ProposalQualityRequirementsThunk.update(data));
    dispatch(ProposalQualityRequirementsThunk.getList(proposalId, pageNumber, pageCount));
    dispatch(ProposalQualityRequirementsThunk.getParentCriterion(proposalId));
  };

  const onDelete = useCallback(
    async (id: number) => {
      await dispatch(ProposalQualityRequirementsThunk.delete(id));
      dispatch(ProposalQualityRequirementsThunk.getList(proposalId, pageNumber, pageCount));
    },

    [proposalId, pageNumber, pageCount, dispatch]
  );

  const actionTableClick = async (id: number, type: "edit" | "view") => {
    await dispatch(ProposalQualityRequirementsThunk.getOrderCriterionQualityById(id));
    openModalQuality(type);
  };

  const openModalQuality = (type: "add" | "edit" | "view") => {
    modal.open(
      <ModalAddQualityRequirements
        disabled={type === "view"}
        option={state.queryList}
        onSubmit={createQualityRequirements}
        onUpdate={updateQualityRequirements}
        options={state.parentCriterion}
        orderId={proposalId}
        title={getTitleModal(type, "criteria")}
      />
    );
  };

  const openModalImport = (type: "pomp" | "clinrec") => {
    modal.open(<ModalImport proposalId={proposalId} type={type} />);
  };

  return (
    <accessContext.Provider value={{ access: access }}>
      <ContainerWithFooter>
        <HorisontalNavMenuRegister
          links={useNavigationProposal()}
          title
          breadcrumbs={orderName}
          sectionName={"Заявки"}
        />
        <CustomContainer>
          <SettingsTable
            nameButtonOpenModal={"Добавить новый критерий"}
            openModal={() => openModalQuality("add")}
            access={access}
            pageCount={pageCount}
            selectPageCount={selectPageCount}
            total={state.qualityRequirementsList.totalCount}
            pageNumber={pageNumber}
            newPageNumber={newPageNumber}
            customId={1}
          />

          {state.loading ? (
            <IconLoading />
          ) : (
            <TableHead
              id={"table"}
              tableHead={tableHead}
              numbering={true}
              control={true}
              disableScroll={true}
              numberingWidth={"20px"}
              controlWidth={"100px"}
            >
              <TableBody
                disabledApproveDelete
                numbering
                tableHead={tableHead}
                tableBody={state.qualityRequirementsList.items?.map((e) => ({
                  ...e,
                  updatedAt: moment(e.updatedAt).format("DD MMMM YYYY"),
                }))}
                control={
                  access === "edit"
                    ? ([
                        {
                          name: "edit",
                          onClick: async (id: number) => actionTableClick(id, "edit"),
                          value: "id",
                        },
                        {
                          name: "delete",
                          onClick: async (id: number) => onDelete(Number(id)),
                          value: "id",
                        },
                      ] as IControlTable[])
                    : ([
                        {
                          name: "watch",
                          onClick: (id: number) => actionTableClick(id, "view"),
                          value: "id",
                        },
                      ] as IControlTable[])
                }
              />
            </TableHead>
          )}
          <ClinrecContainer>
            <h4>Клинические рекомендации</h4>
            {access === Access.Edit ? (
              <ButtonContainer>
                <ButtonCreateElem
                  customId={2}
                  text={"Импортировать клинические рекомендации ВИМИС"}
                  onClick={() => openModalImport("clinrec")}
                />
                {(state.loadingOrderClinrec || loadingClinrecSelects) && (
                  <IconLoading height={19} width={19} hidePadding />
                )}
              </ButtonContainer>
            ) : null}
          </ClinrecContainer>
          <CardClinrec clinrecs={state.orderClinrec} loading={state.loadingOrderClinrec || loadingClinrecSelects} />
          <ClinrecContainer>
            <h4>Порядки оказания медицинской помощи</h4>
            {access === Access.Edit ? (
              <ButtonContainer>
                <ButtonCreateElem
                  customId={3}
                  text={"Импортировать порядки оказания медицинской помощи"}
                  onClick={() => openModalImport("pomp")}
                />
                {state.loadingOrderPomp && <IconLoading height={19} width={19} hidePadding />}
              </ButtonContainer>
            ) : null}
          </ClinrecContainer>
          <CardPomp pomps={state.orderPomp} loading={state.loadingOrderPomp} />
        </CustomContainer>
        <Footer />
      </ContainerWithFooter>
    </accessContext.Provider>
  );
};

const CustomContainer = styled(Container)`
  #table {
    height: initial;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;

  .container_loading {
    margin-left: 15px;
    width: initial;
  }
`;
const ClinrecContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 15px 0;
`;
