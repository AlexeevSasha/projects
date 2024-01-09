import { Divider, Modal } from "antd";
import { eventRepository } from "api/eventRepository";
import { subscriptionRepository } from "api/subscriptionRepository";
import { theme } from "assets/theme/theme";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { AnswerEnum, IQuiz } from "common/interfaces/IQuiz";
import { SectorDto } from "common/interfaces/event";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  quiz?: IQuiz;
};

export const QuizPreview = ({ onClose, quiz }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("queez.quizInfo") + quiz?.Header.Ru} footer={[null]} onCancel={onClose} visible={!!quiz}>
      {quiz && (
        <>
          <Row>
            <span>{t("queez.quizPreview.status")}</span>
            <span>{quiz.Status}</span>
          </Row>
          <Row>
            <span>{t("queez.quizPreview.title")}</span>
            <span>{quiz.Header.Ru}</span>
          </Row>
          <Row>
            <span>{t("queez.quizPreview.anons")}</span>
            <span>{quiz.Announce.Ru}</span>
          </Row>
          <Row>
            <span>{t("queez.quizPreview.description")}</span>
            <span dangerouslySetInnerHTML={{ __html: quiz.Text.Ru }} />
          </Row>
          <Row>
            <span>{t("loyalty.image")}</span>
            <Img src={quiz.PreviewPhoto} alt={quiz.Header.Ru} />
          </Row>

          <Divider />

          <Row>
            <span>{t("queez.quizPreview.dateStart")}</span>
            <span>{formatInMoscowDate(quiz.StartPublish, { withTime: true })}</span>
          </Row>
          <Row>
            <span>{t("queez.quizPreview.dateEnd")}</span>
            <span>{formatInMoscowDate(quiz.EndPublish, { withTime: true })}</span>
          </Row>
          <Row>
            <span>{t("queez.quizPreview.countOfPlayers")}</span>
            <span>{quiz.TotalAcceptedUsers}</span>
          </Row>

          <Divider />

          {quiz.Questions?.map((question, index) => (
            <React.Fragment key={question.Id}>
              <Row>
                <span>
                  {t("queez.quizPreview.question")} {index + 1}
                </span>
                <span>
                  <span dangerouslySetInnerHTML={{ __html: question.Text.Ru }} />
                  <br />
                  {question.QuestionImage ? <Img src={question.QuestionImage} alt={question.Text.Ru} /> : null}
                </span>
              </Row>
              <Row>
                <span>{t("queez.quizPreview.rightAnswer")}</span>
                <span>
                  {question.AnswerType === AnswerEnum.FreeAnswer
                    ? "свободный ответ"
                    : question.AnswerType === AnswerEnum.MonoSelect
                    ? (question.Answers?.findIndex((elem) => elem.IsCorrectAnswer) || 0) + 1
                    : question.Answers?.filter((elem) => elem.IsCorrectAnswer)
                        .map((elem) => elem.Num + 1)
                        .toString()}
                </span>
              </Row>
            </React.Fragment>
          ))}
        </>
      )}
    </Modal>
  );
};

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  & > span:first-child {
    color: ${theme.colors.gray};
    margin-right: 8px;

    &::after {
      content: ": ";
    }
  }

  & > *:last-child {
    color: ${theme.colors.middleGray};
  }
`;

const Img = styled.img`
  width: 343px;
  height: 154px;
  border-radius: 12px;
`;
