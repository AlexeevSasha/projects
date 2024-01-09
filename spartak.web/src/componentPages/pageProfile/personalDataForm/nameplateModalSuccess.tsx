import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";

type Props = {
  onClose: () => void;
};

export const NameplateModalSuccess = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <Container>
          <Title>{lang[locale].bannerInfo.nameplate.modal.textSuccess}</Title>
          <Description>{lang[locale].bannerInfo.nameplate.modal.descriptionSuccess}</Description>
          <CustomButton type="red" onClick={onClose}>
            {lang[locale].bannerInfo.nameplate.modal.buttonSuccess}
          </CustomButton>
        </Container>
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.25vw;
  text-align: center;
  margin: 2.09vw 0 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 7.56vw 0 1.04vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 16.87vw 0 2.13vw;
    font-size: 6.4vw;
  }
`;

const Description = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  text-align: center;
  color: ${theme.colors.grayDark};
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.09vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
    font-size: 4.27vw;
  }
`;
