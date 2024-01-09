import React from "react";
import { useRouter } from "next/router";
import { Modal } from "./modal";
import { ModalLayout } from "./modalLayout";
import { H1 } from "./modalUi";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

type Props = {
  onClose?: () => void;
};

export const PersonalDataModal = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();
  const modalData = require("../../../public/mockJSON/personalDataModal.json");

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <H1>{getLocalValue(modalData.title, locale)}</H1>
        <Description dangerouslySetInnerHTML={{ __html: getLocalValue(modalData.description, locale) }} />
      </ModalLayout>
    </Modal>
  );
};

const Description = styled.div`
  padding-top: 0.83vw;
  font-size: 0.94vw;
  font-weight: 500;
  font-family: "FCSM Text", sans-serif;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 2.09vw;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 4.27vw;
    font-size: 4.8vw;
  }
`;
