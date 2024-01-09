import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IPompState } from "../../../../../common/interfaces/IPompState";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { StatusCounter } from "../../StatusCounter";
import { ActivityBlock } from "./ActivityBlock";

interface IProps {
  id: string;
  state: IPompState;
}
export const StateBlock = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);

  return (
    <StateContent status={props.state.qualityCriterion?.status} key={props.id}>
      <StateHeader onClick={() => setOpen(!open)} style={{ marginBottom: open ? "10px" : 0 }}>
        <>
          <StateTitleContainer>
            {props.state.idState}. {props.state.stateName}
            {open && (
              <StateLinkcontainer>
                <StateTitle>Предыдущий подэтап:</StateTitle>{" "}
                <LinkState>
                  {!!props.state.fromState.length
                    ? props.state.fromState.map((s) => s.associatedStateId).join(", ")
                    : " - "}
                </LinkState>
                <StateTitle>Следующий подэтап:</StateTitle>{" "}
                <LinkState>
                  {!!props.state.toState.length
                    ? props.state.toState.map((s) => s.associatedStateId).join(", ")
                    : " - "}
                </LinkState>
              </StateLinkcontainer>
            )}
          </StateTitleContainer>
        </>
        <FlexContainer direction={"row"}>
          <StatusCounter items={props.state.activities?.map((item) => item?.status) ?? []} />
          <IconContainer id={`state_${props.id}_control`}>
            <IconArrow rotate={open ? "" : "270deg"} />
          </IconContainer>
        </FlexContainer>
      </StateHeader>

      {open && (
        <>
          {" "}
          <StateTitleContainer>
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
            )}{" "}
          </StateTitleContainer>{" "}
          {props.state.activities?.map((activity, index) => (
            <ActivityBlock
              key={props.id + "activityBlock_" + index}
              activity={activity}
              first={index === 0}
              id={props.id + "activityBlock_" + index}
            />
          ))}
        </>
      )}
    </StateContent>
  );
};

const StateContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ status }) =>
      status === CriterionExecuteResultEnum.MetRequirement
        ? `${theme.colors.green}`
        : status === CriterionExecuteResultEnum.NotMetRequirement
        ? `${theme.colors.lightRed}`
        : `${theme.colors.gray}`};
  border-radius: 10px;
  margin-bottom: 10px;
`;
const StateHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StateTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StateLinkcontainer = styled.div`
  display: flex;
`;

const StateTitle = styled.div`
  color: ${theme.colors.hightBlue};
  padding: 0 10px 0 0;
`;

const LinkState = styled.span`
  margin-right: 10px;
  cursor: pointer;
  color: ${theme.colors.blue};
`;
const CustomDescriptionContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
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
