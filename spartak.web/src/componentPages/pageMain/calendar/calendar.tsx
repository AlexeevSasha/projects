import { useMemo } from "react";
import styled from "styled-components";
import { EventEntityDto } from "../../../api/dto/EventEntity";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ReactSwiper } from "../../../components/reactSwiper/ReactSwiper";
import { SwiperArrowsBlock } from "../../../components/reactSwiper/SwiperArrowsBlock";
import { BannerSwiper } from "../../../components/reactSwiper/bannerSwiper";
import { VotingEntity } from "../../voting/interfaces/VotingT";
import { CalendarSheet } from "./calendarSheet";

type Props = {
  events: Record<number, EventEntityDto[]>;
  voting?: VotingEntity[];
  dateOfEngSeason?: string;
};

export type CalendarEntity = {
  date: number;
  events: EventEntityDto[];
};

const swiperId = "mainCalendar";
const date = new Date();
const monthBefore = 1;

export const Calendar = ({ events, voting, dateOfEngSeason }: Props) => {
  const monthsList = useMemo(() => {
    let monthCount;
    if (dateOfEngSeason) {
      const date1 = new Date(),
        date2 = new Date(dateOfEngSeason);

      monthCount =
        Math.round(
          (date2.getDate() - date1.getDate()) / 30 +
            date2.getMonth() -
            date1.getMonth() +
            12 * (date2.getFullYear() - date1.getFullYear())
        ) + 1;
    } else {
      monthCount = 3;
    }

    return new Array(monthCount).fill(null).map((_, i) => ({
      date: +Date.UTC(date.getFullYear(), date.getMonth() - (monthBefore - i)),
    }));
  }, [dateOfEngSeason]);

  const itemsList = monthsList.map((month) => ({ ...month, events: events[month.date] }));

  return (
    <ContainerContent>
      <ColumnsContainer>
        <Coll>
          <ArrowBlockWrapper>
            <SwiperArrowsBlock btnClassName={swiperId} />
          </ArrowBlockWrapper>

          <ReactSwiper<CalendarEntity>
            className="calendarSwiper"
            navigation={{
              prevEl: ".swiper-button-prev_" + swiperId,
              nextEl: ".swiper-button-next_" + swiperId,
            }}
            slidesPerView={"auto"}
            itemsList={itemsList}
            render={(value: CalendarEntity) => <CalendarSheet {...value} />}
            scrollbar={true}
            initialSlide={1}
          />
        </Coll>

        <Banner>
          <BannerSwiper
            locationKey="Web.Main.Calendar"
            staticBanner={voting?.map((elem) => ({
              ...elem,
              Url: `/voting/${elem.Id}`,
              BannerImages: {
                Default: `/images/banners/${elem.SeasonId ? "BestPlayerOfSeason_v1.0.0" : "BestPlayer_v1.0.0"}.png`,
                Tablet: `/images/banners/${elem.SeasonId ? "BestPlayerOfSeason_v1.0.0" : "BestPlayer_v1.0.0"}.png`,
                MobileSite: `/images/banners/${elem.SeasonId ? "BestPlayerOfSeason_v1.0.0" : "BestPlayer_v1.0.0"}.png`,
              },
            }))}
          />
        </Banner>
      </ColumnsContainer>
    </ContainerContent>
  );
};

const ColumnsContainer = styled.section`
  display: grid;
  grid: auto / 1fr 1fr;
  grid-gap: 1.25vw;
  width: 100%;
  margin-bottom: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid: auto / 1fr;
    margin-bottom: 10.43vw;
    > :first-child {
      padding-bottom: 10.43vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const Coll = styled.div`
  position: relative;
  min-height: 29.6vw;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-height: 68.45vw;
  }

  & > .swiper.calendarSwiper {
    & > .swiper-scrollbar {
      background: ${({ theme }) => theme.colors.blackLight_whiteGray};
      height: 0;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        height: 1.08vw;
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        height: 1.07vw;
      }
    }
    & .swiper-scrollbar-drag {
      background: ${({ theme }) => theme.colors.grayDark_gray1};
      border-radius: unset;
    }
  }
`;

const Banner = styled.div`
  position: relative;
  height: 29.6vw;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 68.45vw;
  }

  & > .banner-slider {
    height: 100%;
    width: 100%;
  }
`;

const ArrowBlockWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.black_white};
`;
