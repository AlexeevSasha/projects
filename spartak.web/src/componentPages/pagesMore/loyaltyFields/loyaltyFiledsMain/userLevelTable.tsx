import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import { MinusIcon } from "../../../../assets/icon/minus";
import check from "../../../../assets/icon/sokolniki/selectStadium/ckeck.svg";
import { theme } from "../../../../assets/theme/theme";

type Props = LoyaltyMainDataType["userLevels"];

export const UserLevelTable = ({ headerItems, rows }: Props) => {
  return (
    <Container>
      <Row>
        <Cell dangerouslySetInnerHTML={{ __html: headerItems[0]?.title }} />
        <Cell dangerouslySetInnerHTML={{ __html: headerItems[1]?.title }} />
        <Cell dangerouslySetInnerHTML={{ __html: headerItems[2]?.title }} />
        <Cell dangerouslySetInnerHTML={{ __html: headerItems[3]?.title }} />
        <Cell dangerouslySetInnerHTML={{ __html: headerItems[4]?.title }} />
      </Row>

      {rows.map((row, i) => (
        <Row key={i}>
          {row.value.map((val: string | true | false, index) =>
            val === true ? (
              <Cell key={`Cell${index}`}>
                <ImgContainer>
                  <Image src={check} alt={"checked"} layout={"fill"} />
                </ImgContainer>
              </Cell>
            ) : val === false ? (
              <Cell key={`Cell${index}`}>
                <MinusIcon color={theme.colors.grayDark} />
              </Cell>
            ) : (
              <Cell key={`Cell${index}`}>{val} </Cell>
            )
          )}
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0.52vw;
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 0.8vw;
    margin-bottom: 10.67vw;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.21vw;
  grid-auto-rows: auto;

  & div {
    background: ${({ theme }) => theme.colors.black_whiteGray};
    border: 1px solid ${({ theme }) => theme.colors.blackLight_whiteGray};
  }

  &:nth-child(1) div {
    background: ${({ theme }) => theme.colors.blackLight_grayDark1};
    height: 100%;
    flex-direction: column;
    border: none;
  }

  &:nth-child(2) div {
    color: ${({ theme }) => theme.colors.redLightest_black};
  }

  &:nth-child(3) div {
    color: ${({ theme }) => theme.colors.redLight_grayDark1};
  }

  &:nth-child(4) div {
    color: ${theme.colors.brinkPink};
  }

  &:nth-child(5) div {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 0.91vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 0.8vw;
    grid-template-columns: 16.53vw 22.13vw 16.53vw 16.53vw 16.53vw;
  }
`;

const Cell = styled.div`
  padding: 0.83vw 0;
  box-sizing: border-box;
  color: ${theme.colors.white};
  display: flex;
  position: relative;
  justify-content: center;
  align-self: center;
  font-weight: 700;
  font-size: 0.83vw;
  line-height: 1.15vw;
  text-transform: uppercase;
  text-align: center;

  & svg {
    width: 1.25vw;
    height: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 2.87vw;
      width: 2.87vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 3.73vw;
      height: 3.73vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.3vw 0.39vw;
    font-size: 2.09vw;
    line-height: 2.87vw;
    word-break: break-all;
    white-space: pre-wrap;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.93vw 0.27vw;
    font-size: 3.2vw;
    line-height: 3.73vw;
  }
`;

const ImgContainer = styled.div`
  width: 1.25vw;
  position: relative;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 2.87vw;
    width: 2.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 3.73vw;
    height: 3.73vw;
  }
`;
