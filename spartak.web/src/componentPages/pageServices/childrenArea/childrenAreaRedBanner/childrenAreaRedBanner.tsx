import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { RedInfoBanner } from "../../../../components/redInfoBanner/redInfoBanner";
import { LocaleType } from "../../../../api/dto/LocaleType";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  redBannerData: LocaleType[];
}

export const ChildrenAreaRedBanner = (props: IProps) => {
  const { locale } = useRouter();

  return (
    <RedInfoBanner>
      <InfoText>
        {props.redBannerData.map((elem, index) => (
          <span key={index}>{getLocalValue(elem, locale)}</span>
        ))}
      </InfoText>
    </RedInfoBanner>
  );
};

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
