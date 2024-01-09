import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { NextImage } from "../../../ui/nextImage/nextImage";

type Props = {
  teamId?: string;
  tournamentId?: string;
  seasonId?: string;
};

export const PlayoffСap = ({ teamId, tournamentId, seasonId }: Props) => {
  const { locale = "ru", push } = useRouter();

  return (
    <Container>
      <ImgContainer><NextImage src="/images/main/presents/curus_v1.0.0.png" /></ImgContainer>

      <Title>{lang[locale].header.navList.standings}</Title>

      <Desc>{lang[locale].mainPage.poDesc}</Desc>

      <Button
        type="opacity"
        onClick={() => push(`/matches/standings?team=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}`)}
      >
        {lang[locale].mainPage.poBtn}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: ${theme.colors.white};
  margin: auto 0;
`;

const ImgContainer = styled.div`
  width: 7.6vw;
  height: 10.625vw;
`;

const Title = styled.h4`
  font-size: 1.66vw;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin: 1.25vw 0 0.83vw;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Desc = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
`;

const Button = styled(CustomButton)`
  color: ${theme.colors.red};
  border: 0;
  margin-top: 1.26vw;
`;
