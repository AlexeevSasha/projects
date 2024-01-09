import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import {
  BlockAboutSector,
  IBlockAboutSector,
} from "../../../../components/blockAboutSector/blockAboutSector";
import { ContainerContent } from "../../../../components/containers/containerContent";

interface IProps {
  listSectorInfo: IBlockAboutSector[];
}

export const ChildrenAreaAboutBlock = (props: IProps) => {
  return (
    <>
      {props.listSectorInfo.map((sectorInfo, index) => (
        <StyledContainer key={`k${index}`}>
          <BlockAboutSector withoutGradient sectorInfo={sectorInfo} index={index} />
        </StyledContainer>
      ))}
    </>
  );
};

const StyledContainer = styled(ContainerContent)`
  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
