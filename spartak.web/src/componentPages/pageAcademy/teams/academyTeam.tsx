import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IAmplua } from "../../../api/dto/IAmplua";
import { ICoach } from "../../../api/dto/ICoach";
import { IPlayer } from "../../../api/dto/IPlayer";
import { ITeam } from "../../../api/dto/ITeam";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { NoData } from "../../../components/noData/noData";
import { TeamLineUp } from "./teamLineUp";

export type AcademyTeamProps = {
  team: ITeam | null;
  players: IPlayer[];
  amplua: IAmplua[];
  coaches?: ICoach[];
};

export const AcademyTeam = ({ team, players, amplua, coaches }: AcademyTeamProps) => {
  const { locale = "ru", push } = useRouter();

  return (
    <>
      <StyledContainer
        gradient={theme.gradients.first}
        position={"center"}
        src={team?.TeamImageUrl || "/images/academy/banners/aboutAcademy_v1.0.0.png"}
      >
        <TitleWrapper>
          <Title>{getLocalValue(team?.FullName, locale)}</Title>
        </TitleWrapper>
      </StyledContainer>

      <Button type="opacity" withGap onClick={() => push("/academy/teams")}>
        <IconArrowRight rotate="180deg" />
        {lang[locale].academy.allTeams}
      </Button>

      {amplua?.length && (players.length || coaches?.length) ? (
        <TeamLineUp players={players} coaches={coaches} amplua={amplua} />
      ) : (
        <NoData />
      )}
    </>
  );
};

const StyledContainer = styled(ContainerWithBackgroundImg)`
  &::after {
    bottom: 0;
  }
`;

const TitleWrapper = styled.div`
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.white};
  font-weight: 700;
  margin-left: 8.75vw;
  z-index: 1;
  height: 31.25vw;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-left: 3.13vw;
    height: 43.93vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: 4.26vw;
    height: 80vw;
  }
`;

const Title = styled.h1`
  font-size: 4.58vw;
  padding-bottom: 4.166vw;
  margin: 0;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9vw;
    padding-bottom: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding-top: 47vw;
  }
`;

const Button = styled(CustomButton)`
  width: fit-content;
  margin: 2.08vw 0 1vw 8.75vw;
  padding-top: 0;
  padding-bottom: 0;
  height: 2.08vw;
  box-sizing: border-box;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_grayDark1};
    }
  }
  border: 1px solid ${({ theme }) => theme.colors.grayLight_opacity};
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  background-color: ${({ theme }) => theme.colors.black_whiteGray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.215vw auto 2vw 3.13vw;
    height: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw auto 0 4.26vw;
    height: 8.53vw;
  }
`;
