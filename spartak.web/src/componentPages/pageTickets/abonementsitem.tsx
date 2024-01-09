import React from "react";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IAbomenent } from "../../api/dto/IAbonement";
import { useRouter } from "next/router";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps extends IAbomenent {
  onClick: (EventId: number) => void;
}

export const AbonementsItem = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Item onClick={() => props.onClick(props.EventId)}>
      <ContainerImage>
        <NextImage
          src={props.PreviousImageUrl}
          alt={getLocalValue(props.FullName, locale)}
          sizes="(max-width: 767px) 91.47vw,
              (max-width: 1199px) 93.87vw,
              22.24vw"
          quality={100}
        />
      </ContainerImage>
      <BottomArea>
        <Text>{getLocalValue(props.FullName, locale)}</Text>
        <IconArrowRight />
      </BottomArea>
    </Item>
  );
};

const Item = styled.div`
  width: 40.63vw;
  height: 22.24vw;

  color: ${theme.colors.white};
  overflow: hidden;

  position: relative;
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  svg {
    transition: all 0.1s ease-in-out;
    margin-right: 0;
  }

  &:hover {
    svg {
      margin-right: -1.25vw;
    }
  }

  &:after {
    content: " ";
    background: ${theme.gradients.first};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 5;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    height: 51.37vw;

    &:hover {
      transform: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 50.13vw;
  }
`;

const ContainerImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Text = styled.p`
  margin: 0;
  z-index: 10;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  max-width: 25.94vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    max-width: 77.84vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    max-width: 69.33vw;
  }
`;

const BottomArea = styled.div`
  display: flex;
  width: 100%;
  margin: 1.25vw 3.33vw 1.25vw 2.08vw;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 12;

  svg {
    width: 1.67vw;
    height: 1.67vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw;

    svg {
      width: 4.17vw;
      height: 4.17vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 4.27vw;

    svg {
      width: 5.87vw;
      height: 5.87vw;
    }
  }
`;
