import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IBirthdayPeople } from "../../../../api/dto/IBirthdayPeople";
import { theme } from "../../../../assets/theme/theme";
import { PersonCard } from "../../../../components/personCard";
import { SwiperWrapper } from "../../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../../components/reactSwiper/swipeWithControl";
import { ThemeContext } from "../../../../core/themeProvider";
import { EmptyScreenMatches } from "../../../pageMatches/emptyScreenMatches/emptyScreenMatches";

interface IProps {
  birthdayList?: IBirthdayPeople[];
}

export const BirthdayPeople = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const list = props.birthdayList
    ? Array.from(new Set(props.birthdayList.map((elem) => elem.FullName.Ru))).map((elem) => {
        return props.birthdayList?.find((birthday) => birthday.FullName.Ru === elem) || ({} as IBirthdayPeople);
      })
    : [];

  return (
    <StyledContainer>
      <SwipeWithControl<IBirthdayPeople>
        className="birthday-swiper"
        title={lang[locale].academy.todaysBirthdays}
        itemsList={list}
        swipeProps={{ scrollbar: true }}
      >
        {(value) => <PersonCard data={value} locationAcademy showBirthday />}
      </SwipeWithControl>

      {!props.birthdayList?.length && (
        <EmptyScreen>
          <EmptyScreenMatches
            text={lang[locale].academy.noBirthdays}
            title={""}
            srcImg={`/images/icon/gift${isDarkTheme ? "Black" : "White"}.svg`}
          />
        </EmptyScreen>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(SwiperWrapper)`
  display: block;
  margin: 6.25vw auto 5.21vw;
  position: relative;
  padding: 4.17vw 0;

  :before {
    content: " ";
    background: ${({ theme }) => theme.colors.blackLight_whiteGray};
    height: 100%;
    width: 100vw;
    left: 50%;
    transform: translate(-50%, 0);
    top: 0;

    position: absolute;
  }

  & .swiper {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 13.82vw 0 0;

    & .swiper {
      padding-bottom: 5.48vw;
    }

    & .swiper .swiper-slide {
      width: 44.2vw;
      margin-right: 3.13vw;
    }

    & .swiper-horizontal > .swiper-scrollbar {
      left: 0;
      width: 97%;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 0;

    & .swiper {
      padding-bottom: 6.4vw;
    }
  }
`;

const EmptyScreen = styled.div`
  padding-top: 6.98vw;
  width: 100%;
  position: relative;

  span {
    font-size: 2.08vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 5.22vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 10.67vw;
  }
`;
