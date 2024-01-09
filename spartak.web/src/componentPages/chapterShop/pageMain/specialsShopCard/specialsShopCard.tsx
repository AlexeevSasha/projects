import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface Props {
  imageSrc: string;
  text: string;
  isActive?: boolean;
}
export const SpecialsShopCard = ({ imageSrc, text, isActive }: Props) => {
  return (
    <Container>
      <NextImage src={imageSrc} />
      <ContentContainer>
        <Text isActive={isActive}>{text}</Text>
        <ActiveButton type={"red"} isActive={isActive}>
          К покупкам
        </ActiveButton>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;    
  height: 43.75vw;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 1;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    height: 101.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 98.4vw;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.08vw;
  padding: 2.08vw;
  z-index: 99;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
  }
`;

const Text = styled.div<{ isActive?: boolean }>`
  color: ${theme.colors.white};
  font-size: 2.71vw;
  animation: ${({ isActive }) => (isActive ? "hideToShow 1s" : "none")};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const ActiveButton = styled(CustomButton) <{ isActive?: boolean }>`
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  width: fit-content;
`;
