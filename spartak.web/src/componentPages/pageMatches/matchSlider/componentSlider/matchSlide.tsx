import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import type { IMatchDto } from "../../../../api/dto/IMatchDto";
import { dictionaryMatchIcon } from "../../../../assets/helpers/dictionaryMatchIcon";
import { theme } from "../../../../assets/theme/theme";
import { checkImgFunk } from "../../../../helpers/checkImgFunk";
import { NextImage } from "../../../../ui/nextImage/nextImage";

export interface MatchSlideProps {
  event?: IMatchDto;
  currentDate: Date;
  type: "old" | "new";
}

export const MatchSlide = React.memo((props: MatchSlideProps) => {
  const { locale = "ru", query } = useRouter();
  const score = `${props.event?.Scores?.Home} : ${props.event?.Scores?.Guest}`;

  return (
    <Slide>
      <SlideTitle type={props.type} event={!!props.event}>
        {props.event && props.type === "old" ? (
          <>
            {checkImgFunk(props.event.HomeTeam?.Logo) ? (
              <ContainerImage winner={props.event.Scores?.Home >= props.event.Scores?.Guest}>
                {props.event.HomeTeam?.Logo ? <NextImage src={props.event.HomeTeam?.Logo} /> : null}
              </ContainerImage>
            ) : null}
            {checkImgFunk(props.event.GuestTeam?.Logo) ? (
              <ContainerImage
                winner={props.event.Scores?.Guest > props.event.Scores?.Home}
                draw={props.event.Scores?.Guest === props.event.Scores?.Home}
              >
                {props.event.GuestTeam?.Logo ? <NextImage src={props.event.GuestTeam?.Logo} /> : null}
              </ContainerImage>
            ) : null}
          </>
        ) : props.event && props.type === "new" ? (
          checkImgFunk(props.event.GuestTeam?.Logo || props.event.HomeTeam?.Logo) ? (
            <ContainerImageForthcoming>
              <NextImage
                src={
                  props.event.HomeTeam?.Id === query.team
                    ? props.event.GuestTeam?.Logo || ""
                    : props.event.HomeTeam?.Logo || ""
                }
              />
            </ContainerImageForthcoming>
          ) : null
        ) : (
          props.currentDate.getDate()
        )}
      </SlideTitle>

      <SlideDesc type={props.type} event={!!props.event}>
        {props.event && props.type === "old" ? (
          <SlideScope>
            {props.event.Scores?.Home >= props.event.Scores?.Guest ? score : score.split(" : ").reverse().join(" : ")}
          </SlideScope>
        ) : props.event && props.type === "new" ? (
          dictionaryMatchIcon[props.event.HomeTeam?.Id === query.team ? "home" : "airplane"]?.({
            color: theme.colors.white,
          })
        ) : (
          lang[locale].monthList.dayOfWeek[props.currentDate.getDay()]
        )}
      </SlideDesc>
    </Slide>
  );
});

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SlideTitle = styled.div<{ type: "old" | "new"; event: boolean }>`
  position: relative;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 3.75vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  height: 5.42vw;

  width: 99%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1.25vw 0;

  ${(props) =>
    props.type === "old" && props.event
      ? `background: ${props.theme.colors.white_whiteGray}`
      : props.type === "new" && props.event
      ? `background: ${props.theme.colors.blackLight_red}`
      : `background: ${props.theme.colors.black_white}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    height: 14.47vw;
    padding: 3.13vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    height: 15.47vw;
  }
`;

const SlideDesc = styled.div<{ type: "old" | "new"; event: boolean }>`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  height: 3.14vw;

  width: 99%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.type === "old" && props.event
      ? `background: ${theme.colors.white}`
      : props.type === "new" && props.event
      ? `background: ${props.theme.colors.blackLight_red}`
      : `background: ${props.theme.colors.black_white}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    height: 8.6vw;

    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    height: 9.07vw;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const ContainerImage = styled.div<{ winner: boolean; draw?: boolean }>`
  z-index: ${({ winner }) => (winner ? 1 : 0)};
  opacity: ${({ winner, draw }) => (winner ? 1 : draw ? 1 : 0.5)};
  position: absolute;
  height: 3.8vw;
  width: 3.8vw;
  ${({ winner }) => (winner ? "left: 10%" : "right: 10%")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 7.3vw;
    width: 7.3vw;
    ${({ winner }) => (winner ? "left: 5%" : "right: 5%")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 7.73vw;
    width: 7.73vw;
    ${({ winner }) => (winner ? "left: 10%" : "right: 10%")};
  }
`;

const ContainerImageForthcoming = styled.div`
  height: 2.97vw;
  width: 2.97vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5.87vw;
    width: 5.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10.67vw;
    width: 10.67vw;
  }
`;

const SlideScope = styled.div`
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
