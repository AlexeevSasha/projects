import React from "react";
import styled from "styled-components";
import { CustomButton } from "../../../components/buttons/customButton";
import { theme } from "../../../assets/theme/theme";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";

interface IProps {
  arrayOfYears?: string[];
  onRight: () => void;
  onLeft: () => void;
  onAddActive: (index: number) => void;
  active: number;
  linePosition: number;
}

export const HorizontalTimeline = (props: IProps) => {
  return (
    <Container>
      <ArrowsBlock>
        <ArrowButton onClick={props.onLeft} type={"opacity"}>
          <IconArrowRight rotate={"180deg"} />
        </ArrowButton>
        <ArrowButton onClick={props.onRight} type={"opacity"}>
          <IconArrowRight />
        </ArrowButton>
      </ArrowsBlock>
      <Line size={props.arrayOfYears?.length || 0}>
        {props.arrayOfYears?.map((elem, index) => (
          <ScaleBlock key={index} onClick={() => props.onAddActive(index)} linePosition={index + props.linePosition}>
            <YearBlock active={props.active === index} id={props.active === +elem ? "active" : `nonActive${elem}`}>
              <Year active={props.active === index}>{elem}</Year>
            </YearBlock>
            <Point active={props.active === index} />
          </ScaleBlock>
        ))}
      </Line>
    </Container>
  );
};

const Container = styled.article`
  overflow: hidden;
  padding: 0 0 4.17vw 0;
  color: ${(props) => props.theme.colors.white_black};
  margin-left: auto;
  margin-right: auto;
  width: 82.5vw;
  margin-top: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 0 5.22vw 0;
    width: 100%;
    margin-top: 11.99vw;
    overflow: visible;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 0 6.4vw 0;
    margin-top: 14.93vw;
  }
`;

const ArrowsBlock = styled.section`
  display: flex;
  justify-content: right;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const ArrowButton = styled(CustomButton)`
  padding: 1.2vw;
  border-color: ${({ theme }) => theme.colors.grayLight_grayDark1};
`;

const Line = styled.section<{ size: number }>`
  width: ${({ size }) => (size * 6.41 > 93 ? size * 6.41 + "vw" : "93vw")};
  position: relative;
  background: ${theme.colors.gray};
  height: 0.05vw;
  margin-top: 6.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: ${({ size }) => (size * 16.04 > 100 ? size * 16.04 + "vw" : "99.7vw")};
    height: 0.13vw;
    margin-top: 12vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: ${({ size }) => (size * 32.8 > 100 ? size * 32.8 + "vw" : "100vw")};
    height: 0.27vw;
    margin-top: 20vw;
  }
`;

const ScaleBlock = styled.div<{ linePosition: number }>`
  display: grid;
  justify-items: center;
  position: absolute;
  bottom: -0.21vw;
  left: ${(props) => props.linePosition * 7.41 + "vw"};
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    bottom: -0.52vw;
    left: ${(props) => props.linePosition * 16.04 + "vw"};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    bottom: -1.07vw;
    left: ${(props) => props.linePosition * 32.8 + "vw"};
  }
`;

const YearBlock = styled.p<{ active?: boolean }>`
  width: 6.41vw;
  height: ${(props) => (props.active ? "3.85vw" : "1.77vw")};
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.active ? "center" : "end")};
  background-color: ${(props) => (props.active ? `${theme.colors.red}` : "none")};
  color: ${(props) => (props.active ? `${theme.colors.white}` : "unset")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 16.04vw;
    height: ${(props) => (props.active ? "9.65vw" : "4.43vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 27.47vw;
    height: ${(props) => (props.active ? "17.6vw" : "9.07vw")};
  }
`;

const Year = styled.span<{ active?: boolean }>`
  font-size: ${(props) => (props.active ? "2.08vw" : "1.25vw")};
  font-weight: ${(props) => (props.active ? "700" : "500")};
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${(props) => (props.active ? "5.22vw" : "3.13vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: ${(props) => (props.active ? "8.53vw" : "6.4vw")};
  }
`;

const Point = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? `${theme.colors.red}` : `${theme.colors.gray}`)};
  height: 0.42vw;
  width: 0.42vw;
  border-radius: 0.52vw;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 1.04vw;
    width: 1.04vw;
    border-radius: 1.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 2.13vw;
    width: 2.13vw;
    border-radius: 2.67vw;
  }
`;
