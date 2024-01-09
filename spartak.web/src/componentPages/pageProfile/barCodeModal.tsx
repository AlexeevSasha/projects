import React from "react";
import { Modal } from "../../components/modal/modal";
import { FormLayout, CrossIcon, SpartakImgContainer } from "../../components/modal/modalLayout";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { useRouter } from "next/router";
import Barcode from "react-barcode";
import { lang } from "../../../public/locales/lang";

interface IProps {
  code?: string;
  clickClose: () => void;
}

export const BarCodeModal = ({ code, clickClose }: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <Modal clickClose={clickClose}>
      <RestyleLayout overflow={"auto"} isFlex={true}>
        <CrossIcon onClick={clickClose} />

        <Description>{lang[locale].profile.profileBanner.barCodeModalDescription}</Description>
        <BarCodeContainer>
          <SpartakImgContainer>
            <NextImage src={`/images/spartak/${locale}/lightTheme/spartakLogoWhiteText.svg`} alt={"Спартак"} />
          </SpartakImgContainer>

          <BarCodeBlock>
            <Barcode value={String(code)} height={160} displayValue={false} />
          </BarCodeBlock>

          <span>{code}</span>
        </BarCodeContainer>
      </RestyleLayout>
    </Modal>
  );
};

const RestyleLayout = styled(FormLayout)`
  font-family: "FCSM Text", sans-serif;
  width: 31.04vw;
  & > div {
    width: -webkit-fill-available;
  }
  & > svg:first-of-type {
    position: absolute;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 77.71vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }
`;
const Description = styled.p`
  font-weight: 500;
  font-size: 1.25vw;
  padding: 1.25vw 0;
  margin: 0;
  line-height: 1.77vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 2.35vw 0;
    line-height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 4.27vw 0;
    line-height: 7.47vw;
    letter-spacing: 0.1px;
  }
`;
const BarCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  background: ${theme.colors.fireEngineRed};
  color: ${theme.colors.white};
  padding: 1.25vw 2.08vw;
  gap: 1.25vw;
  border-radius: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 2.35vw;
    gap: 2.35vw;
    border-radius: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 4.27vw;
    gap: 4.27vw;
    border-radius: 6.4vw;
  }
`;
const BarCodeBlock = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
`;
