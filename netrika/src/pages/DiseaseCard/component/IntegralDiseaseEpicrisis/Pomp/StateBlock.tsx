import React, { useEffect, useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IPompState } from "../../../../../common/interfaces/IPompState";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../../common/components/Icon/IconErrorViolation";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../../../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../../../../module/orderStatus/orderStstusSelector";
import { proposalQualityRequirementsSelector } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsSelector";
import { IClinrecQualityCriterion } from "../../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { IOrderQualityCriterionCurrentItem } from "../../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { Access, orderAccess } from "../../../../Proposal/helpers/access";
import { IOrderQualityCriterion } from "../../../../../common/interfaces/order/IOrderQualityCriterion";
import { ProposalQualityRequirementsThunk } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsThunk";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import moment from "moment";
import {
  IconContainer,
  IconContainerFloatingmes,
} from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../../common/lang/ru";
import { ProposalQualityRequirementsAction } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";
import { IconEdit } from "../../../../../common/components/Icon/IconEdit";
import { ActivityBlock } from "./ActivityBlock";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ModalAddQualityRequirements } from "../../../../Proposal/components/QualityRequirements/ModalAddQualityRequirements";
import { getTitleModal } from "../../../../../common/helpers/getTitle";

interface IProps {
  id: string;
  state: IPompState;
}

export const StateBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const stateAuth = useSelector(authorizationSelector);
  const { orderStatus } = useSelector(orderStatusSelector);
  const state = useSelector(proposalQualityRequirementsSelector);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();
  const [access, setAccess] = useState<Access>(Access.View);
  const [open, setOpen] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const updateQualityRequirements = (data: IOrderQualityCriterion) => {
    dispatch(ProposalQualityRequirementsThunk.update(data, true, (value) => setQualityCriterionItem(value)));
  };

  useEffect(() => {
    if (props.state.qualityCriterion) setQualityCriterionItem(props.state.qualityCriterion);
  }, [props.state.qualityCriterion]);

  const openModalQuality = () => {
    const type = access === "edit" ? "edit" : "view";

    modal.open(
      <ModalAddQualityRequirements
        disabled={type === "view"}
        option={state.queryList}
        onUpdate={updateQualityRequirements}
        options={state.parentCriterion}
        orderId={+id}
        formCrOrPomp={true}
        title={getTitleModal(type, "criteria")}
      />
    );
  };

  return (
    <StateContent key={props.id}>
      <StateHeader>
        {props.state.qualityCriterion?.status && (
          <StateStatus>
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.MetRequirement && (
              <IconSuccessViolation />
            )}
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
              <IconUnknownViolation />
            )}
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.NotMetRequirement && (
              <IconErrorViolation />
            )}
          </StateStatus>
        )}
        {open ? (
          <ContainerShow id={`close_thesis_${props.id}`} onClick={() => setOpen(false)}>
            <IconGroupHide />
          </ContainerShow>
        ) : (
          <ContainerShow id={`open_thesis_${props.id}`} onClick={() => setOpen(true)}>
            <IconGroupShow />
          </ContainerShow>
        )}
        <StateTitleContainer>
          <StateTitle>Номер:</StateTitle> {props.state.idState}
        </StateTitleContainer>
      </StateHeader>
      <StateTitleContainer style={{ marginLeft: "34px" }}>
        <StateTitle>Наименование подэтапа:</StateTitle> {props.state.stateName}
      </StateTitleContainer>
      <StateTitleContainer style={{ marginLeft: "34px" }}>
        <StateTitle>Предыдущий подэтап:</StateTitle>{" "}
        <LinkState>
          {!!props.state.fromState.length ? props.state.fromState.map((s) => s.associatedStateId).join(", ") : " - "}{" "}
        </LinkState>
        <StateTitle>Следующий подэтап:</StateTitle>{" "}
        <LinkState>
          {!!props.state.toState.length ? props.state.toState.map((s) => s.associatedStateId).join(", ") : " - "}
        </LinkState>
      </StateTitleContainer>
      <StateTitleContainer style={{ marginLeft: "34px" }}>
        {props.state.description && (
          <CustomDescriptionContent status={null}>
            <DescriptionHeader
              onClick={() => setOpenDescription(!openDescription)}
              style={{ justifyContent: "space-between" }}
            >
              <DescriptionTitleContainer>
                <RowTitle>Описание</RowTitle>
              </DescriptionTitleContainer>

              <IconContainer id={`card_${props.id}_control`}>
                <IconArrow rotate={openDescription ? "" : "270deg"} />
              </IconContainer>
            </DescriptionHeader>
            {openDescription && <>{props.state.description}</>}
          </CustomDescriptionContent>
        )}
      </StateTitleContainer>
      {qualityCriterionItem && (
        <FlexContainer direction={"row"} justify={"space-between"}>
          <QualityCriterionItem id={"column_baseUrl"}>{qualityCriterionItem.name}</QualityCriterionItem>
          <QualityCriterionItem id={"column_idInternal"}>{qualityCriterionItem.description}</QualityCriterionItem>
          {qualityCriterionItem.updatedAt && (
            <QualityCriterionItem id={"column_systemOid"}>
              {moment(qualityCriterionItem.updatedAt).format("DD MMMM YYYY")}
            </QualityCriterionItem>
          )}
          <IconContainer noMarg>
            <IconContainerFloatingmes
              title={ru.floatingmes.edit}
              onClick={() => {
                dispatch(
                  ProposalQualityRequirementsAction.fullItem.done({
                    params: null,
                    result: { ...qualityCriterionItem, orderId: +id },
                  })
                );
                openModalQuality();
              }}
            >
              <IconEdit />
            </IconContainerFloatingmes>
          </IconContainer>
        </FlexContainer>
      )}
      {open &&
        props.state?.activities?.map((item, index) => (
          <ActivityBlock
            key={id + "activityBlock_" + index}
            activity={item}
            id={id + "activityBlock_" + index}
            first={index === 0}
          />
        ))}
    </StateContent>
  );
};

const StateContent = styled.div`
  background: ${theme.colors.white};
  margin: 0 24px 24px 48px;
  display: flex;
  flex-direction: column;
  transition: height 1s ease-in-out;
`;
const StateHeader = styled.div`
  position: relative;
  display: flex;
`;

const StateTitleContainer = styled.div`
  display: flex;
  margin-left: 15px;
`;

const StateTitle = styled.div`
  font-weight: bold;
  padding: 0 10px 0 20px;
`;

const StateStatus = styled.div<{ first?: boolean; showIconOpenBlock?: boolean }>`
  position: absolute;
  z-index: 2;
  background: white;
  border-right: none;
  border-top: none;
  bottom: -2px;
  left: -24px;
`;

const LinkState = styled.span`
  cursor: pointer;
  color: ${theme.colors.blue};
`;
const QualityCriterionItem = styled.p`
  margin: 0 8px;
`;
const CustomDescriptionContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid
    ${({ status }) =>
      status === CriterionExecuteResultEnum.MetRequirement
        ? `${theme.colors.green}`
        : status === CriterionExecuteResultEnum.NotMetRequirement
        ? `${theme.colors.lightRed}`
        : `${theme.colors.gray}`};
`;

const DescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .icon-container {
    margin: 0;
    justify-content: center;
    padding-right: 18px;
  }
`;
const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const DescriptionTitleContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
