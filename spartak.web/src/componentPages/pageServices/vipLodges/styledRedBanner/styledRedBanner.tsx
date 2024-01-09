import React from "react";
import { RedInfoBanner } from "../../../../components/redInfoBanner/redInfoBanner";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { IServicesVip } from "../../../../api/dto/IServicesVip";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  redBanner: IServicesVip["redBanner"];
}

export const StyledRedBanner = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.redBanner?.text1 && props.redBanner?.text2 ? (
    <RedInfoBanner>
      <InfoText>
        <span>{getLocalValue(props.redBanner?.text1, locale)}</span>
        <span>{getLocalValue(props.redBanner?.text2, locale)}</span>
      </InfoText>
    </RedInfoBanner>
  ) : null;
};

const InfoText = styled.div`
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
