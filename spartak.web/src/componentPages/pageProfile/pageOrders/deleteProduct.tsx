import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { BtnGroup, H1, Prompt } from "../../../components/modal/modalUi";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteProduct = ({ onClose, onDelete }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <Container>
          <H1>{lang[locale].profileOrders.wantCancelOrder}</H1>

          <Desc>{lang[locale].profileOrders.whyCancelOrder}</Desc>

          <Textarea rows={4} placeholder={lang[locale].profileOrders.comment} />

          <BtnGroup>
            <CustomButton type="opacity" onClick={onClose} className="submitBtn">
              {lang[locale].auth.cancelSignout}
            </CustomButton>

            <CustomButton type="red" onClick={onDelete} className="submitBtn">
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

const Desc = styled(Prompt)`
  line-height: 1em;
  margin: 0.83vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 2.08vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 4.26vw 0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 0.83vw;
  color: ${theme.colors.grayDark};
  background: #f6f8fa;
  border: 1px solid #dce1ea;
  box-sizing: border-box;
  align-self: center;
  padding: 0.625vw 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    padding: 1.56vw 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    width: 90%;
    padding: 3.2vw 4.26vw;
  }

  &::placeholder {
    font-family: "Roboto", sans-serif;
    color: #a5acb8;
  }
`;
