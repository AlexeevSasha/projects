import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../../common/components/Icon/IconErrorViolation";
import { IClinrecQualityCriterion } from "../../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import {
  IconContainer,
  IconContainerFloatingmes,
} from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";

interface IProps {
  id: string;
  first: boolean;
  activity: IClinrecQualityCriterion;
  showStatusCounter?: boolean;
}
export const ActivityBlock = (props: IProps) => {
  const [openActivity, setOpenActivity] = useState(false);

  return (
    <ActivityBlockContainer
      key={props.id}
      id={props.id}
      status={
        props.activity?.status === CriterionExecuteResultEnum.MetRequirement
          ? `${theme.colors.green}`
          : props.activity?.status === CriterionExecuteResultEnum.NotMetRequirement
          ? `${theme.colors.lightRed}`
          : `${theme.colors.gray}`
      }
    >
      <ActivityHead onClick={() => setOpenActivity(!openActivity)}>
        <TitleText>
          {props.activity?.status && (
            <>
              {props.activity?.status === CriterionExecuteResultEnum.MetRequirement && (
                <IconContainerFloatingmes title={"Выполнено"} position={"right"}>
                  <IconSuccessViolation />
                </IconContainerFloatingmes>
              )}
              {props.activity?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
                <IconContainerFloatingmes title={"Нет Данных"} position={"right"}>
                  <IconUnknownViolation />
                </IconContainerFloatingmes>
              )}
              {props.activity?.status === CriterionExecuteResultEnum.NotMetRequirement && (
                <IconContainerFloatingmes title={"Нарушено"} position={"right"}>
                  <IconErrorViolation />
                </IconContainerFloatingmes>
              )}
            </>
          )}
          <span style={{ alignSelf: "center", marginLeft: "5px" }}>{props.activity.name}</span>
        </TitleText>
        <IconContainer id={`activity_${props.id}_control`}>
          <IconArrow rotate={openActivity ? "" : "270deg"} />
        </IconContainer>
      </ActivityHead>
      {openActivity && (
        <ActivityContent>
          {props.activity.qualityParamsValue &&
            props.activity.qualityParamsValue?.map((item) => {
              const groupName = props.activity.params.find((p) => p.id === item.idQueryPrim)?.name || "";

              return (
                <>
                  <span>{groupName}:</span>
                  <ul>
                    {item.displayValue?.map((i) => (
                      <li>
                        {i}
                        <br />
                      </li>
                    ))}
                  </ul>
                </>
              );
            })}
        </ActivityContent>
      )}
    </ActivityBlockContainer>
  );
};

const ActivityBlockContainer = styled.div<{ status: string }>`
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  margin-top: 7px;
  border: 1px solid ${({ status }) => status};
`;
const ActivityContent = styled.div`
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  padding: 10px;
  border: none;
  width: 98%;
  align-items: start;
  span {
    color: ${theme.colors.hightBlue};
    margin-left: 20px;
  }
`;
const ActivityHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TitleText = styled.div`
  display: flex;
  flex-direction: inherit;
`;
