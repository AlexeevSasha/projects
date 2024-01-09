import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { TextWithRedPoint } from "../../components/textWithRedPoint/textWithRedPoint";
import { CustomButton } from "../../components/buttons/customButton";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { NotificationMessage } from "./notificationMessage";
import Link from "next/link";
import { NextImage } from "../../ui/nextImage/nextImage";

export const StandartTours = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Content>
      <LeftSide>
        <Title>{lang[locale].tickets.standartTour}</Title>
        <TextWithRedPoint>Вестибюль Западной трибуны стадиона</TextWithRedPoint>
        <TextWithRedPoint>Комната с игровыми футболками спартаковцев</TextWithRedPoint>
        <TextWithRedPoint>Игровой туннель, выход к полю</TextWithRedPoint>
        <TextWithRedPoint>Тренерские места, скамейка запасных</TextWithRedPoint>
        <TextWithRedPoint>Памятник братьям Старостиным</TextWithRedPoint>
        <TextWithRedPoint>Памятник Фёдору Черенкову</TextWithRedPoint>
        <TextWithRedPoint>Резервная раздевалка</TextWithRedPoint>
        <TextWithRedPoint>Закладная капсула стадиона</TextWithRedPoint>
        <TextWithRedPoint>Зал для пресс-конференций</TextWithRedPoint>
        <TextWithRedPoint>ВИП-ложи</TextWithRedPoint>
        <TextWithRedPoint>Зал Славы (интерактивный музей клуба)</TextWithRedPoint>
        <Button type={"red"}>
          <IconArrowRight />
          Купить тур
        </Button>
      </LeftSide>
      <RightSide>
        <ImgContainer><NextImage alt={"firstStandart"} src={"/images/tickets/firstStandart_v1.0.0.png"} /></ImgContainer>
        <ImgContainer><NextImage alt={"secondtandart"} src={"/images/tickets/secondStandart_v1.0.0.png"} /></ImgContainer>
        <ImgContainer><NextImage alt={"thirdStandart"} src={"/images/tickets/thirdStandart_v1.0.0.png"} /></ImgContainer>
      </RightSide>
      <BottomSide>
        <PriceContainer>
          <PriceItem>
            <Text>Стоимость одного билета для взрослого:</Text>
            <Price>800 ₽</Price>
          </PriceItem>
          <PriceItem>
            <Text>Льготные билеты для детей от 6 до 16 лет и для пенсионеров:</Text>
            <Price>500 ₽</Price>
          </PriceItem>
        </PriceContainer>
        <NotificationMessage>
          В онлайне можно купить только билеты в полную стоимость. Льготные билеты можно приобрести только в нашем
          магазине Red-White Store на стадионе перед экскурсией. <br />
          Следите{" "}
          <Link prefetch={false} href={"#"} passHref>
            <Customlink>здесь</Customlink>
          </Link>{" "}
          за временем начала экскурсий.{" "}
        </NotificationMessage>
      </BottomSide>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25vw 1.25vw;
  color: ${theme.colors.white};
  margin: 6.25vw 0;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
    margin: 10.43vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    margin: 10.67vw 0;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.redOpacity};
  padding: 2.08vw;
  border: 1px solid ${theme.colors.red};
  font-family: Roboto;
  font-size: 0.94vw;
  font-weight: 400;
  & > div:not(:nth-child(1)) {
    margin: 0.83vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 5.22vw;
    grid-row: 2;

    & > div:not(:nth-child(1)) {
      margin: 3.91vw 0;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 6.4vw;

    & > div:not(:nth-child(1)) {
      margin: 6.4vw 0;
    }
  }
`;

const BottomSide = styled.div`
  grid-column: span 2;
  display: grid;
  grid-gap: 1.25vw 1.25vw;
  grid-template-columns: 1fr 1fr;
  font-size: 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
    grid-column: span 1;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    font-size: 4.27vw;
  }
`;

const RightSide = styled.div`
  display: grid;
  grid-template-rows: 18.49vw 18.49vw 18.49vw;
  grid-row-gap: 0.21vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-rows: 26.08vw 46.28vw;
    grid-gap: 0.52vw;
    grid-template-columns: 1fr 1fr;
    grid-row: 1;

    & img:nth-last-child(1) {
      grid-column: span 2;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-rows: 25.33vw 45.07vw;
    grid-gap: 0.53vw;
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h5`
  margin: 0 0 1.08vw;
  font-size: 2.71vw;
  border-bottom: 1px solid ${theme.colors.red};
  padding-bottom: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
    font-size: 6.78vw;
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;
    font-size: 8.53vw;
    padding-bottom: 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  width: fit-content;
  margin-top: 2.16vw;
  grid-column-gap: 0.42vw;
  margin-bottom: 0;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.22vw;
    grid-column-gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
    grid-column-gap: 2.13vw;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  width: auto;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const PriceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    grid-template-columns: 1fr;
  }
`;

const PriceItem = styled.div`
  border: 1px solid ${theme.colors.grayDark};
  padding: 0.83vw;
  display: flex;
  grid-row-gap: 0.83vw;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0.52vw;
    padding: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 1.07vw;
    padding: 3.2vw;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${theme.colors.grayLight};
  font-size: 0.94vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Price = styled.p`
  margin: 0;
  color: ${theme.colors.red};
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    color: ${theme.colors.white};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Customlink = styled.a`
  text-decoration: none;
  color: ${theme.colors.red};
`;
