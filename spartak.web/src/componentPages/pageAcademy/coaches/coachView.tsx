import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ICoach } from "../../../api/dto/ICoach";
import { formatDate } from "../../../assets/constants/date";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CoachName } from "./coachName";

type Props = {
  coach: ICoach;
};

export const CoachView = ({ coach }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <div>
        <CoachName name={coach.FullName} />

        <InfoTablet>
          <InfoBlock>
            <InfoTitle>{lang[locale].academy.coachPosition}</InfoTitle>
            <InfoData>{getLocalValue(coach.Position, locale)}</InfoData>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle>{lang[locale].academy.coachBirthDay}</InfoTitle>
            <InfoData>{formatDate(coach.Birthday, "dd MMMM yyyy", locale)}</InfoData>
          </InfoBlock>
        </InfoTablet>
      </div>

      <ImageBlock>{coach.ImageUrl && <NextImage src={coach.ImageUrl} />}</ImageBlock>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  margin-top: 2.08vw;
  align-items: flex-start;
  & > div:nth-child(2) {
    margin: 0 auto;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    flex-direction: column-reverse;

    & > div:nth-child(2) {
      height: 87.48vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.26vw;
  }

  & > div {
    width: 33.64vw;
    // height: 41.45vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: auto;
      width: 100%;
    }
  }
`;

const InfoTablet = styled.div`
  box-sizing: border-box;
  border: 0.05vw solid ${({ theme }) => theme.colors.white_gray1};
  margin-top: 6.77vw;

  > :first-child {
    background-color: ${({ theme }) => theme.colors.blackRed_whiteGray};
    border-bottom: 0.05vw solid ${({ theme }) => theme.colors.white_gray1};
  }
`;

const InfoBlock = styled.p`
  background: ${({ theme }) => theme.colors.black_white};
  margin: 0;
  display: grid;
  width: 100%;
  box-sizing: border-box;
  padding: 1.67vw 1.25vw;
  gap: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 4.17vw;
    gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw 4.27vw;
    gap: 2.13vw;
  }
`;

const InfoTitle = styled.span`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const InfoData = styled.span`
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
const ImageBlock = styled.div`
  height: 41.45vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: auto;
    width: 100%;
  }
`;
