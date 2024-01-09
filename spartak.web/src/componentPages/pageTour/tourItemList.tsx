import React from "react";
import styled from "styled-components";
import { IListTour } from "./toursList";
import { theme } from "../../assets/theme/theme";
import { NotificationMessage } from "./notificationMessage";
import { CustomButton } from "../../components/buttons/customButton";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps extends Omit<IListTour, "id" | "position"> {
  even: boolean;
}

export const TourItemList = ({ title, price, infoMessage, text, buttonText, imgSrc, even }: IProps) => {
  return (
    <Content even={even}>
      <LeftSide even={even}>
        <ImgContainer><NextImage alt={title} src={imgSrc} /></ImgContainer>
      </LeftSide>
      <RightSide>
        {title && <Title>{title}</Title>}
        {text}
        {infoMessage && (
          <MobileFlexPrice>
            {price && (
              <MobilePriceContaciner>
                <P>Цена экскурсии:</P>
                <Price>{price}</Price>
              </MobilePriceContaciner>
            )}
            <NotificationMessage>{infoMessage}</NotificationMessage>
          </MobileFlexPrice>
        )}
        {buttonText && price && (
          <BottomSide>
            <Price>{price}</Price>
            <Button type={"red"}>
              <IconArrowRight />
              {buttonText}
            </Button>
          </BottomSide>
        )}
      </RightSide>
    </Content>
  );
};

const Content = styled.div<{ even: boolean }>`
  display: grid;
  grid-template-areas: ${({ even }) => (even ? '"left right"' : '"right left"')};
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  color: ${theme.colors.grayLight};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-areas: "left" "right";
    grid-row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
  }
`;

const LeftSide = styled.div<{ even: boolean }>`
  display: grid;
  grid-area: left;
  width: 34.9vw;
  height: 28.75vw;
  position: relative;
  &:after {
    content: " ";
    position: absolute;
    left: -1px;
    right: -1px;
    bottom: -1px;
    top: -1px;
    background: ${({ even }) =>
      even
        ? "linear-gradient(89.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%)"
        : "linear-gradient(269.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%)"};
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    height: 62.58vw;
    &:after {
      background: linear-gradient(179.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%);
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 60.8vw;
  }
`;

const RightSide = styled.div`
  grid-area: right;
  & > p {
    font-size: 1.25vw;
    margin: 1.25vw 0;
    height: fit-content;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > p {
      font-size: 2.35vw;
      margin: 3.13vw 0;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > p {
      font-size: 4.27vw;
      margin: 6.4vw 0;
    }
  }
`;

const ImgContainer = styled.div`
  width: 34.9vw;
  height: 28.75vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 62.58vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 60.8vw;
  }
`;

const Title = styled.h6`
  margin: 0;
  font-size: 2.08vw;
  color: ${theme.colors.white};
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const Price = styled.p`
  margin: 0;
  font-size: 2.08vw;
  color: ${theme.colors.red};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    color: ${theme.colors.white};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  grid-column-gap: 0.42vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 1.6vw;
  }
`;

const BottomSide = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25vw;
  align-items: center;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    & ${Price} {
      display: none;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const MobileFlexPrice = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  & ${Price} {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 3.13vw;
    color: ${theme.colors.gray};
    & ${Price} {
      display: flex;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 6.4vw;
    font-size: 4.27vw;
  }
`;

const MobilePriceContaciner = styled.div`
  display: flex;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    grid-row-gap: 0.52vw;
    border: 1px solid ${theme.colors.white};
    padding: 1.56vw;
    color: ${theme.colors.white};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 1.07vw;
    padding: 3.2vw;
  }
`;

const P = styled.p`
  margin: 0;
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }
`;
