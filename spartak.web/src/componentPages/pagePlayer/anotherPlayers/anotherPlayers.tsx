import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import type { IPlayer } from "../../../api/dto/IPlayer";
import { theme } from "../../../assets/theme/theme";
import { HoverButton } from "../../../components/personButton";
import { PersonCard } from "../../../components/personCard";
import { SwiperWrapper } from "../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../components/reactSwiper/swipeWithControl";

interface IProps {
  players?: IPlayer[];
}

export const AnotherPlayers = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <SwiperContainer>
      <SwipeWithControl<IPlayer>
        className={"another-player-wiper"}
        title={lang[locale].player.anotherPlayers}
        itemsList={props.players}
        swipeProps={{ freeMode: true, scrollbar: true }}
      >
        {(value: IPlayer) => (
          <HoverButton url={`/player/${value.Id}`}>
            <PersonCard data={value} showPosition />
          </HoverButton>
        )}
      </SwipeWithControl>
    </SwiperContainer>
  );
};

const SwiperContainer = styled(SwiperWrapper)`
  margin-top: 5.21vw;
  margin-bottom: 7.29vw;

  & .swiper {
    margin-top: 3.13vw;
    padding-bottom: 3.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
    margin-bottom: 10.43vw;

    & .swiper {
      margin-top: 3.13vw;
      padding-bottom: 3.39vw;
      .swiper-wrapper > .swiper-slide {
        width: 45.37vw;
        margin-right: 3.13vw;
      }
      .swiper-scrollbar {
        bottom: 0;
        width: 93.87vw;
        background: ${({ theme }) => theme.colors.blackLight_whiteGray};

        .swiper-scrollbar-drag {
          background: ${({ theme }) => theme.colors.grayDark_gray1};
        }
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
    margin-bottom: 10.67vw;

    & .swiper {
      width: 91.47vw;
      margin-top: 4.27vw;
      padding-bottom: 3.2vw;

      .swiper-wrapper > .swiper-slide {
        width: 44.53vw;
        margin-right: 2.4vw;

        :last-child {
          margin-right: 0;
        }
      }
      .swiper-scrollbar {
        width: inherit;
      }
    }
  }
`;
