import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import {
  IconContainer,
  IconContainerFloatingmes,
} from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IClinrecThesis } from "../../../../../common/interfaces/clinrec/IClinrecThesis";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../../common/components/Icon/IconErrorViolation";
import { StatusCounter } from "../../StatusCounter";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { ActivityBlock } from "./ActivityBlock";
import { css } from "styled-components";

interface IProps {
  id: string;
  thesis: IClinrecThesis;
  showStatusCounter?: boolean;
}

export const ThesisBlock = (props: IProps) => {
  const [openActivity, setOlenActivity] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);

  return (
    <ThesisContent status={props.thesis.qualityCriterion?.status}>
      <ThesisHeader onClick={() => setOpen(!open)}>
        <Left>
          {props.thesis.qualityCriterion?.status && (
            <>
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.MetRequirement && (
                <IconContainerFloatingmes title={"Выполнено"} position={"right"}>
                  <IconSuccessViolation />
                </IconContainerFloatingmes>
              )}
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
                <IconContainerFloatingmes title={"Нет Данных"} position={"right"}>
                  <IconUnknownViolation />
                </IconContainerFloatingmes>
              )}
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotMetRequirement && (
                <IconContainerFloatingmes title={"Нарушено"} position={"right"}>
                  <IconErrorViolation />
                </IconContainerFloatingmes>
              )}
            </>
          )}
          <ThesisText open={open}>{props.thesis.thesisText}</ThesisText>
        </Left>
        <IconContainer id={`card_${props.id}_control`}>
          <IconArrow rotate={open ? "" : "270deg"} />
        </IconContainer>
      </ThesisHeader>
      {open && (
        <ThesisTitleContainer style={{ margin: "5px", marginLeft: "9px" }}>
          <span>
            <RowTitle>Номер:</RowTitle> <RowValue> {props.thesis.number || "—"}</RowValue>
          </span>
          <span>
            <RowTitle>Уровень убедительности:</RowTitle> <RowValue> {props.thesis.convincing || "—"}</RowValue>
          </span>
          <span>
            <RowTitle>Уровень доказательности:</RowTitle> <RowValue> {props.thesis.evidential || "—"}</RowValue>
          </span>
          {props.thesis?.stadia && (
            <span>
              <RowTitle>Стадия опухолевого процесса:</RowTitle> <RowValue> {props.thesis.stadia}</RowValue>
            </span>
          )}
          {props.thesis?.tnm && (
            <span>
              <RowTitle>TNM:</RowTitle> <RowValue> {props.thesis.tnm}</RowValue>
            </span>
          )}
        </ThesisTitleContainer>
      )}
      {open && props.thesis.comment && (
        <ThesisContent status={null}>
          <ThesisHeader onClick={() => setOpenComment(!openComment)}>
            <ThesisTitleContainer>
              <RowTitle>Комментарий</RowTitle>
            </ThesisTitleContainer>

            <IconContainer id={`card_${props.id}_control`}>
              <IconArrow rotate={openComment ? "" : "270deg"} />
            </IconContainer>
          </ThesisHeader>
          {openComment && <>{props.thesis.comment}</>}
        </ThesisContent>
      )}

      {open && (
        <ThesisContent status={null}>
          <ThesisHeader onClick={() => setOlenActivity(!openActivity)}>
            <ThesisTitleContainer>
              <RowTitle>Список вмешательств</RowTitle>
            </ThesisTitleContainer>

            <FlexContainer direction={"row"}>
              {props.showStatusCounter && (
                <StatusCounter items={props.thesis.activities?.map((item) => item?.status) || []} />
              )}
              <IconContainer id={`card_${props.id}_control`}>
                <IconArrow rotate={openActivity ? "" : "270deg"} />
              </IconContainer>
            </FlexContainer>
          </ThesisHeader>
          {openActivity && (
            <>
              {props.thesis.activities?.map((activity, index) => (
                <ActivityBlock
                  key={index}
                  activity={activity}
                  first={index === 0}
                  id={props.id + "activityBlock_" + index}
                  showStatusCounter={props.showStatusCounter}
                />
              ))}
            </>
          )}
        </ThesisContent>
      )}
    </ThesisContent>
  );
};

const ThesisContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  width: 98%;
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
  margin-top: 10px;
`;
const Left = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
`;

const ThesisHeader = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const ThesisTitleContainer = styled.div`
  display: flex;

  span {
    align-self: center;
  }
`;

const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const RowValue = styled.span`
  margin-right: 10px;
`;

const ThesisText = styled.div<{ open: boolean }>`
  ${(props) =>
    props.open
      ? css`
          width: 95%;
        `
      : css`
          width: 95%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`;
