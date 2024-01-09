import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ToActivateDenarii, ToBurnDenarii } from "../../../api/profileDenariiRepository";
import { formatDate } from "../../../assets/constants/date";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { BannerImage } from "../../../components/banners/bannerImage";
import { CustomButton } from "../../../components/buttons/customButton";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../../components/containers/containerBanner";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NextLink } from "../../../components/nextLink/nextLink";
import { Tabs } from "../../../components/tabs/tabs";
import { DataContext } from "../../../core/dataProvider";
import { EmptyDenary } from "./emptyDenary";

interface IProps {
  activate: ToActivateDenarii;
  burn: ToBurnDenarii;
}

export const DenariiListSection = ({ activate, burn }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [tab, setTab] = useState<"burn" | "activate">(() => (burn.Sum ? "burn" : "activate"));

  const { data: { banners = {} } = {} } = useContext(DataContext);
  const banner = (banners["Web.Account2"] || [])[0];

  const header = Object.keys(lang[locale].profile.denariiPage[tab]).map((elem) => (
    <DenariiItem header key={elem}>
      {lang[locale].profile.denariiPage[tab][elem]}
    </DenariiItem>
  ));

  return (
    <Container>
      <DenariiBurnBlock>
        <DenariiTitle>{lang[locale].header.navList["profile/denarii"]}</DenariiTitle>

        {!!(activate.Sum && burn.Sum) && (
          <Tabs
            tabs={[
              { label: lang[locale].profile.denariiPage.toCombustion, key: "burn" },
              { label: lang[locale].profile.denariiPage.toActivation, key: "activate" },
            ]}
            onClick={(tab) => setTab(tab as "burn" | "activate")}
            active={tab}
          />
        )}

        <DenariiDescription>
          {lang[locale].profile.denariiPage[tab === "activate" ? "activateDesc" : "burnDesc"]}
        </DenariiDescription>

        {!!(activate.Sum || burn.Sum) ? <DenariiRow header>{header}</DenariiRow> : <EmptyDenary />}

        {!!(tab === "burn" && burn.Sum) && (
          <DenariiRow>
            <DenariiItem>{burn.Sum.toFixed(2).replace(".", ",")}</DenariiItem>
            <DenariiItem>{formatDate(burn.DecrementUtc, "dd.MM.yyyy", locale)}</DenariiItem>
          </DenariiRow>
        )}

        {!!(tab === "activate" && activate.Sum) && (
          <DenariiRow>
            <DenariiItem>{activate.Sum.toFixed(2).replace(".", ",")}</DenariiItem>
            <DenariiItem>{formatDate(activate.ChargeUtc, "dd.MM.yyyy", locale)}</DenariiItem>
          </DenariiRow>
        )}
      </DenariiBurnBlock>

      <AdvertisingBlock>
        <StyledBannerArticle>
          <BannerBackground
            srcL="/images/banners/bannerRedBackgroundL_v1.0.0.png"
            srcM="/images/banners/bannerRedBackgroundM_v1.0.0.png"
            srcS="/images/banners/bannerRedBackgroundS_v1.0.0.png"
          />
          <ByForDenariiPaddingBlock>
            <ByForDenariiTitle>{lang[locale].profile.denariiPage.buyAdvTitle}</ByForDenariiTitle>

            <ByForDenariiDescription>{lang[locale].profile.denariiPage.buyAdvDescription}</ByForDenariiDescription>

            <NextLink url={`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`}>
              <ButtonArrow type={"opacity"} withGap>
                <IconArrowRight />
                <span>{lang[locale].profile.denariiPage.button}</span>
              </ButtonArrow>
            </NextLink>
          </ByForDenariiPaddingBlock>
        </StyledBannerArticle>

        {!!banner?.BannerImages?.Default && (
          <NextLink url={banner.Url}>
            <FreeBetImgContainer>
              <BannerImage imgList={banner.BannerImages} alt="Free bet" />
            </FreeBetImgContainer>
          </NextLink>
        )}
      </AdvertisingBlock>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  margin-top: 4.17vw;
  align-items: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
    flex-direction: column;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
  }
`;

const DenariiBurnBlock = styled.div`
  width: 35vw;
  margin-right: 8.23vw;
  align-self: stretch;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 66.75vw;
    margin-right: 0;
    margin-bottom: 5.22vw;

    & > div:nth-child(2) {
      width: 100%;

      & > span {
        width: 50%;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.46vw;
    margin-right: 10.67vw;
  }
`;

const DenariiTitle = styled.h3`
  margin: 0 0 0.42vw 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 1.04vw 0;
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 2.13vw 0;
    font-size: 8.53vw;
  }
`;

const DenariiDescription = styled.h5`
  margin: 1.25vw 0 1.25vw 0;
  color: ${theme.colors.grayDark};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin: 3.13vw 0 3.13vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin: 6.4vw 0 6.4vw 0;
  }
`;

const DenariiRow = styled.p<{ header?: boolean }>`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-column-gap: 3.75vw;
  margin: 0;
  padding: ${({ header }) => (header ? "0.83vw" : "1.67vw 0.83vw")};
  background-color: ${({ header, theme }) => (header ? theme.colors.blackLight_red : theme.colors.black_white)};
  border-bottom: ${({ header, theme }) => !header && `0.05vw solid ${theme.colors.grayDark_gray1}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: ${({ header }) => (header ? "2.09vw" : "4.17vw 2.09vw")};
    grid-column-gap: 9.39vw;
    border-bottom: ${({ header }) => !header && `0.13vw solid ${theme.colors.grayDark}`};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: ${({ header }) => (header ? "4.27vw" : "5.6vw 4.27vw")};
    grid-column-gap: 8.53vw;
    border-bottom: ${({ header }) => !header && `0.27vw solid ${theme.colors.grayDark}`};
  }
`;

const DenariiItem = styled.span<{ header?: boolean }>`
  text-transform: uppercase;
  font-family: "FCSM Text", sans-serif;
  font-weight: ${({ header }) => (header ? "600" : "500")};
  font-size: ${({ header }) => (header ? "0.73vw" : "1.25vw")};
  color: ${({ header, theme }) => (header ? theme.colors.gray_white : theme.colors.white_black)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${({ header }) => (header ? "1.83vw" : "3.13vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: ${({ header }) => (header ? "3.2vw" : "4.8vw")};
  }
`;

const AdvertisingBlock = styled.div`
  & > *:first-child {
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const StyledBannerArticle = styled(StyledBannerArticleBase)`
  width: 47.6vw;
  background-position-x: 70%;
  padding: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    flex-direction: column;
    width: inherit;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: max-content;
    padding: 6.4vw;
  }
`;

const ByForDenariiPaddingBlock = styled(ContentBlockBase)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  a {
    text-decoration: none;
  }
`;

const ByForDenariiTitle = styled.h1`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0 0 0.83vw 0;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin: 0 0 2.22vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin: 0 0 6.4vw 0;
  }
`;

const ByForDenariiDescription = styled.h2`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;
  font-weight: 500;
  margin: 0 0 1.77vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    margin: 0 0 4.04vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin: 0 0 6.4vw 0;
  }
`;

const ButtonArrow = styled(CustomButton)`
  font-size: 0.73vw;
  gap: 0.42vw;
  color: ${theme.colors.white};
  border-color: ${theme.colors.white};
  svg {
    path {
      stroke: ${theme.colors.white};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.56vw 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const FreeBetImgContainer = styled.div`
  width: 47.6vw;
  height: 13.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: inherit;
    height: 26.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: inherit;
    height: 29.33vw;
  }
`;
