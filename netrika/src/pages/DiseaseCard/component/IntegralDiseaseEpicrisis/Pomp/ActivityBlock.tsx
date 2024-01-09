import React, { useCallback, useContext, useEffect, useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../../common/components/Icon/IconErrorViolation";
import { IClinrecQualityCriterion } from "../../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { proposalQualityRequirementsSelector } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsSelector";
import { IOrderQualityCriterionCurrentItem } from "../../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { IOrderQualityCriterion } from "../../../../../common/interfaces/order/IOrderQualityCriterion";
import { ProposalQualityRequirementsThunk } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsThunk";
import moment from "moment";
import {
  IconContainer,
  IconContainerFloatingmes,
} from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../../common/lang/ru";
import { ProposalQualityRequirementsAction } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";
import { IconEdit } from "../../../../../common/components/Icon/IconEdit";
import { accessContext } from "../../../../Proposal/PageProposalQualityRequirements";
import { ModalDeleteWIthIcon } from "../../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ModalAddQualityRequirements } from "../../../../Proposal/components/QualityRequirements/ModalAddQualityRequirements";
import { getTitleModal } from "../../../../../common/helpers/getTitle";

interface IProps {
  id: string;
  first: boolean;
  activity: IClinrecQualityCriterion;
}

export const ActivityBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { access } = useContext(accessContext);
  const state = useSelector(proposalQualityRequirementsSelector);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const updateQualityRequirements = (data: IOrderQualityCriterion) => {
    dispatch(ProposalQualityRequirementsThunk.update(data, true, (value) => setQualityCriterionItem(value)));
  };

  useEffect(() => {
    if (props.activity) setQualityCriterionItem(props.activity);
  }, [props.activity]);

  const onDelete = useCallback(async () => {
    await dispatch(ProposalQualityRequirementsThunk.delete(Number(props.activity.id)));
    setIsDeleted(true);

    // eslint-disable-next-line
  }, [dispatch, props?.activity.id]);

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
    <>
      <ActivityBlockContainer key={props.id} id={props.id}>
        {props.activity?.status && (
          <ActivityStatus>
            {props.activity?.status === CriterionExecuteResultEnum.MetRequirement && <IconSuccessViolation />}
            {props.activity?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && <IconUnknownViolation />}
            {props.activity?.status === CriterionExecuteResultEnum.NotMetRequirement && <IconErrorViolation />}
          </ActivityStatus>
        )}
      </ActivityBlockContainer>
      {qualityCriterionItem && !isDeleted && (
        <ActivityContent>
          <QualityCriterionItem id={"column_baseUrl"} width={"35%"}>
            {qualityCriterionItem.name}
          </QualityCriterionItem>
          <QualityCriterionItem id={"column_idInternal"} width={"35%"}>
            {qualityCriterionItem.description}
          </QualityCriterionItem>
          {qualityCriterionItem.updatedAt && (
            <QualityCriterionItem
              id={"column_systemOid"}
              width={"20%"}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {moment(qualityCriterionItem.updatedAt).format("DD MMMM YYYY")}
            </QualityCriterionItem>
          )}
          <IconContainer>
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
            <ModalDeleteWIthIcon onDelete={onDelete} />
          </IconContainer>
        </ActivityContent>
      )}
    </>
  );
};

const ActivityBlockContainer = styled.div`
  position: relative;
  background: ${theme.colors.white};
  padding: 12px 12px 12px 24px;
  display: flex;
  transition: height 1s ease-in-out;
`;
const ActivityContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  border: 1px solid ${theme.colors.lightGray};
`;

const ActivityStatus = styled.div<{ first?: boolean; showIconOpenBlock?: boolean }>`
  position: absolute;
  border-right: none;
  border-top: none;
  background: white;
  bottom: 26px;
  left: 24px;
  z-index: 2;
`;
const QualityCriterionItem = styled.p<{ width: string }>`
  width: ${(props) => props.width};
  margin: 0 8px;
`;
