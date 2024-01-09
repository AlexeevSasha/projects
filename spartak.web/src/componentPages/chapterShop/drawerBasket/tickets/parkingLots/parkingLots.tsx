import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ticketsRepository } from "../../../../../api/ticketsRepository";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { MinusIcon } from "../../../../../assets/icon/minusIcon";
import { PlusIcon } from "../../../../../assets/icon/plusIcon";
import { theme } from "../../../../../assets/theme/theme";
import { DataContext } from "../../../../../core/dataProvider";

interface IProps {
  parkingLots: ITicket;
  deleteParking: (type: string) => (body?: DeleteCartTicketsDto) => void;
  createOrder: (calendarId: string) => void;
}

export const ParkingLots = ({ parkingLots, createOrder, deleteParking }: IProps) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth, setLoading, setListTicket } = useContext(DataContext);

  const handleUpdate = (value: number) => {
    setLoading(true);

    ticketsRepository
      .changeCategoryCartTicket(parkingLots.calendarId, { id: parkingLots.id, quant: value.toString() })
      .then(() => {
        ticketsRepository
          .fetchCartTickets()
          .then((res) => setListTicket(res.list))
          .finally(() => setLoading(false));
      });
  };

  return (
    <>
      <div>
        <Header>
          Parking
          <ClearAll onClick={() => deleteParking(parkingLots.calendarId)()}>
            {lang[locale].shop.clearAll}
            <ClearCartIcon />
          </ClearAll>
        </Header>
        <ParkingItem>
          <ParkingTitle>{parkingLots.calendarFullName}</ParkingTitle>
          <ParkingDate>
            {parkingLots.calendarDay}, {parkingLots.calendarTime}
          </ParkingDate>

          <ParkingControls>
            <ParkingTitlePrice>
              {lang[locale].shop.unitPrice}
              <br />
              <Price>{+parkingLots.price} ₽</Price>
            </ParkingTitlePrice>
            <Controls>
              <MinusIcon onClick={() => +parkingLots.quant > 1 && handleUpdate(+parkingLots.quant - 1)} />
              {parkingLots.quant}
              <PlusIcon onClick={() => handleUpdate(+parkingLots.quant + 1)} />
            </Controls>
            <ParkingTitlePrice>
              {lang[locale].shop.total}:
              <ParkingTotalPrice>{+parkingLots.quant * +parkingLots.price} ₽</ParkingTotalPrice>
            </ParkingTitlePrice>
            <SvgContainer>
              <ClearCartIcon onClick={() => deleteParking(parkingLots.calendarId)()} />
            </SvgContainer>
          </ParkingControls>
        </ParkingItem>
      </div>

      <TotalSum>
        {lang[locale].shop.sum}: {parkingLots.price} ₽
        <GoToCart
          onClick={() =>
            auth?.user
              ? createOrder(parkingLots.calendarId)
              : push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`)
          }
        >
          {lang[locale].shop.checkout}
        </GoToCart>
      </TotalSum>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.83vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  padding: 0 1.25vw;
  svg {
    path {
      stroke: ${theme.colors.red};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
    font-size: 4.27vw;
  }
`;

const ClearAll = styled.div`
  font-size: 0.63vw;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${theme.colors.red};
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.42vw;
    width: 1.25vw;
    height: 1.25vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    svg {
      margin-left: 1.04vw;
      width: 3.13vw;
      height: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    svg {
      margin-left: 1.07vw;
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const TotalSum = styled.div`
  color: ${theme.colors.white};
  background: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.25vw;
  text-transform: uppercase;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.83vw 1.25vw;
  margin-top: auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 3.13vw;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    font-size: 3.73vw;
  }
`;

const GoToCart = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 0.73vw;
  text-transform: uppercase;

  border: 1px solid ${theme.colors.white};
  padding: 0.73vw 1.25vw;
  text-align: center;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw 3.13vw;
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.73vw 6.4vw;
    font-size: 3.73vw;
    white-space: nowrap;
  }
`;

const ParkingItem = styled.div`
  padding: 1.25vw;
`;

const ParkingTitle = styled.div`
  font-weight: 500;
  font-size: 0.83vw;
  flex-wrap: wrap;
  color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ParkingDate = styled.div`
  text-transform: uppercase;
  color: ${theme.colors.grayDark};
  font-size: 0.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const ParkingControls = styled.div`
  margin-top: 0.83vw;
  display: flex;
`;

const ParkingTitlePrice = styled.div`
  font-size: 0.64vw;
  color: ${theme.colors.gray};
  text-transform: uppercase;
  width: 5.2vw;

  &:not(:first-child) {
    padding-left: 1.19vw;
    width: max-content;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    width: 13vw;

    &:not(:first-child) {
      padding-left: 3vw;
      width: max-content;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    width: 29vw;

    &:not(:first-child) {
      padding-left: 9vw;
    }
  }
`;

const Price = styled.div`
  font-size: 0.94vw;
  margin-top: 0.26vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Controls = styled.div`
  font-size: 1.25vw;
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.black};
  align-items: center;
  flex-basis: 6.66vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    flex-basis: 16.68vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    flex-basis: 27.73vw;
  }
`;

const ParkingTotalPrice = styled.div`
  font-size: 1.25vw;
  color: ${theme.colors.black};
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  margin-left: auto;
  padding-bottom: 0.42vw;
  cursor: pointer;

  svg {
    width: 1.25vw;
    height: 1.25vw;
  }

  svg > path {
    stroke: ${theme.colors.grayDark};
  }

  svg:hover {
    path {
      stroke: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: flex-start;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;
