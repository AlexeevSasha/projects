import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMediaShort } from "../../../api/dto/IMedia";
import { theme } from "../../../assets/theme/theme";
import { BannerImage } from "../../../components/banners/bannerImage";
import { CardNews } from "../../../components/cardNews/cardNews";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NextLink } from "../../../components/nextLink/nextLink";
import { DataContext } from "../../../core/dataProvider";
import { CustomButton } from "../../../components/buttons/customButton";

interface IProps {
  newsList: IMediaShort[];
}

export const PageMainNews = (props: IProps) => {
  const { push, locale = "ru", pathname } = useRouter();
  const { data: { banners = {} } = {} } = useContext(DataContext);
  const { Url = "/", BannerImages: bannerImages } = banners["Web.Main.News"]?.[0] || {};

  return (
    <>
      <StyledContainer>
        <TitleBlock>
          <Title>{lang[locale].main.news.title}</Title>
          {pathname !== "/" && (
            <StyledLink onClick={() => push("/media/news")}>{lang[locale].main.news.allNews}</StyledLink>
          )}
        </TitleBlock>
      </StyledContainer>

      <GridContainer countColumns={props.newsList.length}>
        {props.newsList?.map((elem, index) => (
          <CardNews key={index} news={elem} defaultUrl={"/media/news/"} />
        ))}
      </GridContainer>
      {pathname === "/" && (
        <StyledContainer style={{ width: "100%" }}>
          <MoreButton type="opacity" onClick={() => push("/media/news")}>
            {lang[locale].main.news.allNews}
          </MoreButton>
        </StyledContainer>
      )}

      {!!bannerImages?.Default && (
        <StyledBannerContainer>
          <NextLink url={Url}>
            <BannerImage imgList={bannerImages} alt="Free bet" />
          </NextLink>
        </StyledBannerContainer>
      )}
    </>
  );
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  flex-direction: column;
`;

export const GridContainer = styled(ContainerContent)<{ countColumns: number }>`
  display: grid;
  gap: 1.25vw;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2.08vw;
  grid-row-gap: 2.08vw;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 4.27vw;
    margin-bottom: 4.67vw;
  }
`;

const TitleBlock = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font-family: "FCSM Text", sans-serif;
  padding-bottom: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 4.27vw;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 3.23vw;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const StyledLink = styled.span`
  cursor: pointer;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  font-size: 0.73vw;
  text-transform: uppercase;
  font-weight: 600;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.66vw;
  }
`;

const StyledBannerContainer = styled(ContainerContent)`
  position: relative;
  cursor: pointer;
  a {
    width: 100%;
    height: 6.98vw;
    margin-bottom: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    a {
      height: 15.65vw;
      margin-bottom: 10.43vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    a {
      height: 21.33vw;
      margin-bottom: 10.67vw;
    }
  }
`;
const MoreButton = styled(CustomButton)`
  margin-bottom: 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
  }
`;
