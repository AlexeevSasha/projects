import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { NextImage } from "../../ui/nextImage/nextImage";
import { BidModal } from "./bidModal";
import { Button, CmsText, SubTitle } from "./ui";
import { ISpartakKids } from "../../api/dto/ISpartakKids";
import { useRouter } from "next/router";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

export const PlayerToField = (props: ISpartakKids["takePlayerToField"]) => {
  const [bidModalIsOpen, setBidModalIsOpen] = useState(false);
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <ImageWrapper>
        <NextImage src={"/images/kids/promoBg_v1.0.0.png"} objectFit="cover" />
      </ImageWrapper>

      <ContainerContent>
        <Content>
          <SubTitle>{getLocalValue(props?.title, locale)}</SubTitle>

          <CmsText dangerouslySetInnerHTML={{ __html: getLocalValue(props?.description, locale) }} />
          <ButtonContainer>
            <Button type="red" onClick={() => setBidModalIsOpen(true)}>
              {getLocalValue(props?.buttonTitle, locale)}
            </Button>
          </ButtonContainer>
        </Content>

        <ContentImgContainer>
          <NextImage src={getLocalValue(props?.photo, locale)} />
        </ContentImgContainer>
      </ContainerContent>

      {bidModalIsOpen && <BidModal onClose={() => setBidModalIsOpen(false)} />}
    </Container>
  );
};

const Container = styled.div`
  margin: 6.25vw -8.671875vw 0;
  padding: 4.16vw 0;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.colors.none_white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw -3.07vw 0;
    padding: 4.17vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.66vw -4.27493vw 0;
    padding: 6.4vw 0;
  }
`;

const Content = styled.div`
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #0d1116ed;
`;

const ContentImgContainer = styled.div`
  width: 40.53vw;
  height: 25.625vw;
  margin: auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
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
