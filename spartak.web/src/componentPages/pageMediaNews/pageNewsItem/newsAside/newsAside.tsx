import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { CardNews } from "../../../../components/cardNews/cardNews";
import type { IMediaShort } from "../../../../api/dto/IMedia";
import { useRouter } from "next/router";
import { lang } from "../../../../../public/locales/lang";

interface IProps {
  newsList?: IMediaShort[] | null;
  defaultUrl?: string;
}

export const NewsAside = (props: IProps) => {
  const { locale, pathname } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <Aside>
      <Title>{pathname.includes("specialOffers") ? t.profile.specialOffers.otherOffers : t.pageNews.anotherNews}</Title>
      <StyledCardNews>
        {props.newsList?.map((elem, index) => (
          <CardNews key={index} news={elem} defaultUrl={props.defaultUrl ?? "/media/news/"} />
        ))}
      </StyledCardNews>
    </Aside>
  );
};

const Aside = styled.aside`
  display: grid;
  grid-template-rows: 1fr;
  gap: 2.08vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white_black};
  margin: 0;
  padding-top: 1.04vw;
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-top: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const StyledCardNews = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 2.08vw;

  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayDark_gray1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 45.63vw);
    position: relative;
    overflow: auto;
    gap: 3.26vw;
    padding-bottom: 2.09vw;

    ::-webkit-scrollbar {
      height: 0.52vw !important;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(3, 93.33vw);
    padding-bottom: 4.27vw;
    gap: 4.27vw;

    ::-webkit-scrollbar {
      height: 1.07vw !important;
    }
  }
`;
