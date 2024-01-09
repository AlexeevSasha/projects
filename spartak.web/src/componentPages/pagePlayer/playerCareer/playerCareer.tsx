import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerScroll } from "../../../components/containers/containerHorizontalScroll";
import { PlayerBlockTitle } from "../playerBlockTitle";
import { IPlayerCareer } from "../../../api/dto/IPlayer";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { lang } from "../../../../public/locales/lang";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  career: IPlayerCareer[];
}

export const PlayerCareer = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const header = useMemo(
    () =>
      Object.values(lang[locale].player.career).map((elem, i) => (
        <TableHeadItem isSecond={i === 1} key={elem}>
          {elem}
        </TableHeadItem>
      )),
    []
  );

  const careerItems = useMemo(
    () =>
      props.career
        ?.sort((a, b) => a.Position - b.Position)
        .map((elem, index) => (
          <TableItem key={elem.Team?.Id + index}>
            <Years>{elem.Period}</Years>
            <Command>
              <Label>
                <NextImage src={elem.Team?.ImageUrl} alt={"Team image"} />
              </Label>
              <TeamName>{getLocalValue(elem.Team?.Name, locale)}</TeamName>
            </Command>
            <Count>{elem.Championship}</Count>
            <Count>{elem.Cup}</Count>
            <Count>{elem.EuroCup}</Count>
          </TableItem>
        )),
    [props.career]
  );

  return props.career?.length ? (
    <Container>
      <PlayerBlockTitle>{lang[locale].player.careerTitle}</PlayerBlockTitle>
      <HorizontalScroll showScroll>
        <TableItem head>{header}</TableItem>
        {careerItems}
      </HorizontalScroll>
    </Container>
  ) : (
    <></>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  gap: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const HorizontalScroll = styled(ContainerScroll)`
  flex-direction: column;
  width: inherit;
`;

const TableItem = styled.div<{ head?: boolean }>`
  width: inherit;
  align-items: center;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  background-color: ${({ head, theme }) => (head ? theme.colors.blackLight_red : theme.colors.black_white)};
  padding: ${({ head }) => (head ? "1.67vw 0" : "1.77vw 0")};
  border-bottom: ${({ head, theme }) => (head ? "none" : `1px solid ${theme.colors.grayDark_gray1}`)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: ${({ head }) => (head ? "4.17vw 0" : "3.91vw 0")};
    justify-content: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 135vw;
    grid-template-columns: 26.67vw 41.33vw 21.33vw 21.33vw 21.33vw;
    padding: ${({ head }) => (head ? "3.2vw 0" : "5.6vw 0")};
  }
`;

const TableHeadItem = styled.span<{ isSecond: boolean }>`
  text-transform: uppercase;
  text-align: ${({ isSecond }) => (isSecond ? "left" : "center")};
  padding-left: ${({ isSecond }) => (isSecond ? "5.3vw" : 0)};
  color: ${({ theme }) => theme.colors.gray_white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-left: 0;
    font-family: "FCSM Text", sans-serif;
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const Years = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.colors.grayDark_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    justify-content: start;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Command = styled.div`
  margin: 0;
  display: flex;
  gap: 2.08vw;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.56vw;
    justify-content: start;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;

const Label = styled.div`
  width: 3.33vw;
  height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8.53vw;
    height: 8.53vw;
  }
`;

const TeamName = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
