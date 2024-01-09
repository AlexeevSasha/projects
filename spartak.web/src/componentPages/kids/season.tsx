import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ComicEntity } from "../../api/dto/kids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { ComicCard } from "./comicCard";

export type SeasonProps = {
  comics: ComicEntity[];
};

export const Season = ({ comics }: SeasonProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{getLocalValue(comics?.[0]?.ComicSeasonName, locale)}</Title>

      <Grid>
        {comics?.map((comic) => (
          <ComicCard key={comic.Id} comic={comic} />
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  font-family: "FCSM Text";
  display: block;
  margin-bottom: 6.25vw;
`;

const Grid = styled.div`
  color: ${theme.colors.white};
  display: grid;
  grid: auto / repeat(4, 1fr);
  row-gap: 4.166vw;
  column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid: auto / repeat(2, 1fr);
    row-gap: 10.43vw;
    column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 10.66vw;
    column-gap: 3.2vw;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  margin: 2.08vw 0;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.215vw 0;
    font-size: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0 10.66vw;
    font-size: 8.53vw;
  }
`;
