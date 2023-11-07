import styled from "astroturf/react";
import { useContext } from "react";
import { ModalNames } from "../../interfaces/modal";
import { Button } from "../Button";
import { AppContext } from "../ContextProvider";
import { Forms } from "../../../modules/forms/components";

export const ButtonAskQuestion = () => {
  const { openModal } = useContext(AppContext);

  return (
    <CustomButton
      onClick={() =>
        openModal(ModalNames.POPUP_MODAL, {
          children: <Forms.AskQuestion />,
        })
      }
      typeBtn="lightBlue"
      size="md"
    >
      Задать вопрос
    </CustomButton>
  );
};

const CustomButton = styled(Button)`
  @import "variables";
  padding: 16px 40px;

  @include respond-to(small) {
    background: $white !important;
    color: $blue1 !important;
    width: fit-content !important;

    &:hover {
      background: $white !important;
    }
  }
`;
