import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimeToTimer } from "../../../../assets/constants/date";
import { theme } from "../../../../assets/theme/theme";
import { VotingDataType } from "../../interfaces/VotingT";
import { langVoting } from "../lang/langVoting";

type Props = {
  voting: VotingDataType;
};

const getUtcDate = (endTime: string) => +new Date(endTime) - Date.now();

export const VotingTimer = ({ voting }: Props) => {
  const { locale = "ru" } = useRouter();
  const [milliseconds, setMilliseconds] = useState(() => getUtcDate(voting.EndVoting));

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds(milliseconds - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [milliseconds]);

  useEffect(() => {
    setMilliseconds(getUtcDate(voting.EndVoting));
  }, [voting.EndVoting]);

  return (
    <TimerWrapper>
      {milliseconds < 1000 ? (
        <TimerTitle>{langVoting[locale].votingEnded}</TimerTitle>
      ) : (
        <>
          <TimerTitle>{langVoting[locale].timerTitle}</TimerTitle>

          <TimerContent
            dangerouslySetInnerHTML={{
              __html: `<span>${getTimeToTimer(milliseconds, "dddd : HH : mm : ss")
                .split(":")
                .join("</span>:<span>")}</span>`,
            }}
          />
          <TimerEnum>
            <span>{langVoting[locale].timerDesignations.days}</span>
            <span>{langVoting[locale].timerDesignations.hours}</span>
            <span>{langVoting[locale].timerDesignations.minutes}</span>
            <span>{langVoting[locale].timerDesignations.seconds}</span>
          </TimerEnum>
        </>
      )}
    </TimerWrapper>
  );
};

const TimerWrapper = styled.div`
  color: ${theme.colors.white};
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: flex-start;
  }
`;

const TimerTitle = styled.div`
  color: ${theme.colors.white};
  font-weight: 500;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    color: ${({ theme }) => theme.colors.white_black};
    font-size: 4.27vw;
  }
`;

const TimerContent = styled.p`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  grid-column-gap: 0.63vw;
  font-size: 1.67vw;
  font-weight: 700;
  margin: 0.83vw 0 0;

  span {
    background-color: ${theme.colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.02vw;
    width: 3.28vw;
    font-size: 1.67vw;
    line-height: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 1.56vw;
    font-size: 4.17vw;
    margin: 1.04vw 0 0;

    span {
      height: 6.52vw;
      width: 8.21vw;
      font-size: 3.13vw;
      font-weight: 500;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 3.2vw;
    font-size: 8.53vw;
    margin: 2.13vw 0 0;

    span {
      height: 13.33vw;
      width: 16.8vw;
      font-size: 6.4vw;
    }
  }
`;

const TimerEnum = styled.p`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 3.28vw);
  grid-column-gap: 1.7vw;
  font-size: 0.73vw;
  margin: 0.21vw 0 0;
  font-weight: 400;

  span {
    text-align: center;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(4, 8.21vw);
    grid-column-gap: 4.12vw;
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(4, 16.8vw);
    grid-column-gap: 8.5vw;
    font-size: 3.73vw;
  }
`;
