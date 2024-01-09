import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import React, { FC } from "react";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  src: string;
  gradient: string;
  position: "center";
  className?: string;
  quality?: number;
}

export const ContainerWithBackgroundImg: FC<IProps> = (props) => {
  return (
    <Container className={props.className}>
      <ImageWrapper>
        <NextImage src={props?.src} objectFit="cover" quality={props.quality ? props.quality : 75} />
        <Gradient gradient={props.gradient} />
      </ImageWrapper>

      {props.children}
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    background-position-y: bottom;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Gradient = styled.div<{ gradient: string }>`
  background: ${(props) => props.gradient};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
