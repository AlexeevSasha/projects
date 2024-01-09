import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IMediaShort } from "../../../../api/dto/IMedia";
import { theme } from "../../../../assets/theme/theme";
import { CardNews } from "../../../../components/cardNews/cardNews";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { GridContainer } from "../../../pageMain/mainPageNews/pageMainNews";

interface IProps {
  newsList?: IMediaShort[];
}

export const NewsAcademy = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.newsList?.length ? (
    <>
      <StyledContainer>
        <TitleBlock>
          <Title>{lang[locale].main.news.title}</Title>
          <Link prefetch={false}
            passHref
            href={`/academy/media?mediaType=News&page=1&month=${new Date().getMonth()}&year=${new Date().getFullYear()}`}
          >
            <StyledLink>{lang[locale].main.news.allNews}</StyledLink>
          </Link>
        </TitleBlock>
      </StyledContainer>

      {props.newsList ? (
        <GridContainer countColumns={props.newsList.length}>
          {props.newsList?.map((elem, index) => (
            <CardNews key={index} news={elem} defaultUrl={"/academy/media/"} />
          ))}
        </GridContainer>
      ) : null}
    </>
  ) : null;
};
const StyledContainer = styled(ContainerContent)`
  display: flex;
  flex-direction: column;
  padding-top: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 6.4vw;
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
  font-weight: 700;
  line-height: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  font-size: 0.83vw;
  line-height: 1.15vw;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    line-height: 2.87vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;
    line-height: 3.73vw;
  }
`;
