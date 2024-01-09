import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { PromoDto } from "../../../api/dto/loyalty";
import { formatDate } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { PromoAlert } from "./promoAlert";
import { useMemo } from "react";
import { langLoyalty } from "./langLoyalty";

const ImageList = {
  season: "/images/loyalty/bestPlayer_1.0.1.png",
  month: "/images/loyalty/bestPlayer_1.0.1.png",
  match: "/images/loyalty/bestPlayerOfMatch_1.0.0.png",
};

type Props = {
  promo: PromoDto;
};

export const PromoCardMvp = ({ promo }: Props) => {
  const { locale = "ru" } = useRouter();
  const typeOfMatch = useMemo(() => {
    return promo.SeasonId ? "season" : promo.Month ? "month" : "match";
  }, [promo]);

  return (
    <Link prefetch={false} href={`/voting/${promo.Id}`} passHref>
      <Container>
        <NewsImgContainer isActive>
          <NextImage src={ImageList[`${typeOfMatch}`]} alt={promo.Title} objectFit="cover" />
        </NewsImgContainer>

        <Info>
          <Title>
            {langLoyalty[locale].title[`${typeOfMatch}`] +
              " " +
              `${promo.Month ? formatDate(promo.Month, "mmmm", locale) : ""}`}
          </Title>
          <DateText>
            {lang[locale].profileLoyalty.from} {formatDate(promo.StartDate, "dd.MM.yyyy", locale)}
          </DateText>{" "}
          <DateText>
            {lang[locale].profileLoyalty.to} {formatDate(promo.EndDate, "dd.MM.yyyy", locale)}
          </DateText>
          <Desc dangerouslySetInnerHTML={{ __html: langLoyalty[locale].description }} />
        </Info>

        <ContainerAlert>
          <PromoAlert promo={promo} />
        </ContainerAlert>
      </Container>
    </Link>
  );
};

const Title = styled.div`
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-bottom: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-bottom: 3.2vw;
  }
`;

const Container = styled.a`
  color: ${({ theme }) => theme.colors.white_black};
  cursor: pointer;
  margin: 0;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  width: 100%;
  transition: all ease 0.1s;
  position: relative;

  &:hover {
    ${Title} {
      color: ${theme.colors.gray};
    }
  }
`;

const Desc = styled.div`
  letter-spacing: 0.1px;
  font-size: 0.83vw;
  line-height: 1.145vw;
  margin-top: 1.145vw;

  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.86vw;
    margin-top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.86vw;
    margin-top: 4.26vw;
  }
`;

const NewsImgContainer = styled.div<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  height: 11.98vw;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    bottom: -1px;
    right: -1px;
    left: -1px;
    background: #0d1116cc;
    backdrop-filter: blur(2px);
    display: ${({ isActive }) => isActive && "none"};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 20.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 41.07vw;
  }
`;

const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.blackLight_white1};
  /* height: 10.1vw; */
  box-sizing: border-box;
  padding: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.08vw;
    /* height: 22.69vw; */
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    min-height: 39.47vw;
    height: auto;
  }
`;

const DateText = styled.span`
  font-size: 0.73vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const ContainerAlert = styled.div`
  position: absolute;
  align-self: center;
  width: 24.16vw;
  top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 39.11vw;
    top: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 82.93vw;
    top: 4.26vw;
  }
`;
