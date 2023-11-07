import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { IconCross } from "common/components/icons/IconCross";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";

type Props = {
  email: string;
};

export const ProfileSettingsEmailAlert = ({ email }: Props) => {
  const { closeModal } = useContext(AppContext);

  return (
    <ProfileAlert>
      <InfoBlock>
        <TitleAlert>Пожалуйста, подтвердите электронную почту</TitleAlert>
        <DescriptionAlert>
          Для этого пройдите по ссылке в письме, отправленном на {email}
        </DescriptionAlert>
      </InfoBlock>
      <Close onClick={() => closeModal(ModalNames.ALERT_MODAL)}>
        <IconCross />
      </Close>
    </ProfileAlert>
  );
};
const ProfileAlert = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 20px 40px;
  background: $orange3;
  width: 100%;
  border-radius: 102px;
  justify-content: space-between;
  @include respond-to(small) {
    flex-direction: column;
    padding: 16px 32px 16px 20px;
    border-radius: 28px;
  }
`;
const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  @include respond-to(small) {
    align-items: flex-start;
  }
`;
const TitleAlert = styled.span`
  @import "variables";
  font-size: 18px;
  font-weight: 600;
  color: $white;
  margin-bottom: 4px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;
const DescriptionAlert = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  color: $blue-2;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 13px;
  }
`;
const Close = styled.span`
  @import "variables";

  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 12px;
  background: $white;
  transition: all 0.3s ease-in-out;
  svg {
    path {
      stroke: $orange3;
    }
  }
  &:hover {
    transform: rotate(90deg);
  }
  @include respond-to(small) {
    border-radius: 32px;
    padding: 4px;
    top: 16px;
  }
`;
