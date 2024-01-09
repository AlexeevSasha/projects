import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { ICoach } from "../../api/dto/ICoach";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  coach: ICoach;
}

export const CoachCard = ({ coach }: IProps) => {
  const { locale } = useRouter();
  const [name, surname] = useMemo(() => getLocalValue(coach?.FullName, locale).split(" "), [coach]);

  return (
    <CoachesCard>
      <ImageBlock>
        <CoachPhotoContainer>
          <NextImage src={coach?.ImageUrl} alt={name + " " + surname} />
        </CoachPhotoContainer>
      </ImageBlock>

      <NameBlock>
        <Name>{name}</Name>
        <Surname>{surname}</Surname>
        <Position>{getLocalValue(coach.Position, locale)}</Position>
      </NameBlock>
    </CoachesCard>
  );
};

const CoachesCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 26.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 44.53vw;
  }
`;

const ImageBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  :before {
    background: linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0d1116 100%);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    position: absolute;
    content: " ";
  }
`;

const CoachPhotoContainer = styled.div`
  height: 20.26vw;
  padding-top: 2.81vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 34.42vw;
    padding-top: 4.69vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 34.13vw;
    padding-top: 4.27vw;
  }
`;

const NameBlock = styled.div`
  color: ${theme.colors.white};
  padding-left: 2.08vw;
  margin-top: 2.29vw;
  padding-bottom: 1.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-left: 1.56vw;
    margin-top: 2.22vw;
    padding-bottom: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-left: 0.27vw;
    margin-top: 2.93vw;
    padding-bottom: 5.33vw;
  }
`;

const Name = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.25vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const Surname = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Position = styled.div`
  font-size: 0.94vw;
  color: ${theme.colors.gray};
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
