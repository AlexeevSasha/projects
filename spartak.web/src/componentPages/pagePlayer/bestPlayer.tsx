import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IconInfo } from "../../assets/icon/iconInfo";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { MvpVoting } from "../../api/dto/IPlayer";
import { formatDate } from "../../assets/constants/date";
import { useOnClickOutside } from "../../core/hooks/useOnClickOutside";
import { Tooltip } from "../../components/tooltip/tooltip";
import { useWindowSize } from "../../core/hooks/UseWindowSize";

type Props = {
  votings: MvpVoting[];
};

export const BestPlayer = ({ votings }: Props) => {
  const { locale = "ru" } = useRouter();
  const [promptIsVisible, setPromptIsVisible] = useState(false);
  const { width = 1920 } = useWindowSize();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setPromptIsVisible(false));

  return (
    <Container onlyOne={votings.length < 2}>
      <div>
        <Cup>
          <BestPlayerImgContainer><NextImage src={"/images/player/voting_v1.0.0.png"} alt={lang[locale].player.spartakCup} /></BestPlayerImgContainer>

          {votings.length > 1 && <div>X{votings.length}</div>}
        </Cup>

        <Title>{lang[locale].player.bestPlayer}</Title>
      </div>

      <Info ref={ref}>
        <IconInfo onClick={() => setPromptIsVisible(!promptIsVisible)} />

        {promptIsVisible && (
          <Tooltip position={width > 768 ? "top" : "left"}>
            {votings.map(({ Month }) => (
              <Months key={Month}>{formatDate(Month, "mmmm`yy", locale)}</Months>
            ))}
          </Tooltip>
        )}
      </Info>
    </Container>
  );
};

const Container = styled.div<{ onlyOne?: boolean }>`
  color: ${({ theme }) => theme.colors.white_black};
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  right: 0;
  z-index: 2;
  font-size: 0.83vw;

  & > div:first-child {
    font-weight: 700;
    display: flex;
    flex-flow: column;
    align-items: ${({ onlyOne }) => (onlyOne ? "center" : "flex-end")};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-right: 2.86vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const BestPlayerImgContainer = styled.div`
  width: 2.08vw;
  height: 7.24vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 18.12vw;
  }
`;

const Months = styled.div`
  text-transform: capitalize;
`;

const Cup = styled.div`
  display: flex;
  align-items: center;

  & > div:last-child {
    font-size: 1.67vw;
    padding-right: 0.6vw;
    color: ${({ theme }) => theme.colors.white_gray1};
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.17vw;
      padding-right: 1.5vw;
    }
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  width: 7vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 17.73vw;
  }
`;

const Info = styled.div`
  cursor: pointer;
  position: relative;
  font-size: 1.25vw;
  transform: translateY(-84%);
  color: ${({ theme }) => theme.colors.white_gray1};

  & > svg {
    display: block;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
`;
