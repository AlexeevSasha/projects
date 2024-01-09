import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import { IMockData } from "../../../../../pages/tickets/info/invalidPlaces";

interface IProps {
  placesData: IMockData;
}

export const PlacesDescription = ({ placesData }: IProps) => {
  return (
    <Container>
      <div>
        <Text>{placesData.text1}</Text>
        <br />
        <Text>{placesData.text2}</Text>
        <ListWithTitle>
          <BlockTitle> {placesData.list1.title}</BlockTitle>
          <List>
            {placesData.list1.items.map((el, index) => (
              <li key={"List1 item1 " + index}>
                <StyledRedPoint>
                  <IconRedPoint />
                </StyledRedPoint>
                {el}
              </li>
            ))}
          </List>
        </ListWithTitle>

        <ListWithTitle>
          <BlockTitle> {placesData.list2.title}</BlockTitle>

          <List>
            {placesData.list2.items.map((el, index) => (
              <li key={"List2 item " + index}>
                <StyledRedPoint>
                  <IconRedPoint />
                </StyledRedPoint>
                {el}
              </li>
            ))}
          </List>
        </ListWithTitle>

        <LastBlockTitle>{placesData.text3title}</LastBlockTitle>
        <Text>{placesData.text3}</Text>
        <br />
        <Text>{placesData.text4}</Text>
      </div>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: start;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 2.08vw 0 7.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;

const ListWithTitle = styled.div`
  padding: 2.08vw 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0 0;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  row-gap: 0.42vw;

  li {
    display: flex;
    align-items: center;
    gap: 0.63vw;
    list-style: none;
    font-family: Roboto, sans-serif;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
      gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      gap: 2.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 2.13vw;
  }
`;

const StyledRedPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;

const BlockTitle = styled.h3`
  margin: 0;
  font-weight: 700;
  padding-bottom: 1.61vw;
  font-size: 1.67vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
    font-size: 8.53vw;
  }
`;
const LastBlockTitle = styled(BlockTitle)`
  padding-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-right: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
