import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { lang } from "../../../../public/locales/lang";
import type { IMatchDto } from "../../../api/dto/IMatchDto";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ReactSwiper } from "../../../components/reactSwiper/ReactSwiper";
import { useWindowSize } from "../../../core/hooks/UseWindowSize";
import { MatchSlide, MatchSlideProps } from "./componentSlider/matchSlide";

interface IPropsSlider {
  typeMatch: "old" | "new";
  matchCalendar: IMatchDto[];
}

export const MatchSlider = (props: IPropsSlider) => {
  const { locale = "ru" } = useRouter();
  const { width = 0 } = useWindowSize(true);
  const [activeDate, setActiveDate] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);

  const firstDate = useMemo(
    () => new Date(props.matchCalendar[props.typeMatch == "new" ? 0 : props.matchCalendar.length - 1]?.Date),
    [props]
  );

  const countSlide = useMemo(
    () => (width > parseInt(theme.rubberSize.tablet) ? (width > parseInt(theme.rubberSize.desktop) ? 9 : 6) : 5),
    [width]
  );

  const itemsList = useMemo(() => {
    let startDate =
      props.typeMatch === "old"
        ? new Date(props.matchCalendar[props.matchCalendar.length - 1]?.Date)
        : new Date(props.matchCalendar[0]?.Date);
    let endDate =
      props.typeMatch === "old"
        ? new Date(props.matchCalendar[0]?.Date)
        : new Date(props.matchCalendar[props.matchCalendar.length - 1]?.Date);

    const item: MatchSlideProps[] = [];

    if (endDate.getTime() - startDate.getTime() <= 777600000) {
      endDate = new Date(startDate.getTime() + 777600001);
    }

    while (startDate.getTime() <= endDate.getTime()) {
      const event = props.matchCalendar?.find((item) => {
        const date = new Date(item.Date);
        return (
          date.getDate() === startDate.getDate() &&
          date.getMonth() === startDate.getMonth() &&
          date.getFullYear() === startDate.getFullYear()
        );
      });

      item.push({ event, currentDate: startDate, type: props.typeMatch });

      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
    }

    //Для того, чтобы свайпер успел посчитать позицию активного слайдера для прошедших матчей
    setTimeout(() => swiper?.slideTo?.(props.typeMatch == "new" ? 0 : item.length), 0);

    return item;
  }, [props.matchCalendar, props.typeMatch, swiper]);

  return (
    <Container>
      <MonthContainer>
        <span>
          {
            lang[locale].monthList.default[
              new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + activeDate).getMonth()
            ]
          }
        </span>
      </MonthContainer>

      <ContainerContent>
        <ReactSwiper<MatchSlideProps>
          initialSlide={props.typeMatch == "new" ? 0 : itemsList.length}
          className="matchCalendarSwiper"
          itemsList={itemsList}
          onSwiper={setSwiper}
          grabCursor={true}
          navigation={true}
          keyboard={{ enabled: true }}
          slidesPerView={countSlide}
          slidesPerGroup={5}
          onSlideChange={(slide) => setActiveDate(slide.activeIndex)}
          render={(props) => <MatchSlide {...props} />}
        />
      </ContainerContent>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  cursor: pointer;
  flex-direction: column;
  color: ${theme.colors.white};
  width: max-content;
  align-items: flex-end;
  margin-top: 2.08vw;

  .swiper-button-next,
  .swiper-button-prev {
    cursor: pointer;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    padding-bottom: 5.22vw;
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 9.6vw;
    padding-bottom: 8vw;
  }
`;

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.83vw 0;

  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 0.94vw;
  text-transform: capitalize;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
