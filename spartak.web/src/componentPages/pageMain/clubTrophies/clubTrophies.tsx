import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { trophiesList } from "./clubTriphiesData";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  addPadding?: boolean;
}

export const ClubTrophies = ({ addPadding }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <ContainerContent>
      <Container addPadding={addPadding}>
        <Header>
          <Title>{lang[locale].mainPage.clubTrophies}</Title>
        </Header>

        <Content>
          {trophiesList.map(({ id, name, count, icon }) => (
            <ItemContainer key={id}>
              <IconAndCount>
                <Icon><NextImage src={icon} /></Icon>
                <Count>{count}</Count>
              </IconAndCount>
              <Name>{getLocalValue(name, locale)}</Name>
            </ItemContainer>
          ))}
        </Content>
      </Container>
    </ContainerContent>
  );
};

const Container = styled.div<{ addPadding?: boolean }>`
  padding-top: ${({ addPadding }) => addPadding && "5.21vw"};
  margin: 0 0 6.25vw;
  flex-basis: 100%;
  user-select: none;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: ${({ addPadding }) => addPadding && "10.43vw"};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: ${({ addPadding }) => addPadding && "10.67vw"};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 82.5vw;
`;

const Title = styled.h3`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 3.23vw;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    justify-content: space-evenly;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const ItemContainer = styled.div`
  grid-gap: 0.5vw;
  display: flex;
  align-items: center;
  width: 12vw;
  margin-top: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-wrap: wrap;
    flex-direction: column;
    width: 31vw;
    margin-top: 3.65vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 30vw;
    margin-top: 7.5vw;
  }
`;

const IconAndCount = styled.div`
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;

const Icon = styled.div`  
  width: 3.65vw;
  height: 5.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 9.13vw;
    height: 12.78vw;
  }
`;

const Count = styled.span`
  font-weight: bold;
  font-size: 3.75vw;
  letter-spacing: -0.02em;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
  }
`;

const Name = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${({ theme }) => theme.colors.gray_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
    width: 16vw;
  }
`;
