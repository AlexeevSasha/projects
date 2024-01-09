import React from "react";
import { BlockAboutSector, IBlockAboutSector } from "../../../../components/blockAboutSector/blockAboutSector";
import styled from "styled-components";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { theme } from "../../../../assets/theme/theme";

interface IProps {
  listSectorInfo: IBlockAboutSector[];
}

export const ConferenceAboutBlock = (props: IProps) => {
  return (
    <>
      {props.listSectorInfo.map((sectorInfo, index) => (
        <StyledContainer key={`k${index}`}>
          <BlockAboutSector sectorInfo={sectorInfo} index={index} />
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
