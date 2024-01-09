import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { Button, CmsText, SubTitle } from "./ui";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { ISpartakKids } from "../../api/dto/ISpartakKids";

export const BecomePart = (props: ISpartakKids["becomePartOfTeam"]) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <TextContainer>
        <SubTitle>{getLocalValue(props?.title, locale)}</SubTitle>

        <CmsText
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props?.description, locale),
          }}
        />
        <ButtonContainer>
          <Button type="red" onClick={() => location.assign(getLocalValue(props?.link, locale))}>
            {getLocalValue(props?.buttonTitle, locale)}
          </Button>
        </ButtonContainer>
      </TextContainer>

      <ImgItem>
        <NextImage src={getLocalValue(props?.img, locale)} />
      </ImgItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 1.92vw;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 1.56vw;
    flex-flow: column-reverse;
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 3.2vw;
    font-size: 4.27vw;
  }
`;

const TextContainer = styled.div`
  width: 47.6vw;
  margin-top: 2.24vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: -1vw;
  }
`;

const ImgItem = styled.div`
  width: 28vw;
  height: 28vw;
  margin: 0 auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.11vw;
    height: 45.11vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 59.2vw;
    height: 59.2vw;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;
