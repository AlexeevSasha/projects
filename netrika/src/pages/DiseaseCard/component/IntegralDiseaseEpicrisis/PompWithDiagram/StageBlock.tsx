import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IPompStage } from "../../../../../common/interfaces/IPompStage";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { StatusCounter } from "../../StatusCounter";
import { StateBlock } from "./StateBlock";

interface IProps {
  id: string;
  stage: IPompStage;
  showIconOpenBlock?: boolean;
  first: boolean;
}
export const StageBlock = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StageBlockContainer key={props.id} id={props.id} style={{ marginBottom: "10px" }}>
      <StageName onClick={() => setOpen(!open)}>
        {props.stage.stageName}
        <FlexContainer direction={"row"}>
          <StatusCounter items={props.stage?.pompStates?.map((item) => item?.qualityCriterion?.status) ?? []} />
          <IconContainer id={`stage_${props.id}_control`}>
            <IconArrow rotate={open ? "" : "270deg"} />
          </IconContainer>
        </FlexContainer>
      </StageName>
      {open ? (
        <StageContent>
          {props.stage.pompStates?.map((state) => (
            <StateBlock
              key={props.id + "_stateBlock_" + state.idState}
              id={props.id + "_stateBlock_" + state.idState}
              state={state}
            />
          ))}
        </StageContent>
      ) : null}
    </StageBlockContainer>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.gray};
  border-radius: 10px;
`;
const StageContent = styled(StageBlockContainer)`
  cursor: pointer;
  flex-direction: column;
  border: none;
`;

const StageName = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
