import { DropdownList } from "../../../components/dropdownList/dropdownList";
import React from "react";
import { ContainerContent } from "../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IStadiumStaff } from "../../../api/dto/IStadiumStaff";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  answerQuestionData?: IStadiumStaff["questionAnswer"];
}

export const AnswerQuestionDropdownList = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.answerQuestionData?.blockQuestionsAnswers?.length ? (
    <StyledContainer>
      <DropdownList title={getLocalValue(props.answerQuestionData?.title, locale)} defaultState={!0}>
        {props.answerQuestionData?.blockQuestionsAnswers?.map((el, index) => (
          <TextBlock key={`k+${index}`}>
            <Question key={index}>{getLocalValue(el.question, locale)}</Question>
            <Answer
              dangerouslySetInnerHTML={{
                __html: getLocalValue(el.answer, locale),
              }}
            />
          </TextBlock>
        ))}
      </DropdownList>
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${theme.colors.red};
  }
`;

const TextBlock = styled.div`
  color: ${({ theme }) => theme.colors.white_black};

  p {
    margin: 0;
  }
`;

const Question = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  padding: 1.82vw 0 0.57vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding: 4.56vw 0 1.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding: 9.33vw 0 2.93vw;
  }
`;

const Answer = styled.div`
  display: block;
  padding: 1.25vw 2.08vw;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 3.13vw 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    flex-direction: column;
    font-size: 4.27vw;
    padding: 4.27vw;
  }
`;
