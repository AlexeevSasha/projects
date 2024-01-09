import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { LoyaltyConditionCheck, PromoDto } from "../../../api/dto/loyalty";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import React, { useContext } from "react";
import { ThemeContext } from "../../../core/themeProvider";
import { CopyIcon } from "../../../assets/icon/copyIcon";
import { DataContext } from "../../../core/dataProvider";

interface IProps {
  promo: PromoDto;
  accepted?: LoyaltyConditionCheck;
}

export const PromoWinner = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const { setShowNotification } = useContext(DataContext);

  const copyText = () => {
    navigator.clipboard
      ?.writeText(String(props.promo.Award?.PromoCode || props.accepted?.Award?.PromoCode))
      .then(() => setShowNotification(true));
  };
  switch (props.promo.LoyaltyAwardType) {
    case "FreeBet": {
      return (
        <Container>
          <Input
            icon={
              <CopyIconWrapper onClick={copyText}>
                <CopyIcon />
              </CopyIconWrapper>
            }
            paddingPosition="right"
            lightStyle={!isDarkTheme}
            type="copy"
            label={lang[locale].profileLoyalty.promoCode}
            value={props.promo.Award?.PromoCode || props.accepted?.Award?.PromoCode}
          />
          {props.accepted?.WinnerText || props.promo?.WinnerText ? (
            <Text dangerouslySetInnerHTML={{ __html: props.accepted?.WinnerText || props.promo?.WinnerText || "" }} />
          ) : null}
        </Container>
      );
    }
    case "FreeBetByPhone": {
      return (
        <Container>
          <Input
            icon={
              <CopyIconWrapper onClick={copyText}>
                <CopyIcon />
              </CopyIconWrapper>
            }
            paddingPosition="right"
            lightStyle={!isDarkTheme}
            type="copy"
            label={lang[locale].profileLoyalty.promoCode}
            value={props.promo.Award?.PromoCode || props.accepted?.Award?.PromoCode}
          />
          {props.accepted?.WinnerText || props.promo?.WinnerText ? (
            <Text dangerouslySetInnerHTML={{ __html: props.accepted?.WinnerText || props.promo?.WinnerText || "" }} />
          ) : null}
        </Container>
      );
    }
    case "CouponForMerchandise": {
      return (
        <Container>
          <Input
            icon={
              <CopyIconWrapper onClick={copyText}>
                <CopyIcon />
              </CopyIconWrapper>
            }
            paddingPosition="right"
            lightStyle={!isDarkTheme}
            type="copy"
            label={lang[locale].profileLoyalty.promoCode}
            value={props.promo.Award?.PromoCode || props.accepted?.Award?.PromoCode}
          />
          {props.accepted?.WinnerText || props.promo?.WinnerText ? (
            <Text dangerouslySetInnerHTML={{ __html: props.accepted?.WinnerText || props.promo?.WinnerText || "" }} />
          ) : null}
        </Container>
      );
    }
    case "ExternalReference": {
      return (
        <Container>
          <CustomButton
            type="red"
            onClick={() => window.open(`${props.promo.Award?.Link || props.accepted?.Award?.Link}`, "_blank")}
          >
            {props.promo.Award?.ButtonText || props.accepted?.Award?.ButtonText}
          </CustomButton>
          {props.accepted?.WinnerText || props.promo?.WinnerText ? (
            <Text dangerouslySetInnerHTML={{ __html: props.accepted?.WinnerText || props.promo?.WinnerText || "" }} />
          ) : null}
        </Container>
      );
    }
    case "VoucherToTheBox": {
      return null;
    }
    default: {
      return null;
    }
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-gap: 1.25vw;
  align-items: flex-start;

  #input-container {
    max-width: 15.63vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;

    & > :nth-child(1) {
      width: 50%;
    }

    #input-container {
      max-width: 100%;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > :nth-child(1) {
      width: auto;
    }
  }
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 0.83vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-top: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
const CopyIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  display: flex;
  right: 16px;
  :hover {
    svg {
      path {
        opacity: 0.8;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 4.27vw;
  }
`;
