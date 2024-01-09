import React from "react";
import { RedInfoBanner } from "../../../components/redInfoBanner/redInfoBanner";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IServicesAdjacentTerritory } from "../../../api/dto/IServicesAdjacentTerritory";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  info: IServicesAdjacentTerritory["redBanner"];
}

export const AdjacentTerritoryRedBanner = (props: IProps) => {
  const { locale } = useRouter();

  return props.info?.text1 && props.info?.text1 ? (
    <StyledRedInfoBanner>
      <RedInfoBanner>
        <InfoText
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.info?.text1, locale) || "",
          }}
        />
        <InfoText
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.info?.text2, locale) || "",
          }}
        />
      </RedInfoBanner>
    </StyledRedInfoBanner>
  ) : null;
};

const StyledRedInfoBanner = styled.div`
  display: flex;
  section {
    column-gap: 3.91vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      column-gap: 3.13vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      column-gap: 0;
    }
  }
`;

const InfoText = styled.div`
  margin: 0;
  padding: 2.08vw;
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: space-between;
  box-sizing: border-box;
  row-gap: 0.83vw;

  p {
    margin: 0;
  }
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: 0.83vw;
    list-style: inside;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0;
    row-gap: 2.09vw;

    ul {
      row-gap: 2.08vw;
      padding: 0 5.22vw 0 0;
    }
    p {
      padding: 0 0 0 5.22vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: inherit;
    gap: 4.27vw;
    padding: 4.27vw 0;
    row-gap: 3.2vw;

    :nth-child(2) {
      padding-top: 0;
    }
    ul {
      row-gap: 3.2vw;
      padding: 0 4.27vw;
    }
    p {
      padding: 0 4.27vw;
    }
  }
`;
