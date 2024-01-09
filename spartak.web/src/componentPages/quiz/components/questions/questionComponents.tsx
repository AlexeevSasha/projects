import { useRouter } from "next/router";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { langQuiz } from "../../lang/langQuiz";
/******************************************** */
export const QuestionContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blackLight_lightBlue};
  padding: 2.08vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 3.2vw;
  }
`;
/******************************************** */
export const QuestionTitle = styled.h3`
  color: ${(props) => props.theme.colors.white_black};
  margin: 0;
  font-weight: 700;
  font-size: 1.67vw;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    font-weight: 500;
  }
`;
/******************************************** */
interface IPropsSteps {
  step: number;
  countSteps: number;
  onCheck: () => void;
  onNext?: () => void;
  isChecked: boolean;
  disabled?: boolean;
}

export const StepOfQuiz = (props: IPropsSteps) => {
  const { locale = "ru" } = useRouter();

  return (
    <StepContainer>
      <span>{langQuiz[locale].numberOfQuestions(props.step + 1, props.countSteps)}</span>
      {props.isChecked ? (
        <CustomButton type="red" onClick={props.onNext}>
          {langQuiz[locale].buttonNext}
        </CustomButton>
      ) : (
        <CustomButton type="red" onClick={props.disabled ? undefined : props.onCheck} disabled={props.disabled}>
          {langQuiz[locale].buttonCheck}
        </CustomButton>
      )}
    </StepContainer>
  );
};

const StepContainer = styled.div`
  color: ${(props) => props.theme.colors.white_black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;

  font-size: 0.83vw;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-top: 4.27vw;
  }
`;
