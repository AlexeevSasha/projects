import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import type { IMediaShort } from "../../api/dto/IMedia";
import { formatDate } from "../../assets/constants/date";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IconCamera } from "../../assets/icon/iconCamera";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { useCallback, MouseEvent } from "react";
import { useWindowSize } from "../../core/hooks/UseWindowSize";

interface IProps {
  news: IMediaShort;
  defaultUrl: string;
}

export const CardNews = (props: IProps) => {
  const { locale = "ru", pathname, push, query } = useRouter();
  const { width } = useWindowSize();
  const sliceCount = width && (width >= 1920 ? 100 : width >= 768 ? 74 : 64);

  const clickCategory = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    push(
      {
        pathname:
          props.news.Section === "Site"
            ? props.news?.MediaType === "News"
              ? "/media/news"
              : "/media/gallery"
            : "/academy/media",
        query: { ...query, category: props.news.MediaCategoryId },
      },
      undefined
    );
  }, []);

  return (
    <Link prefetch={false} href={`${props.defaultUrl}${props.news?.Id}`} passHref>
      <NewsItem>
        <NewsImgContainer>
          {props.news?.PreviewPhoto && (
            <BannerNews>
              <NextImage
                src={props.news?.PreviewPhoto}
                alt={props.news?.PreviewPhoto}
                objectFit={"cover"}
                quality="100"
              />

              {props.news.LocalizedMediaCategoryName ? (
                <CategoryTag onClick={clickCategory}>
                  {getLocalValue(props.news.LocalizedMediaCategoryName, locale)}
                </CategoryTag>
              ) : null}
              <Gradient />
            </BannerNews>
          )}

          {props.news?.MediaType !== "News" && (props.news?.PhotoGallery || []).length > 0 && (
            <CountImg>
              <IconCamera />
              {props.news?.PhotoGallery?.length}
            </CountImg>
          )}
        </NewsImgContainer>

        <NewsInfo>
          <NewsTitle>{getLocalValue(props.news?.MediaHeader, locale)}</NewsTitle>

          {props.news.Announce ? (
            <Desc>
              {props.news.Announce?.length > 100
                ? props.news.Announce.slice(0, sliceCount) + "..."
                : props.news.Announce}
            </Desc>
          ) : null}
          <NewsDate>
            {pathname.includes("specialOffers")
              ? props.news?.PublishDateTime
              : formatDate(props.news?.PublishDateTime, "dd MMMM HH:mm", locale)}
          </NewsDate>
        </NewsInfo>
      </NewsItem>
    </Link>
  );
};

const NewsTitle = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  padding-bottom: 0.83vw;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding-bottom: 4.27vw;
  }
`;

const Desc = styled.div`
  color: ${(props) => props.theme.colors.white_black};
  letter-spacing: 0.1px;
  font-size: 0.83vw;
  line-height: 1.145vw;
  margin-bottom: 1.145vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.86vw;
    margin-bottom: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.86vw;
    margin-bottom: 4.26vw;
  }
`;

const NewsItem = styled.a`
  cursor: pointer;
  margin: 0;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    ${NewsTitle} {
      color: ${({ theme }) => theme.colors.gray_redDark};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 100%;
  }
`;

const NewsImgContainer = styled.div`
  position: relative;
  display: flex;

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const BannerNews = styled.div`
  height: 19.11vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 28.94vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 64vw;
  }
`;

const Gradient = styled.div`
  top: 0;
  background: ${theme.gradients.media};
  position: absolute;
  width: inherit;
  height: 100%;
`;

const CountImg = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.42vw;
  padding: 0.21vw 0.42vw;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;
  color: ${theme.colors.white};
  background: ${theme.colors.white}20;

  border-radius: 1.04vw;
  bottom: 0.83vw;
  right: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    gap: 1.04vw;
    padding: 0.52vw 1.04vw;
    border-radius: 2.61vw;
    bottom: 1.56vw;
    right: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    gap: 2.13vw;
    padding: 1.07vw 2.13vw;
    border-radius: 5.53vw;
    bottom: 2.13vw;
    right: 4.27vw;
  }
`;

const NewsInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  min-height: 8.65vw;
  height: 100%;
  box-sizing: border-box;
  padding: 1.25vw 2.08vw;
  /* padding-bottom: 0; */
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    padding-bottom: 0;
    min-height: 19.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 100%;
    padding: 4.27vw;
    padding-bottom: 0;
    min-height: 32.53vw;
  }
`;

const NewsDate = styled.span`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const CategoryTag = styled.div`
  position: absolute;
  left: 0.83vw;
  bottom: 0.83vw;
  font-family: Roboto, sans-serif;
  font-size: 0.73vw;
  font-weight: 500;
  padding: 0.21vw 0.42vw;
  background-color: ${theme.colors.white}20;
  color: ${theme.colors.grayLight};
  z-index: 10;
  border-radius: 1.04vw;
  text-align: center;
  width: fit-content;

  &:hover {
    background-color: ${theme.colors.white}40;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border-radius: 2.61vw;
    padding: 0.52vw 1.04vw;
    font-size: 1.83vw;
    left: 3.13vw;
    bottom: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border-radius: 5.33vw;
    padding: 1.07vw 2.13vw;
    font-size: 3.73vw;
    left: 4.27vw;
    bottom: 2.13vw;
  }
`;
