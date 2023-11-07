import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { ResumeForm } from "./ResumeForm";

export const NotVacancy = () => {
  const { openModal } = useContext(AppContext);
  return (
    <Container>
      <Title>Нет подходящей вакансии?</Title>
      <Description>
        Мы рады видеть в команде инициативных и вовлеченных сотрудников, готовых решать сложные
        задачи и реализовывать масштабные проекты
      </Description>
      <CustomButton
        typeBtn={"lightBlue"}
        onClick={() =>
          openModal(ModalNames.POPUP_MODAL, {
            children: <ResumeForm />,
          })
        }
      >
        Отправить резюме
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  width: 100%;
  background: $white;
  cursor: pointer;
  border-radius: 28px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  @include respond-to(small) {
    padding: 24px 20px 20px 20px;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
`;

const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  @include respond-to(small) {
    font-size: 13px;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 14px 0;
  margin-top: 16px;
`;
