import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { ComicEntity } from "../../api/dto/kids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { NextImage } from "../../ui/nextImage/nextImage";

type Props = {
  comic: ComicEntity;
  isSpecial?: boolean;
};

export const ComicCard = ({ comic, isSpecial }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container href={comic.ComicFileUrl} download target="_blank">
      <ImgItem><NextImage src={comic.ComicPosterUrl} objectFit="cover" /></ImgItem>

      <ComicsTitle>SPARTAK KID</ComicsTitle>

      <ComicsName title={getLocalValue(comic.Name, locale)}>{getLocalValue(comic.Name, locale)}</ComicsName>

      {!isSpecial && <ComicEdition>{getLocalValue(comic.Edition, locale)}</ComicEdition>}

      <Button type="red">{lang[locale].kids.read}</Button>
    </Container>
  );
};

const Container = styled.a`
  display: block;
  position: relative;
  width: 19.6875vw;
  transition: all ease 0.3s;
  cursor: pointer;
  color: ${theme.colors.white};
  text-decoration: unset;

  &:hover {
    transform: scale(1.01);
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 44.26vw;
  }
`;

const ImgItem = styled.div`
  width: 100%;
  height: 28.85vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 64.92vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 71.46vw;
  }
`;

const ComicsTitle = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  color: ${theme.colors.gray};
  font-size: 0.83vw;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-top: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    margin-top: 4.26vw;
  }
`;

const ComicsName = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.25vw;
  line-height: 1.77vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: none;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    line-height: 7.46vw;
  }
`;

const ComicEdition = styled.div`
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${theme.colors.red};
  font-size: 0.9375vw;
  line-height: 1.45vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
    line-height: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.86vw;
  }
`;

const Button = styled(CustomButton)`
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 3.2vw;
  }
`;
