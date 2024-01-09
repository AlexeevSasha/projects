import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../assets/theme/theme";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";

interface IProps {
  abonementInfo: ITicket;
  onDelete: (id: DeleteCartTicketsDto) => void;
}

export const AbonementItem = ({ abonementInfo, onDelete }: IProps) => {
  const wordOfName = abonementInfo.name.split(" ");
  return (
    <Content>
      <LeftContainer>
        <Text>{abonementInfo.calendarName}</Text>
      </LeftContainer>
      <MiddleContainer>
        <Text>
          {wordOfName[0]} {wordOfName[1]}
        </Text>
        <Text>
          {wordOfName[2]} {wordOfName[3]}
        </Text>
        <Text>
          {wordOfName[4]} {wordOfName[5]}
        </Text>
      </MiddleContainer>
      <RightContainer>
        <Price>{abonementInfo.price} ₽</Price>
        <ClearCartIcon onClick={() => onDelete({ id: abonementInfo.id })} />
      </RightContainer>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.42vw;
  align-items: center;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding: 1.77vw 1.25vw 1.15vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 3.13vw 2.87vw;
    grid-column-gap: 1.04vw;
    grid-template-columns: 1fr 21.38vw auto;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw 6.13vw;
    grid-template-columns: 1fr 52.27vw;
    grid-column-gap: 2.13vw;
    grid-row-gap: 2.13vw;
    align-items: baseline;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleContainer = styled.div``;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1.25vw;
  align-items: center;
  grid-column-gap: 0.83vw;
  svg {
    cursor: pointer;
    &:hover {
      path {
        stroke: ${theme.colors.red};
      }
    }
    path {
      stroke: ${theme.colors.grayDark};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: auto 3.13vw;
    grid-column-gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column: span 2;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    align-items: center;
    grid-column-gap: 4.09vw;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.25vw;
  font-weight: 700;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
