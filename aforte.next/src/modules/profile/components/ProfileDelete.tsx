import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { Button } from "../../../common/components/Button";
import { ProfileSettingsModal } from "./ProfileSettingsModal";

type Props = {
  id: string;
};

export const ProfileDelete = ({ id }: Props) => {
  const { openModal } = useContext(AppContext);
  const DeleteUser = () => {
    openModal(ModalNames.POPUP_MODAL, {
      children: <ProfileSettingsModal deleteModal id={id} />,
    });
  };
  return (
    <Conteiner>
      <Desctiption>
        Вместе с аккаунтом мы удалим из системы вашу личную информацию, историю заказов и покупок,
        сгорят баллы, пропадут избранные товары и товары в корзине.
      </Desctiption>
      <CustomButton onClick={DeleteUser}>Удалить аккаунт</CustomButton>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;
const Desctiption = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
`;
const CustomButton = styled(Button)`
  @import "variables";
  margin-top: 12px;
  width: fit-content;
  padding: 0;
  background: transparent;
  font-weight: 500;
  font-size: 14px;
  line-height: 137%;
  color: $orange3;
`;
