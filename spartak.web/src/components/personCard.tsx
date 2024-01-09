import React from "react";
import styled from "styled-components";
import { IBirthdayPeople } from "../api/dto/IBirthdayPeople";
import { getLocalValue } from "../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { theme } from "../assets/theme/theme";
import { formatDate } from "../assets/constants/date";
import { lang } from "../../public/locales/lang";
import { ICoach } from "../api/dto/ICoach";
import { IStaff } from "../api/dto/IStaff";
import { NextImage } from "../ui/nextImage/nextImage";
import { IPlayer } from "../api/dto/IPlayer";
import { LocaleType } from "../api/dto/LocaleType";
import { ILeadership } from "../api/dto/ILeadership";

export type PersonDataType = (IBirthdayPeople | ICoach | IStaff | IPlayer | ILeadership) & {
  Position?: LocaleType;
  PlayerNumber?: number;
};

interface IProps {
  data?: PersonDataType;
  showBirthday?: boolean;
  showPosition?: boolean;
  locationAcademy?: boolean;
}

export const PersonCard = ({ data, locationAcademy, showBirthday, showPosition }: IProps) => {
  const { locale = "ru", pathname } = useRouter();
  const splitInitials = getLocalValue(data?.FullName, locale).split(" ");
  return (
    <CardContainer locationAcademy={locationAcademy}>
      {data?.ImageUrl && (
        <PhotoBlock id="photoBlock">
          <PlayerPhotoContainer section={pathname.includes("academy") ? "academy" : "site"}>
            <NextImage src={data?.ImageUrl} objectFit="cover" />
          </PlayerPhotoContainer>
        </PhotoBlock>
      )}

      <InfoBlock locationAcademy={locationAcademy} id="infoBlock">
        <PersonalInfo>
          <NameAndFamily>
            <Name id="playerName">
              {splitInitials.length === 3 ? splitInitials[0] + " " + splitInitials[1] : splitInitials[0]}
            </Name>
            <Family id="playerFamily">{splitInitials[splitInitials.length === 3 ? 2 : 1]}</Family>
          </NameAndFamily>
          {!locationAcademy && data?.PlayerNumber && (
            <PlayerNumber id="playerFamily">{data?.PlayerNumber}</PlayerNumber>
          )}
        </PersonalInfo>

        <PositionAndBirthday>
          {getLocalValue(data?.Position, locale) && showPosition && (
            <Position locationAcademy={locationAcademy}>{getLocalValue(data?.Position, locale)}</Position>
          )}

          {data?.Birthday && showBirthday && (
            <Birthday locationAcademy={locationAcademy}>
              {lang[locale].more.graduateAcademy.birthday}: <LineBreak />
              {formatDate(data?.Birthday, "dd.MM.yyyy", locale)}
            </Birthday>
          )}
        </PositionAndBirthday>
      </InfoBlock>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ locationAcademy?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
  align-items: center;
  position: relative;
  width: 100%;
`;

const PhotoBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  &::after {
    background: ${({ theme }) => theme.gradients.none_playerRed};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    content: "";
  }
`;

const PlayerPhotoContainer = styled.div<{ section: string }>`
  width: 17.5vw;
  height: 20.26vw;
  margin-top: 2.76vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 29.72vw;
    height: 34.419vw;
    margin-top: 4.69vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 29.6vw;
    height: 34.13vw;
    margin-top: 4.27vw;
  }

  &::after {
    background: ${({ theme, section }) =>
      section === "academy" ? theme.gradients.player_academy : theme.gradients.player_none};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    content: "";
  }
`;

const InfoBlock = styled.div<{ locationAcademy?: boolean }>`
  text-align: ${({ locationAcademy }) => (locationAcademy ? "center" : "unset")};
  width: 100%;
`;

const PersonalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
  }
`;

const NameAndFamily = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 2.08vw 0 0;
  font-weight: 700;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.2vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.08vw 0 0.42vw;
  }
`;

const Name = styled.div`
  margin: 0;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    font-weight: normal;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const Family = styled.div`
  margin: 0;
  font-size: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const PlayerNumber = styled(NameAndFamily)`
  color: ${theme.colors.red};
  font-size: 3.65vw;
  text-align: right;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const PositionAndBirthday = styled.p<{ locationAcademy?: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 0;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  white-space: break-spaces;
  padding-bottom: 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 0.1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 3.2vw;
  }
`;

const Position = styled.span<{ locationAcademy?: boolean }>`
  padding: ${({ locationAcademy }) => (locationAcademy ? "0.42vw 0 0" : "0")};
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: ${({ locationAcademy }) => (locationAcademy ? "0.52vw 0 0" : "0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
  }
`;

const Birthday = styled.span<{ locationAcademy?: boolean }>`
  padding: ${({ locationAcademy }) => (locationAcademy ? "0.42vw 0 0" : "0")};
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: ${({ locationAcademy }) => (locationAcademy ? "0.52vw 0 0" : "0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
  }
`;
const LineBreak = styled.br`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;
