import styled from "styled-components";
import React, { useMemo } from "react";
import { theme } from "../../../../assets/theme/theme";
import { IconHouse } from "../../../../assets/icon/iconHouse";
import { checkImgFunk } from "../../../../helpers/checkImgFunk";
import { IMatchDto } from "../../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconAirplane } from "../../../../assets/icon/iconAirplane";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface IProps {
  id: string;
  eventData: IMatchDto;
  typeMatch: "old" | "new";
  teamId?: string;
}

export const ColumnClub = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  const renderIcon = useMemo(() => {
    return (
      <IconContainer>
        {props.eventData?.HomeTeam?.Id === props.teamId ? (
          <IconHouse color={theme.colors.gray} />
        ) : (
          <IconAirplane color={theme.colors.gray} />
        )}
      </IconContainer>
    );
  }, [props.eventData?.HomeTeam?.Id, props.teamId]);

  const logo = useMemo(
    () =>
      props.eventData?.HomeTeam?.Id === props.teamId
        ? props.eventData?.GuestTeam?.Logo
        : props.eventData?.HomeTeam?.Logo,
    [props.teamId, props.eventData]
  );

  return (
    <Link prefetch={false} href={`/matches/${props.id}/broadcast`} passHref>
      <Container old={props.typeMatch === "old"}>
        <ContainerImage>
          {logo && checkImgFunk(logo) ? <NextImage src={logo} alt={props.id} /> : <ImgPlug />}
        </ContainerImage>

        <TextContainer old={props.typeMatch === "old"}>
          {props.typeMatch === "new" ? (
            <>
              <HomeTeam highlight>
                {props.eventData?.HomeTeam?.Id === props.teamId
                  ? getLocalValue(props.eventData?.GuestTeam?.Name, locale)
                  : getLocalValue(props.eventData?.HomeTeam?.Name, locale)}
              </HomeTeam>
              <Arena>{getLocalValue(props.eventData?.Stadium, locale)}</Arena>
            </>
          ) : (
            <>
              <HomeTeam highlight={props.eventData?.Scores?.Home >= props.eventData?.Scores?.Guest}>
                {getLocalValue(props.eventData.HomeTeam.Name, locale)}
              </HomeTeam>

              <GuestTeam highlight={props.eventData?.Scores?.Home <= props.eventData?.Scores?.Guest}>
                {getLocalValue(props.eventData?.GuestTeam?.Name, locale)}
              </GuestTeam>
            </>
          )}
        </TextContainer>

        {props.typeMatch === "new" ? <IconContainer>{renderIcon}</IconContainer> : null}
      </Container>
    </Link>
  );
};

const HomeTeam = styled.p<{ highlight?: boolean }>`
  margin: 0;
  color: ${(props) => (props.highlight ? props.theme.colors.white_black : props.theme.colors.gray_grayDark1)};
  font-size: 1.25vw;
  transition: color 0.1s ease-in-out;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const GuestTeam = styled(HomeTeam)``;
const Arena = styled(HomeTeam)`
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ContainerImage = styled.div`
  width: 3.49vw;
  height: 3.49vw;
  margin-right: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 8.74vw;
    height: 8.74vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 14.93vw;
    height: 14.93vw;
  }
`;

const Container = styled.div<{ old: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: ${({ old }) => (old ? "auto" : "100%")};
  }
`;

const ImgPlug = styled.div`
  width: 3.49vw;
  height: 3.49vw;
  margin-right: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 8.74vw;
    height: 8.74vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 12.53vw;
    height: 12.53vw;
  }
`;

const TextContainer = styled.div<{ old: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0.42vw;
  font-family: "FCSM Text", sans-serif;
`;

const IconContainer = styled.div`
  display: none;
  svg {
    path {
      stroke: ${({ theme }) => theme.colors.gray_grayDark1};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    margin-left: 4.69vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: auto;
  }
`;
