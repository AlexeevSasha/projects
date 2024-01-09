import React, { useCallback, useContext, useEffect, useState } from "react";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { CriterionExecuteResultEnum } from "../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../common/components/Icon/IconErrorViolation";
import { IClinrecQualityCriterion } from "../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { useDispatch } from "react-redux";
import { IOrderQualityCriterionCurrentItem } from "../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import moment from "moment";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { customPompContext } from "./PompBlock";
import { IDictionaryPompActivity } from "../../../../common/interfaces/dictionary/IDictionaryPomp";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IDictionaryClinrecActivity } from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  id: string;
  first: boolean;
  activity: IDictionaryPompActivity;
  idPomp: number;
  idGraph: number;
  stageCode: string;
  stateId: number;
  openModal: (activity: IDictionaryClinrecActivity, type: "edit" | "view") => void;
}
export const ActivityBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { showEdit } = useContext(customPompContext);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();

  useEffect(() => {
    if (props.activity) setQualityCriterionItem(props.activity);
  }, [props.activity]);

  const onDelete = useCallback(async () => {
    await dispatch(
      DictionaryClinrecPompThunk.deletePompActivity(
        props.idPomp,
        props.idGraph,
        props.stageCode,
        props.stateId,
        props.activity.id
      )
    );
  }, [dispatch, props.idPomp, props.idGraph, props.stageCode, props.stateId, props.activity.id]);

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
      {qualityCriterionItem && (
        <ActivityContent>
          <QualityCriterionItem id={"column_baseUrl"}>{qualityCriterionItem.name}</QualityCriterionItem>
          <QualityCriterionItem id={"column_idInternal"}>{qualityCriterionItem.description}</QualityCriterionItem>
          {qualityCriterionItem.updatedAt && (
            <QualityCriterionItem id={"column_systemOid"}>
              {moment(qualityCriterionItem.updatedAt).format("DD MMMM YYYY")}
            </QualityCriterionItem>
          )}

          <IconContainer>
            {showEdit ? (
              <>
                <IconContainerFloatingmes
                  title={ru.floatingmes.edit}
                  onClick={() => {
                    props.openModal({ ...props.activity }, "edit");
                  }}
                >
                  <IconEdit />
                </IconContainerFloatingmes>
                <ModalDeleteWIthIcon onDelete={onDelete} />
              </>
            ) : (
              <IconContainerFloatingmes
                title={ru.floatingmes.view}
                onClick={() => {
                  props.openModal({ ...props.activity }, "view");
                }}
              >
                <IconEye />
              </IconContainerFloatingmes>
            )}
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
const QualityCriterionItem = styled.p`
  margin: 0 8px;
`;
