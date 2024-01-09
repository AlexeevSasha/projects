import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IPlayer } from "../../api/dto/IPlayer";
import { LocaleType } from "../../api/dto/LocaleType";
import { formatDate } from "../../assets/constants/date";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IconTshirt } from "../../assets/icon/iconTshirt";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { ContainerContent } from "../../components/containers/containerContent";
import { NextImage } from "../../ui/nextImage/nextImage";
import { BestPlayer } from "./bestPlayer";
import { ThemeContext } from "../../core/themeProvider";

interface IProps {
  player: IPlayer;
  amplua: LocaleType;
}

export const PlayerPersonalData = (props: IProps) => {
  const { locale = "ru", push } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const name = getLocalValue(props.player?.FullName, locale).split(" ");

  const playerData = useCallback(
    (title: string, value?: string | number) => (
      <InfoBlock>
        <InfoTitle>{title}</InfoTitle>
        <InfoData>{value}</InfoData>
      </InfoBlock>
    ),
    [props.player]
  );

  return props.player ? (
    <Container>
      <PlayerInfo>
        <FullNameAndNumberBlock>
          <Number>{props.player?.PlayerNumber}</Number>

          {name.length > 1 ? (
            <FullNameBlock>
              <Name>{name[0]}</Name>
              <SurName>{name[1]}</SurName>
            </FullNameBlock>
          ) : (
            <SurName>{name[0]}</SurName>
          )}
        </FullNameAndNumberBlock>

        <InfoTablet isDarkTheme={isDarkTheme}>
          {playerData(lang[locale].player.amplua, getLocalValue(props.amplua, locale))}
          {playerData(
            lang[locale].player.weight,
            props.player?.Weight ? `${props.player?.Weight} ${locale === "ru" ? "кг" : "kg"}` : ""
          )}
          {playerData(lang[locale].player.birthday, formatDate(props.player?.Birthday, "dd MMMM, yyyy", locale))}
          {playerData(
            lang[locale].player.growth,
            props.player?.Height ? `${props.player?.Height} ${locale === "ru" ? "см" : "cm"}` : ""
          )}
        </InfoTablet>
      </PlayerInfo>

      <PlayerPhotoBlock>
        <Gradient />

        <TShirtBtn
          type={"red"}
          onClick={() =>
            push(
              `${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/catalog/sezon-2022-23/${
                props.player.Amplua.Id === "ced91207-9526-458d-8492-e65ba04d91ae"
                  ? "futbolka-vratarskaya-dl-rukav-sezon-2022-2023-399-dj7242/"
                  : "domashnyaya-igrovaya-dzhersi-sezona-2022-2023-krasnyy-dj7286_1/"
              }`
            )
          }
        >
          <IconTshirt />
          <span>{lang[locale].player.buyShirt}</span>
        </TShirtBtn>

        {props.player.MvpVotings?.length > 0 && <BestPlayer votings={props.player.MvpVotings} />}

        <PlayerPhoto>
          <NextImage src={props.player?.ImageUrl} alt={name[0]} objectFit="cover" />
        </PlayerPhoto>
      </PlayerPhotoBlock>
    </Container>
  ) : null;
};

const Container = styled(ContainerContent)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4.38vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column-reverse;
    align-items: center;
    position: relative;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 12.8vw;
  }
`;

const PlayerInfo = styled.section`
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 9.38vw;
  padding-top: 11.88vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 4.56vw;
    padding-top: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 6.4vw;
  }
`;

const FullNameAndNumberBlock = styled.div`
  align-items: center;
  margin: 0;
  display: flex;
  gap: 2.6vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: -15.5vw;
    gap: 5.22vw;
    z-index: 2;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 2.13vw 0;
    gap: 4.27vw;
  }
`;

const Number = styled.h3`
  margin: 0;
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 7.81vw;
  line-height: 6.77vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 13.04vw;
    line-height: 11.73vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 13.87vw;
    line-height: 17.07vw;
  }
`;

const FullNameBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 2.08vw;
  line-height: 2.6vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    line-height: 4.8vw;
    font-weight: 600;
  }
`;

const SurName = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 3.75vw;
  line-height: 4.69vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    line-height: 8.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    line-height: 11.2vw;
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
    font-weight: 500;
    font-size: 3.2vw;
    line-height: 3.73vw;
  }
`;

const InfoData = styled.span`
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  line-height: 2.6vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
    line-height: 9.07vw;
  }
`;
const InfoTablet = styled.div<{ isDarkTheme?: boolean }>`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border: ${({ theme }) => `0.05vw solid ${theme.colors.white_gray1}`};
  grid-gap: 0.05vw;
  background-color: ${({ theme }) => theme.colors.white_gray1};

  > :first-child {
    background-color: ${({ theme }) => theme.colors.blackRed_red};
    span:nth-of-type(1) {
      color: ${theme.colors.white};
    }
    span:nth-of-type(2) {
      color: ${({ theme }) => theme.colors.red_white};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-gap: 0.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 0.27vw;
  }
`;

const InfoBlock = styled.p`
  background-color: ${({ theme }) => theme.colors.black_white};
  margin: 0;
  display: flex;
  flex-direction: column;
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

const PlayerPhotoBlock = styled.div`
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    justify-content: center;
  }
`;

const Gradient = styled.div`
  background: ${({ theme }) => theme.gradients.player_white};
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const PlayerPhoto = styled.div`
  padding: 2.08vw 5vw 0;
  width: 37.55vw;
  height: 41.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 10.43vw 0;
    width: 79.27vw;
    height: 87.48vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 10.67vw 0;
    width: 78.67vw;
    height: 86.4vw;
  }
`;

const TShirtBtn = styled(CustomButton)`
  padding: 0.68vw 1.146vw;
  display: flex;
  position: absolute;
  gap: 0.42vw;
  top: 4.17vw;
  right: 0;
  z-index: 1;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 8.21vw;
    top: 6.26vw;
    gap: 1.04vw;
    padding: 1.7vw 2.85vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: auto;
    bottom: 0;
    gap: 2.13vw;
    right: 4.27vw;
    padding: 1.34vw 2.72vw;
  }
`;
