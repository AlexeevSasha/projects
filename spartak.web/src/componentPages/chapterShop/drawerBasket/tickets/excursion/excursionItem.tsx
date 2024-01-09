import React from "react";
import styled from "styled-components";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { MinusIcon } from "../../../../../assets/icon/minusIcon";
import { PlusIcon } from "../../../../../assets/icon/plusIcon";
import { theme } from "../../../../../assets/theme/theme";

interface IProps {
  excursion: ITicket;
  onDelete: (id: DeleteCartTicketsDto) => void;
  handleUpdateExcursionCount: (body?: { id: string; quant?: string }) => void;
}

export const ExcursionItem = ({ excursion, onDelete, handleUpdateExcursionCount }: IProps) => {
  const sum = (+excursion?.price * excursion?.quant)?.toFixed(2);
  return (
    <Content>
      <TopBlock>
        <Title>{excursion.calendarFullName}</Title>

        <Text>{excursion.calendarDay}</Text>

        <Text>общий</Text>
      </TopBlock>

      <BottomBlock>
        <ItemPrice>
          <div>Цена за ед.</div>

          <div>{excursion.price} ₽</div>
        </ItemPrice>

        <Controls>
          <MinusIcon
            onClick={() =>
              +excursion.quant > 1 &&
              handleUpdateExcursionCount({ id: excursion.id, quant: (+excursion.quant - 1).toString() })
            }
          />
          {excursion.quant}
          <PlusIcon
            onClick={() => handleUpdateExcursionCount({ id: excursion.id, quant: (+excursion.quant + 1).toString() })}
          />
        </Controls>

        <TotalPrice>
          <div>Сумма</div>

          <div>{sum} ₽</div>
        </TotalPrice>
      </BottomBlock>
      <ClearCartIcon onClick={() => onDelete({ id: excursion.id })} style={{ cursor: "pointer" }} />
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  grid-row-gap: 0.83vw;
  grid-gap: 0.83vw 1vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding: 1.77vw 1.25vw 1.15vw;

  & > svg {
    width: 1.25vw;
    height: 1.25vw;
    align-self: flex-end;
    padding-bottom: 0.25vw;

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
    padding: 3.13vw 3.13vw 2.87vw;
    grid-gap: 2.09vw 2vw;
    & > svg {
      width: 3.13vw;
      height: 3.13vw;
      padding-bottom: 1vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw 6.13vw;
    grid-gap: 2.09vw 7vw;
    & > svg {
      width: 6.4vw;
      height: 6.4vw;
      padding-bottom: 0.95vw;
      grid-row-start: 1;
      grid-row-end: 1;
      grid-column-start: 2;
      grid-column-end: 2;
      align-self: flex-start;
    }
  }
`;

const TopBlock = styled.div`
  display: flex;
  grid-column: span 2;
  flex-direction: column;
  grid-row-gap: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    grid-column: inherit;
  }
`;

const Title = styled.h4`
  margin: 0;
  color: ${theme.colors.black};
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${theme.colors.grayDark};
  text-transform: uppercase;
  font-size: 0.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const BottomBlock = styled.div`
  display: flex;
  grid-column-gap: 3.07vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 7.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: inherit;
    justify-content: space-between;
    grid-column: span 2;
  }
`;

const ItemPrice = styled.div`
  color: ${theme.colors.gray};
  display: flex;
  flex-direction: column;
  grid-row-gap: 0.1vw;
  text-transform: uppercase;

  & > div:nth-child(1) {
    font-size: 0.63vw;
  }

  & > div:nth-child(2) {
    font-size: 0.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0.26vw;

    & > div:nth-child(1) {
      font-size: 1.56vw;
    }

    & > div:nth-child(2) {
      font-size: 2.35vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 0;

    & > div:nth-child(1) {
      font-size: 3.2vw;
    }

    & > div:nth-child(2) {
      font-size: 4.8vw;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;

  & > div:nth-child(1) {
    font-size: 0.63vw;
    color: ${theme.colors.gray};
  }

  & > div:nth-child(2) {
    font-size: 1.25vw;
    color: ${theme.colors.black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > div:nth-child(1) {
      font-size: 1.56vw;
    }

    & > div:nth-child(2) {
      font-size: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > div:nth-child(1) {
      font-size: 3.2vw;
    }

    & > div:nth-child(2) {
      font-size: 4.8vw;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  width: fit-content;
  min-width: 6.67vw;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-width: 16.69vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 27.73vw;
    font-size: 6.4vw;
  }
`;
