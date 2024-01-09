import { useRouter } from "next/router";
import styled from "styled-components";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import { theme } from "../../../../assets/theme/theme";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { VotingSectionTitle } from "../common/votingSectionTitle";
import { langVoting } from "../lang/langVoting";
import { useWindowSize } from "../../../../core/hooks/UseWindowSize";

export const SeasonVotingBanner = () => {
  const { width = 1920 } = useWindowSize(true);
  const { locale = "ru" } = useRouter();
  const bannerSize = width > 767 ? (width > 1199 ? "L" : "M") : "S";

  return (
    <Container>
      <VotingSectionTitle>{langVoting[locale].season.presentTheAward.title}</VotingSectionTitle>
      <List>
        {langVoting[locale].season.presentTheAward.list.map((elem, i) => (
          <li key={i}>
            <IconRedPoint ts={"5.22vw"} ms={"10.67vw"} /> {elem}
          </li>
        ))}
      </List>
      <ContainerImage>
        <NextImage
          src={`/images/mvp/presentBanner${bannerSize}_v1.0.1.png`}
          alt="голосование за игрока месяца winline"
          quality={100}
        />
      </ContainerImage>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 27.45vw;
  width: 100%;
  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 48.11vw;
    margin-bottom: 8.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: auto;
    margin-bottom: 10.67vw;
  }
`;

const ContainerImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    bottom: 0;
    height: 34.42vw;
    top: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    position: relative;
    height: 58.13vw;
    margin-top: 4.27vw;
  }
`;

const List = styled.ul`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  font-size: 0.94vw;
  padding: 0;
  margin: 0;
  width: 50%;
  display: grid;
  grid-row-gap: 0.63vw;
  /* font-weight: 500; */

  li {
    list-style: none;
    display: grid;
    grid-template-columns: 2.08vw 1fr;
    grid-column-gap: 1.25vw;
    align-items: center;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    grid-row-gap: 1.56vw;
    width: 66%;

    li {
      grid-template-columns: 5.22vw 1fr;
      grid-column-gap: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    grid-row-gap: 2.13vw;
    width: 100%;

    li {
      grid-template-columns: 10.67vw 1fr;
      grid-column-gap: 3.2vw;
    }
  }
`;
