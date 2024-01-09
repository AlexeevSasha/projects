import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import { IMediaShort } from "../../api/dto/IMedia";
import { formatDate } from "../../assets/constants/date";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IconPlay } from "../../assets/icon/iconPlay";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  clickPlay?: (value: IMediaShort) => void;
  videoInfo: IMediaShort;
  defaultUrl: string;
}

export const CardVideo = (props: IProps) => {
  const { locale = "ru", push, query } = useRouter();

  const clickPlay = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      props.clickPlay?.(props.videoInfo);
    },
    [props]
  );

  const clickCategory = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    push(
      {
        pathname: props.videoInfo.Section === "Site" ? "/media/videos" : "/academy/media",
        query: { ...query, category: props.videoInfo.MediaCategoryId },
      },
      undefined
    );
  }, []);

  return (
    <Link prefetch={false} href={{ pathname: `${props.defaultUrl}${props.videoInfo?.Id}` }} passHref locale={locale}>
      <Container>
        <ContainerImg>
          <NextImage
            src={props.videoInfo?.PreviewPhoto}
            alt={getLocalValue(props.videoInfo.MediaHeader, locale)}
            objectFit={"cover"}
            quality="100"
          />
          {props.videoInfo.LocalizedMediaCategoryName ? (
            <CategoryTag onClick={clickCategory}>
              {getLocalValue(props.videoInfo.LocalizedMediaCategoryName, locale)}
            </CategoryTag>
          ) : null}
        </ContainerImg>

        <ContainerText>
          <Title>{getLocalValue(props.videoInfo.MediaHeader, locale)}</Title>

          <ContainerDescription>
            <TextDate>{formatDate(props.videoInfo.PublishDateTime, "dd MMMM HH:mm", locale)}</TextDate>
          </ContainerDescription>

          <ContainerIcon onClick={props.clickPlay ? clickPlay : undefined}>
            <IconPlay />
          </ContainerIcon>
        </ContainerText>
      </Container>
    </Link>
  );
};

const Title = styled.span`
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

const Container = styled.a`
  text-decoration: none;

  &:hover {
    ${Title} {
      color: ${({ theme }) => theme.colors.gray_redDark};
    }
  }
`;

const ContainerImg = styled.div`
  margin: 0;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  height: 19.11vw;

  &:before {
    content: " ";
    background: linear-gradient(
      359.63deg,
      rgba(12, 18, 26, 0.8) 13.97%,
      rgba(14, 35, 86, 0.2) 69.27%,
      rgba(0, 0, 0, 0) 102.42%
    );
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 28.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 64vw;
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

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  height: 8.65vw;
  position: relative;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding: 1.25vw;
  padding-bottom: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    padding-bottom: 0;
    height: 19.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    padding-bottom: 0;
    height: 32.53vw;
  }
`;

const ContainerDescription = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    justify-content: flex-start;
  }
`;

const TextDate = styled.time`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    margin-right: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-right: 3.2vw;
  }
`;

const ContainerIcon = styled.span`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1.25vw;
  background-color: ${theme.colors.red};
  align-self: self-end;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw;

    svg {
      height: 3.13vw;
      width: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;

    svg {
      height: 6.4vw;
      width: 6.4vw;
    }
  }
`;
