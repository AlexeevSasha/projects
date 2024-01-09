import React from "react";
import { ContainerContent } from "../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { BlockAboutSector, } from "../../../components/blockAboutSector/blockAboutSector";
import { IServicesVip } from "../../../api/dto/IServicesVip";

interface IProps {
  blockInfo: IServicesVip["blockInfo"];
}

export const VipInfoBlock = (props: IProps) => {
  return (
    <>
      {props?.blockInfo?.map((sectorInfo, index) => (
        <StyledContainer key={`k=${index + 1}`}>
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
