import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { LocaleType } from "../../../../api/dto/LocaleType";
import { RedInfoBanner } from "../../../../components/redInfoBanner/redInfoBanner";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";

interface IProps {
  redBannerData: LocaleType[] | string[];
}

export const RedBannerTickets = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <RedInfoBanner>
      <InfoText>
        {props.redBannerData.map((elem, index) => (
          <span key={index}>{elem}</span>
        ))}
      </InfoText>
    </RedInfoBanner>
  );
};
const StyledBanner = styled(ContainerContent)`
  padding-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 8.34vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10.67vw;
  }
`;

const InfoText = styled.p`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  padding: 2.08vw;
  gap: 3.54vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
    padding: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    gap: 4.27vw;
    padding: 4.27vw;
  }
`;
