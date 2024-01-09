import styled from "styled-components";
import { CustomButton } from "../../../components/buttons/customButton";
import { useRouter } from "next/router";
import { langQuiz } from "../lang/langQuiz";

interface IProps {
  onClick: () => void;
}

export const QuizButton = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <ButtonContainer>
      <CustomButton type="red" onClick={props.onClick}>
        {langQuiz[locale].starting}
      </CustomButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 50%;
  margin-top: 2.08vw;
`;
