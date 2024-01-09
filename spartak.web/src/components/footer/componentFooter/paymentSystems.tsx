import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const PaymentSystems = () => {
  return (
    <Container>
      <PaymentBlock>
        <ContainerVisa>
          <NextImage src={"/images/footer/paymentSystems/Visa_v1.0.0.png"} alt="Visa" />
        </ContainerVisa>

        <ContainerMir>
          <NextImage src={"/images/footer/paymentSystems/Mir_v1.0.0.png"} alt="Mir" />
        </ContainerMir>
        <ContainerPayKeeper>
          <NextImage src={"/images/footer/paymentSystems/PayKeeper_v1.0.0.png"} alt="PayKeeper" />
        </ContainerPayKeeper>
      </PaymentBlock>
      <PaymentBlock>
        <ContainerMastercard>
          <NextImage src={"/images/footer/paymentSystems/Mastercard_v1.0.0.png"} alt="Master Card" />
        </ContainerMastercard>
        <ContainerSber>
          <NextImage src={"/images/footer/paymentSystems/Sber_v1.0.0.png"} alt="Sber" />
        </ContainerSber>
        <ContainerRpay>
          <NextImage src={"/images/footer/paymentSystems/Rpay_v1.0.0.png"} alt="Я-Pay" />
        </ContainerRpay>
      </PaymentBlock>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: space-between;
`;

const PaymentBlock = styled.div`
  display: grid;
  row-gap: 1.25vw;
  height: fit-content;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 4.27vw;
  }
`;

const ContainerVisa = styled.div`
  width: 2.76vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 6.91vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 14.13vw;
    height: 6.4vw;
  }
`;

const ContainerMir = styled.div`
  width: 3.33vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 8.34vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 17.07vw;
    height: 6.4vw;
  }
`;

const ContainerPayKeeper = styled.div`
  width: 5.1vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 12.78vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 26.13vw;
    height: 6.4vw;
  }
`;

const ContainerMastercard = styled.div`
  width: 1.98vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.95vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 10.13vw;
    height: 6.4vw;
  }
`;

const ContainerSber = styled.div`
  width: 3.14vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 8.6vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 17.6vw;
    height: 6.4vw;
  }
`;

const ContainerRpay = styled.div`
  width: 3.13vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 7.82vw;
    height: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 16vw;
    height: 6.4vw;
  }
`;
