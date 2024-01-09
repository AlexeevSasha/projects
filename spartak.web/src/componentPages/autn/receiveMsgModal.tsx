import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { userRepository } from "../../api/userRepository";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Checkbox } from "../../components/checkbox";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { H1 } from "../../components/modal/modalUi";
import { NextImage } from "../../ui/nextImage/nextImage";
import { InfoAgree } from "./infoAgree";

type Props = {
  onClose: () => void;
};

export const ReceiveMsgModal = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();
  const [infoRuleIsOpen, setInfoRuleIsOpen] = useState(false);
  const [value, setValue] = useState(true);

  const handleProceed = () => userRepository.allowToUseWinline(!!value).then(() => onClose());

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        {infoRuleIsOpen ? (
          <InfoAgree onClose={() => setInfoRuleIsOpen(false)} />
        ) : (
          <Container>
            <H1>{lang[locale].auth.newsHeader}</H1>

            <ImgContainer>
              <NextImage src="/images/auth/receiveMsgImg_v1.0.0.png" />
            </ImgContainer>

            <Checkbox
              label={
                <CheckboxLabel>
                  <span>{lang[locale].auth.termsAgree} </span>
                  <a onClick={() => setInfoRuleIsOpen(true)}>{lang[locale].auth.newsAgree}</a>
                </CheckboxLabel>
              }
              checked={value}
              onChange={(e) => setValue(e.currentTarget.checked)}
            />

            <Button type="red" onClick={handleProceed}>
              {lang[locale].auth.proceed}
            </Button>
          </Container>
        )}
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  width: 20.15vw;
  margin: 0 auto;
  display: flex;
  flex-flow: column;

  & > * {
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;

    & > * {
      margin-bottom: 5.215vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > * {
      margin-bottom: 10.66vw;
    }
  }
`;

const CheckboxLabel = styled.div`
  color: ${theme.colors.grayDark};

  & > a {
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;

const Button = styled(CustomButton)`
  position: relative;
  margin-bottom: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 6.4vw;
    margin-bottom: 22vw;
  }
`;

const ImgContainer = styled.div`
  width: 5.1vw;
  height: 5.1vw;
  align-self: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 12.77vw;
    height: 12.77vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 26.13vw;
    height: 26.13vw;
  }
`;
