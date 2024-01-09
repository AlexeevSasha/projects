import React, { useState } from "react";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IPompStage } from "../../../../../common/interfaces/IPompStage";
import { StateBlock } from "./StateBlock";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";

interface IProps {
  id: string;
  stage: IPompStage;
  showIconOpenBlock?: boolean;
}
export const StageBlock = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <FlexContainer alignItems={"flex-start"} style={{ width: "99%" }}>
      <StageBlockContainer id={props.id}>
        {props.showIconOpenBlock ? (
          open ? (
            <ContainerShow id={`close_stage_${props.stage.stageCode}`} onClick={() => setOpen(false)}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow id={`open_stage_${props.stage.stageCode}`} onClick={() => setOpen(true)}>
              <IconGroupShow />
            </ContainerShow>
          )
        ) : (
          <ContainerShow />
        )}
        <StageName>{props.stage.stageName}</StageName>
      </StageBlockContainer>
      {open ? (
        <StageContent>
          {props.stage?.pompStates?.map((item) => (
            <StateBlock
              key={props.id + "_stateBlock_" + item.idState}
              id={props.id + "_stateBlock_" + item.idState}
              state={item}
            />
          ))}
        </StageContent>
      ) : null}
    </FlexContainer>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 12px 12px 0 12px;
  display: flex;
  transition: height 1s ease-in-out;
`;
const StageContent = styled(StageBlockContainer)`
  flex-direction: column;
  width: 100%;
`;

const StageName = styled.div`
  margin-left: 20px;
`;
