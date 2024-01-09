import { useRouter } from "next/router";
import { useMemo } from "react";
import styled, { css } from "styled-components";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { CrossIcon } from "../../../../assets/icon/CrossIcon";
import { CheckIcon } from "../../../../assets/icon/sokolniki/selectStadium/checkicon";
import { theme } from "../../../../assets/theme/theme";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { IAnswer, ICorrectQuizAnswerResponse } from "../../interfaces/IQuiz";
import { langQuiz } from "../../lang/langQuiz";

interface IPropsAnswer {
  checkedResult: ICorrectQuizAnswerResponse;
  questionAnswers?: IAnswer;
  points: number;
}

export const ResultAnswerQuizWithImg = ({ checkedResult, questionAnswers, points }: IPropsAnswer) => {
  const { locale = "ru" } = useRouter();

  const status = useMemo(() => {
    return checkedResult.IsClientResponded && checkedResult.IsCorrectAnswer
      ? "success"
      : checkedResult.IsClientResponded
      ? "error"
      : checkedResult.IsCorrectAnswer
      ? "answer"
      : "disable";
  }, []);

  return (
    <Answer key={checkedResult.AnswerId} status={status}>
      {questionAnswers?.AnswerImage ? (
        <AnswerImageContainer>
          <NextImage src={questionAnswers?.AnswerImage} />
        </AnswerImageContainer>
      ) : null}
      <AnswerTitle status={status}>
        {status === "success" || status === "answer" ? <CheckIcon /> : status === "error" ? <CrossIcon /> : <div />}
        <Text>{getLocalValue(questionAnswers?.Text, locale)}</Text>
        {status === "success" || status === "error" ? (
          <ValidationText>
            {status === "success"
              ? langQuiz[locale].answer.success
              : status === "error"
              ? langQuiz[locale].answer.error
              : ""}
          </ValidationText>
        ) : null}
        {status === "success" ? (
          <Points>
            {points} {langQuiz[locale].points(points)}
          </Points>
        ) : null}
      </AnswerTitle>
    </Answer>
  );
};

const Answer = styled.div<{ status?: string }>`
  display: flex;
  flex-direction: column;
`;

const AnswerTitle = styled.div<{ status?: string }>`
  font-weight: 500;
  display: grid;
  align-items: center;
  position: relative;
  grid-template-columns: 1.04vw 1fr;
  grid-column-gap: 0.42vw;
  font-size: 0.94vw;

  ${(props) => {
    switch (props.status) {
      case "error": {
        return css`
          color: ${theme.colors.pink};
          svg {
            path {
              stroke: ${theme.colors.pink};
            }
          }
        `;
      }
      case "success": {
        return css`
          color: ${theme.colors.green2};
          svg {
            path {
              stroke: ${theme.colors.green2};
            }
          }
        `;
      }
      case "answer": {
        return css`
          color: ${theme.colors.green2};
          svg {
            path {
              stroke: ${theme.colors.green2};
            }
          }
        `;
      }
      case "disable": {
        return css`
          color: ${props.theme.colors.gray_grayDark};
        `;
      }
      default: {
        return css`
          color: ${theme.colors.grayDark};
        `;
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 2.61vw 1fr;
    grid-column-gap: 1.04vw;
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 5.33vw 1fr;
    grid-column-gap: 2.13vw;
    font-size: 4.8vw;
  }
`;

const Text = styled.span`
  margin-right: 3.65vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-right: 9.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-right: 18.67vw;
  }
`;

const ValidationText = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  color: ${(props) => props.theme.colors.white_black};
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.83vw;
  margin-top: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-top: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-top: 2.13vw;
  }
`;

const Points = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const AnswerImageContainer = styled.div`
  width: 100%;
  height: 10.42vw;
  margin-bottom: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 23.99vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 47.47vw;
    margin-bottom: 4.27vw;
  }
`;
