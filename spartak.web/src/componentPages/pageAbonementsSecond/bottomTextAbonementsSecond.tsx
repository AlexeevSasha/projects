import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { TextWithRedPoint } from "../../components/textWithRedPoint/textWithRedPoint";

export const BottomTextAbonementsSecond = () => {
  return (
    <Content>
      <Title>Напоминаем о правилах посещения стадиона, предусмотренных Роспотребнадзором и регламентом РПЛ:</Title>
      <DescriptionContainer>
        <div>
          <TextWithRedPoint>
            проход возможен только при наличии QR-кода вакцинированного или переболевшего;
          </TextWithRedPoint>
          <TextWithRedPoint>не забывайте маски (респираторы);</TextWithRedPoint>
          <TextWithRedPoint>Ваша температура должна быть не выше 37,0 °;</TextWithRedPoint>
          <TextWithRedPoint>
            соблюдайте социальную дистанцию между вами и другими зрителями на трибуне и прилегающей к стадиону
            территории (в том числе в зонах досмотра);
          </TextWithRedPoint>
          <TextWithRedPoint>проводите дезинфекцию рук с помощью установленных на арене санитайзеров.</TextWithRedPoint>
        </div>
        <div>
          Наш клуб убедительно просит каждого гостя соблюдать все необходимые санитарно-противоэпидемические меры и
          настоятельно рекомендует болельщикам следовать указаниям стюардов.
          <br />
          До встречи на «Открытие Банк Арене»!
        </div>
      </DescriptionContainer>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-column: span 2;
  color: ${theme.colors.gray};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column: span 1;
  }
`;

const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  font-size: 0.94vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Title = styled.h6`
  margin: 0 0 2.08vw;
  font-weight: 700;
  font-size: 2.08vw;
  padding-right: 20.94vw;
  color: ${theme.colors.white};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
    font-size: 4.17vw;
    padding-right: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 4.27vw;
    font-size: 6.4vw;
  }
`;
