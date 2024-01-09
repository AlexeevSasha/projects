import { useRouter } from "next/router";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { useWindowSize } from "../../../../core/hooks/UseWindowSize";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { VotingDataType } from "../../interfaces/VotingT";
import { VotingTimer } from "../common/votingTimer";
import { langVoting } from "../lang/langVoting";

type Props = {
  voting: VotingDataType;
};

export const MonthVotingHeader = ({ voting }: Props) => {
  const { locale = "ru" } = useRouter();
  const { width = 1920 } = useWindowSize(true);
  const bannerSize = width > 767 ? (width > 1199 ? "L" : "M") : "S";

  return (
    <Container>
      <ContainerImage>
        <NextImage src={`/images/mvp/topBanner${bannerSize}_v1.0.1.png`} priority alt="баннер winline игрок месяца" />
      </ContainerImage>
      <Gradient />

      <TitleContainer>
        <Title>{langVoting[locale].monthModalHeader}</Title>
        <VotingTimer voting={voting} />
      </TitleContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 31.25vw;
  margin-bottom: 3.13vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 45.63vw;
    margin-bottom: 10.43vw; // Плюс значение за которое выступает TitleContainer из блока
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 80vw;
    margin-bottom: 39.89vw; // Плюс значение за которое выступает TitleContainer из блока
  }
`;

const ContainerImage = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Gradient = styled.div`
  background: ${theme.gradients.pastMatch};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

const TitleContainer = styled(ContainerContent)`
  margin-bottom: 2.08vw;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 0;
    /* transform: translate(-50%, 2.09vw); */
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.2vw;
    transform: translate(-50%, 55%);
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${theme.colors.white};
  font-weight: 700;
  font-size: 3.23vw;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;
