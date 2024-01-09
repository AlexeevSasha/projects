import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IMatchDto } from "../../api/dto/IMatchDto";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { NextLink } from "../nextLink/nextLink";

interface IProps {
  size: "lg" | "md" | "sm";
  cardSize?: string;
  withButton?: boolean;
  coefficient?: IMatchDto["Coefficient"];
  ownTeamIsHome?: boolean;
}

export const CoefficientWinline = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.coefficient && Object.keys(props.coefficient).length > 0 ? (
    <Container>
      <NextLink url={`${props.coefficient?.EventUrl + "?utm_source=fcspartak&utm_medium=odds&utm_content=odds"}`}>
        <ContainerCoefficient cardSize={props.cardSize}>
          <CoefficientBlock>
            <ImgContainer size={props.size}>
              <NextImage src="/images/icon/iconWinline_v1.0.1.svg" alt="Коэффициенты ставок winline" />
            </ImgContainer>
          </CoefficientBlock>

          <CoefficientBlock>
            <Coefficient type={props.ownTeamIsHome ? "orange" : "white"} size={props.size}>
              {props.coefficient?.HomeWin?.toFixed(2)}
            </Coefficient>
            <CoefficientName size={props.size}>{lang[locale].coefficients.winFirst}</CoefficientName>
          </CoefficientBlock>

          <CoefficientBlock>
            <Coefficient type="white" size={props.size}>
              {props.coefficient?.Neutral?.toFixed(2)}
            </Coefficient>
            <CoefficientName size={props.size}>х</CoefficientName>
          </CoefficientBlock>

          <CoefficientBlock>
            <Coefficient type={!props.ownTeamIsHome ? "orange" : "white"} size={props.size}>
              {props.coefficient?.GuestWin.toFixed(2)}
            </Coefficient>

            <CoefficientName size={props.size}>{lang[locale].coefficients.winSecond}</CoefficientName>
          </CoefficientBlock>
        </ContainerCoefficient>
      </NextLink>

      {props.withButton ? (
        <NextLink url={props.coefficient?.EventUrl + "?utm_source=fcspartak&utm_medium=odds&utm_content=odds"}>
          <StyledButton> {lang[locale].coefficients.makeBet}</StyledButton>
        </NextLink>
      ) : null}
    </Container>
  ) : (
    <div />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  justify-content: end;
  flex: 1;
  a {
    text-decoration: none;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 1.07vw;
  }
`;

const ContainerCoefficient = styled.div<{ cardSize?: string }>`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: ${({ cardSize }) => (cardSize === "big" ? "0.83vw" : "0.42vw")};
  font-family: ${theme.font.winline};
  margin-bottom: 0.57vw;
  align-items: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 1.04vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 2.13vw;
    margin-bottom: 4.27vw;
  }
`;

const CoefficientBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgContainer = styled.div<{ size: "lg" | "md" | "sm" }>`
  ${(props) => {
    switch (props.size) {
      case "lg": {
        return css`
          width: 6.77vw;
          height: 1.67vw;
        `;
      }
      case "md": {
        return css``;
      }
      case "sm": {
        return css`
          width: 4.22vw;
          height: 1.04vw;
        `;
      }
      default: {
        return css`
          width: 4.22vw;
          height: 1.04vw;
        `;
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 10.56vw;
    height: 2.67vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 21.6vw;
    height: 5.33vw;
  }
`;

const Coefficient = styled.div<{ type: "orange" | "white"; size: "lg" | "md" | "sm" }>`
  border-radius: 0.42vw;
  font-weight: 500;

  ${(props) => {
    switch (props.type) {
      case "white": {
        return css`
          background: ${props.theme.colors.white_gray1};
          color: ${theme.colors.black};
        `;
      }
      case "orange": {
        return css`
          background: ${theme.colors.win1};
          color: ${theme.colors.white};
        `;
      }
    }
  }};

  ${(props) => {
    switch (props.size) {
      case "lg": {
        return css`
          font-size: 0.89vw;
          padding: 0.26vw 0.73vw;
        `;
      }
      case "md": {
        return css`
          font-size: 0.89vw;
        `;
      }
      case "sm": {
        return css`
          font-size: 0.73vw;
          padding: 0.11vw 0.7vw;
        `;
      }
      default: {
        return css`
          font-size: 0.73vw;
          padding: 0.11vw 0.7vw;
        `;
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 0.27vw 1.83vw;
    border-radius: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 0.54vw 3.73vw;
    border-radius: 2.13vw;
  }
`;

const CoefficientName = styled.span<{ size: "lg" | "md" | "sm" }>`
  display: flex;
  justify-content: center;
  font-size: 0.47vw;
  color: ${theme.colors.gray};
  text-transform: uppercase;
  padding-top: 0.1vw;
  ${(props) => {
    switch (props.size) {
      case "lg": {
        return css`
          font-size: 0.73vw;
        `;
      }
      case "md": {
        return css``;
      }
      case "sm": {
        return css`
          font-size: 0.47vw;
        `;
      }
      default: {
        return css`
          font-size: 0.47vw;
        `;
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.4vw;
  }
`;

const StyledButton = styled.div`
  background: ${theme.colors.win1};
  color: ${theme.colors.white};
  padding: 0.31vw 1.56vw;
  border-radius: 0.42vw;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.73vw;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 0.78vw 3.91vw;
    border-radius: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 1.6vw 8vw;
    border-radius: 2.13vw;
  }
`;
