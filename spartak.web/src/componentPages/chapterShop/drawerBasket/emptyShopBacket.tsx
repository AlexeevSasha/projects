import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { ShopCard } from "../../../assets/icon/ShopCart";
import { DataContext } from "../../../core/dataProvider";

interface IProps {
  title: string;
  text: string;
  defaultUrl: string;
  buttonText: string;
}

export const EmptyShopBacket = (props: IProps) => {
  const { push } = useRouter();
  const { setDrawerIsOpen } = useContext(DataContext);

  const onClick = () => {
    push(props.defaultUrl);
    setDrawerIsOpen(false);
  };

  return (
    <Container>
      <Title>{props.title}</Title>
      <ShopCard />
      <Text>{props.text}</Text>
      <Button onClick={onClick}>{props.buttonText}</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  grid-row-gap: 1.25vw;
  height: 100%;

  svg,
  &:hover {
    path {
      stroke: ${theme.colors.black}!important;
    }
  }

  path:nth-child(2) {
    stroke: ${theme.colors.red}!important;
  }

  svg {
    width: 3.91vw !important;
    height: 3.91vw !important;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;

    svg {
      width: 8.91vw !important;
      height: 8.91vw !important;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;

    svg {
      width: 14.91vw !important;
      height: 14.91vw !important;
    }
  }
`;

const Title = styled.h4`
  font-size: 2.08vw;
  color: ${theme.colors.black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    font-weight: 500;
  }
`;

const Text = styled.p`
  font-size: 0.94vw;
  color: ${theme.colors.black};
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.01vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 0 5.87vw;
  }
`;

const Button = styled.div`
  cursor: pointer;
  padding: 0.73vw 6.8vw;
  width: fit-content;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  text-transform: uppercase;
  font-size: 0.73vw;
  font-weight: 600;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.83vw 16.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 3.73vw 27.47vw;
  }
`;
