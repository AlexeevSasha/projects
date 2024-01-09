import React from "react";
import styled from "styled-components";
import { IBlocksOfMatch } from "../../../api/dto/IBlocksOfMatch";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { ListMatchCard } from "../../pageMatches/matchCard/listMatchCard";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

type Props = {
  blockOfMatches: IBlocksOfMatch;
  showScroll?: boolean;
  teamId?: string;
  banner?: any;
};

export const Matches = (props: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <MatchLayout>
      <ImageWrapper>
        <NextImage className="desktop" src={getLocalValue(props.banner.previewImgL, locale) ?? props.banner.previewImgL.ru} />
        <NextImage className="tablet" src={getLocalValue(props.banner.previewImgS, locale) ?? props.banner.previewImgS.ru} />
        <NextImage className="mobile" src={getLocalValue(props.banner.previewImgM, locale) ?? props.banner.previewImgM.ru} />
        <Gradient gradient={theme.gradients.first} />
      </ImageWrapper>
      <MatchesWrapper>
        <ListMatchCard blockOfMatches={props.blockOfMatches} showScroll={props.showScroll} teamId={props.teamId} />
      </MatchesWrapper>
    </MatchLayout>
  );
};

const MatchLayout = styled.article`
  margin-bottom: 21.88vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const MatchesWrapper = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: -13.8vw;
  margin-top: -11.46vw;
  > div > div {
    margin: 0;
    align-items: center;
  }
  div {
    margin-top: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: -10.43vw 0 0;
    padding: 0 3.13vw 0;
    overflow: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0;
    padding: 0 4.27vw 0;
  }
`;
const ImageWrapper = styled.div`
  height: 31.26vw;
  position: relative;

  .desktop {
    display: block;
  }

  .tablet {
    display: none;
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 44.32vw;

    .desktop {
      display: none;
    }

    .tablet {
      display: block;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 42.66vw;

    .tablet {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`;

const Gradient = styled.div<{ gradient: string }>`
  background: ${(props) => props.gradient};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
