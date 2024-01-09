import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { BtnGroup, H1, Prompt } from "../../components/modal/modalUi";

type Props = {
  onClose: () => void;
  logout: () => void;
};

export const LogoutModal = ({ onClose, logout }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <Container>
          <H1>{lang[locale].auth.wantLeave}</H1>

          <Prompt>{lang[locale].auth.sessionWillEnd}</Prompt>

          <BtnGroup>
            <CustomButton type="opacity" onClick={onClose} className="submitBtn">
              {lang[locale].auth.cancelSignout}
            </CustomButton>

            <CustomButton type="red" onClick={logout} className="submitBtn">
              {lang[locale].auth.confirmSignout}
            </CustomButton>
          </BtnGroup>
        </Container>
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  width: 20.15vw;
  margin: 0 auto;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;
