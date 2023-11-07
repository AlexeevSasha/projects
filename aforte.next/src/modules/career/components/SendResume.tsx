import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { ResumeForm } from "./ResumeForm";

export const SendResume = () => {
  const { openModal } = useContext(AppContext);
  return (
    <Container>
      <p>
        Мы рады видеть в команде инициативных и вовлеченных сотрудников, готовых решать сложные
        задачи и реализовывать масштабные проекты.
      </p>
      <CustomButtons
        onClick={() =>
          openModal(ModalNames.POPUP_MODAL, {
            children: <ResumeForm />,
          })
        }
        typeBtn={"lightBlue"}
      >
        Отправить резюме
      </CustomButtons>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 250px;
  grid-column-gap: 60px;
  align-items: end;
  padding: 20px 20px 20px 28px;
  background: $white;
  color: $black;
  border-radius: 32px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;

  p {
    margin: 0;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    padding: 20px;
    border-radius: 28px;
  }
`;

const CustomButtons = styled(Button)`
  padding: 16px;
  width: 100%;
  height: fit-content;
`;
