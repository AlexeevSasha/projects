import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { NextImage } from "common/components/NextImage";
import { ModalNames } from "common/interfaces/modal";
import { useContext, useState } from "react";
import { Button } from "../../../common/components/Button";

type Props = {
  deleteModal?: boolean;
  id?: string;
};

export const ProfileSettingsModal = ({ deleteModal, id }: Props) => {
  const { closeModal } = useContext(AppContext);
  const [deleteError, isDeleteError] = useState<boolean>(false);
  const DeleteUser = () => {
    console.log(id);
    // closeModal(ModalNames.POPUP_MODAL); если не будет активных доставок
    isDeleteError(true);
  };
  return (
    <Conteiner>
      <ImageContainer>
        <NextImage src={deleteModal ? "/images/delete.png" : "/images/points.png"} alt={"review"} />
      </ImageContainer>
      <Title>
        {deleteModal
          ? deleteError
            ? "Удаление аккаунта недоступно"
            : "Вы хотите удалить аккаунт?"
          : "Вы заработали 500 баллов"}
      </Title>
      <Description>
        {deleteModal
          ? deleteError
            ? "Прямо сейчас мы не можем удалить ваш аккаунт, так как у вас есть активная доставка"
            : "У вас будет 30 дней, чтобы передумать. Зайдите на сайт по номеру телефона и мы восстановим ваш аккаунт и все данные в нём."
          : "Спасибо, что рассказали нам о себе, теперь вы можете использовать бонусные баллы для оплаты покупок"}
      </Description>
      {deleteModal ? (
        <CustomButton
          deleteModal
          deleteError={deleteError}
          onClick={deleteError ? () => closeModal(ModalNames.POPUP_MODAL) : DeleteUser}
        >
          {deleteError ? "Понятно" : "Удалить"}
        </CustomButton>
      ) : (
        <CustomButton onClick={() => closeModal(ModalNames.POPUP_MODAL)}>
          Перейти к покупкам
        </CustomButton>
      )}
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  max-width: 470px;
  @include respond-to(small) {
    padding: 24px;
    max-width: 100%;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  margin-bottom: 20px;
  @include respond-to(small) {
    font-size: 20px;
    margin-bottom: 12px;
    text-align: center;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 28px;
  text-align: center;
  @include respond-to(small) {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;
const CustomButton = styled(Button) <{ deleteModal?: boolean; deleteError?: boolean }>`
  @import "variables";
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  color: $white;
  background: $blue1;
  padding: 16.5px 0px;
  border-radius: 16px;
  &:hover {
    background: $blue2;
  }
  &.deleteModal {
    background: $orange3;
    &:hover {
      background: $orangeHover;
    }
    &.deleteError {
      color: $blue1;
      background: $blue-3;
      &:hover {
        background: $blue-2;
      }
    }
  }
`;
const ImageContainer = styled.div`
  @import "variables";
  width: 100%;
  padding: 24px 103px;
  margin-bottom: 28px;
  border-radius: 28px;
  background: $blue-3;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    height: 200px;
    width: 200px;
  }
  @include respond-to(small) {
    margin-bottom: 20px;
    padding: 20px 88px;
    div {
      height: 150px;
      width: 150px;
    }
  }
`;
