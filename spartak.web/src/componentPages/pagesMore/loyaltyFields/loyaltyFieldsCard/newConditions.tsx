import Image from "next/image";
import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { LoyaltyCardDataType } from "../../../../../pages/more/loyalty/card";
import getCard from "../../../../assets/images/loyalty/getCard.svg";
import newCardConditionsBlack from "../../../../assets/images/loyalty/newCardConditionsBlack.png";
import newCardConditionsWhite from "../../../../assets/images/loyalty/newCardConditionsWhite.png";
import { theme } from "../../../../assets/theme/theme";
import { TextWithRedPoint } from "../../../../components/textWithRedPoint/textWithRedPoint";
import { ThemeContext } from "../../../../core/themeProvider";

type IProps = LoyaltyCardDataType["newConditions"];

export const NewConditions = (props: IProps) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Container>
      <LeftContainer>
        <Title>{props.title}</Title>
        <P>{props.text1}</P>
        <P>{props.text2}</P>

        <RedtextContainer>
          {props.list.map((item, i) => (
            <Fragment key={i}>
              <TextWithRedPoint>
                <Text>{item.text}</Text>
              </TextWithRedPoint>
              {item.label && <p>{item.label}</p>}
            </Fragment>
          ))}
        </RedtextContainer>

        <Button onClick={() => window.open(props.buttonLink, "_blank")}>
          <Image src={getCard} alt={"get card"} layout={"responsive"} /> {props.buttonText}
        </Button>
      </LeftContainer>

      <ImgComtainer>
        <Image
          src={isDarkTheme ? newCardConditionsBlack.src : newCardConditionsWhite.src}
          alt={"new card conditions"}
          layout={"fill"}
        />
      </ImgComtainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-top: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw 0 0;
    grid-template-columns: 1fr;
    grid-row-gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw 0 0;
    grid-row-gap: 10.67vw;
  }
`;

const ImgComtainer = styled.div`
  width: 29.58vw;
  height: 24.06vw;
  position: relative;
  margin-top: 3.854vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row: 1;
    width: 55.28vw;
    margin: 0 auto;
    height: 44.98vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 58.93vw;
    height: 48vw;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h6`
  font-weight: 700;
  font-size: 2.08vw;
  line-height: 2.6vw;
  margin: 0 0 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
    margin: 0 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    line-height: 11.2vw;
    margin: 0 0 6.4vw;
  }
`;

const P = styled.p`
  margin: 0 0 1.25vw;
  font-size: 0.94vw;
  line-height: 1.46vw;
  letter-spacing: 0.01vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
    font-size: 2.35vw;
    line-height: 3.65vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;

const RedtextContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 1.41vw;

  & > div:nth-last-child(1),
  & > div:nth-child(1) {
    margin: 0;
  }

  & > div > div:nth-last-child(1) {
    margin: auto 0;
  }

  & > div {
    margin: 0;
    font-size: 1.25vw;
    line-height: 1.77vw;
    letter-spacing: 0.01vw;
    align-items: baseline;
    font-weight: 500;
  }

  & > p {
    margin: 0;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 0.94vw;
    line-height: 1.25vw;
    letter-spacing: 0.01vw;
    color: ${({ theme }) => theme.colors.gray_grayDark};
    padding-left: 2.7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;

    & > div {
      font-size: 3.13vw;
      line-height: 4.43vw;
    }

    & > p {
      font-size: 2.35vw;
      line-height: 3.13vw;
      padding-left: 6.4vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;

    & > div {
      font-size: 4.8vw;
      line-height: 7.47vw;
    }

    & > p {
      font-size: 4.8vw;
      line-height: 6.4vw;
      padding-left: 9.6vw;
    }
  }
`;

const Text = styled.div`
  margin: 0;
`;

const Button = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 2.24vw auto;
  align-items: center;
  background: ${theme.colors.bondiBlue};
  padding: 0.83vw 1.67vw;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.67vw;
  text-transform: uppercase;
  color: ${theme.colors.white};
  width: fit-content;
  grid-column-gap: 0.63vw;
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 1.56vw;
    margin-top: 5.22vw;
    padding: 2.09vw 4.17vw;
    font-size: 3.13vw;
    line-height: 4.17vw;
    grid-template-columns: 5.61vw auto;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 3.2vw;
    margin-top: 10.67vw;
    padding: 4.27vw 7.2vw;
    font-size: 6vw;
    line-height: 8.53vw;
    grid-template-columns: 11.47vw 1fr;
  }
`;
