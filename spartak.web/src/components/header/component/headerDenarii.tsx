import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

type Props = {
  onClick?: () => void;
  count?: number;
};

export const HeaderDenarii = ({ onClick, count = 0 }: Props) => {
  return (
    <Container onClick={onClick}>
      <Denary>
        <NextImage src="/images/gladiator.svg" alt="denarii" />
      </Denary>

      <Count>{Math.floor(count)}</Count>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.6vw;
  background: ${theme.colors.white};
  border-radius: 24px;
  height: 1.45vw;
  margin-left: 18px;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.65vw;
    margin: 0;
    padding: 0 1.4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 7.46vw;
    padding: 0 3vw;
  }
`;

const Denary = styled.div`
  width: 1vw;
  height: 1vw;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2vw;
    height: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5vw;
    height: 5vw;
  }
`;

const Count = styled.div`
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 0.73vw;
  margin-left: 0.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    margin-left: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-left: 2vw;
  }
`;
