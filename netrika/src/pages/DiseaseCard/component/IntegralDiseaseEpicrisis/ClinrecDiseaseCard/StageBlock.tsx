import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IClinrecStage } from "../../../../../common/interfaces/clinrec/IClinrecStage";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { StatusCounter } from "../../StatusCounter";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { ThesisBlock } from "./ThesisBlock";

interface IProps {
  id: string;
  stage: IClinrecStage;
  first: boolean;
  showStatusCounter?: boolean;
}
export const StageBlock = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StageBlockContainer id={props.id}>
      <StageName onClick={() => setOpen(!open)}>
        <>{props.stage.stageName} </>
        <FlexContainer direction={"row"}>
          {props.showStatusCounter && (
            <StatusCounter items={props.stage.theses?.map((item) => item?.qualityCriterion?.status) ?? []} />
          )}
          <IconContainer id={`Stage_${props.id}_control`}>
            <IconArrow rotate={open ? "" : "270deg"} />
          </IconContainer>
        </FlexContainer>
      </StageName>
      {open ? (
        <StageContent>
          {props.stage.theses?.map((thesis, index) => (
            <ThesisBlock
              key={props.id + "_thesisBlock_" + index}
              id={props.id + "_thesisBlock_" + index}
              thesis={thesis}
              showStatusCounter={props.showStatusCounter}
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
  margin-bottom: 10px;
`;
const StageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StageName = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
