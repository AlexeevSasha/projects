import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ITeam } from "../../../api/dto/ITeam";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

type Props = {
  teams: ITeam[];
};

export const TeamsList = ({ teams }: Props) => {
  const { push, locale = "ru" } = useRouter();

  return (
    <Content>
      {teams
        .filter(({ Players }) => !!Players?.length)
        .map((team) => (
          <Team key={team.Id} onClick={() => push(`/academy/teams/${team.Id}`)}>
            <ImgContainer>
              <NextImage src={team.TeamImageUrl} objectFit="cover" />
            </ImgContainer>

            <NameWrapper>
              <div>{getLocalValue(team.ShortName, locale)}</div>

              <Arrow>
                <IconArrowRight />
              </Arrow>
            </NameWrapper>
          </Team>
        ))}
    </Content>
  );
};

const Content = styled.div`
  font-family: "FCSM Text", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25vw;
  padding: 4.17vw 8.75vw 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.13vw;
    padding: 5.22vw 3.13vw 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-gap: 4.27vw;
    padding: 10.67vw 4.27vw;
  }
`;

const Team = styled.div`
  width: 26.67vw;
  height: 10.67vw;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.02, 1.02);
    transition: all 0.2s ease-in-out;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
    height: 18vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    height: 35vw;
  }
`;

const ImgContainer = styled.div`
  height: 8.28vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 14vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 29vw;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    background: ${({ theme }) => theme.gradients.player_none};
    height: 8.28vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 14vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 29vw;
    }
  }
`;

const NameWrapper = styled.div`
  margin-top: 0.625vw;
  display: flex;
  justify-content: space-between;
  font-size: 1.25vw;
  color: ${(props) => props.theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Arrow = styled.div`
  display: flex;
  align-items: flex-end;

  svg path {
    stroke: ${(props) => props.theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;
