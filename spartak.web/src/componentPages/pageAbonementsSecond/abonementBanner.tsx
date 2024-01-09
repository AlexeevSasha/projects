import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IAbomenent } from "../../api/dto/IAbonement";
import { ISubscription } from "../../api/dto/ISubscription";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../components/containers/containerBanner";
import { useWindowSize } from "../../core/hooks/UseWindowSize";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  subscription?: ISubscription & IAbomenent;
}

export const AbonementBanner = (props: IProps) => {
  const { locale = "ru", push } = useRouter();
  const { width = 0 } = useWindowSize(true);

  const showBuySubscription = useMemo(() => {
    return (
      props.subscription?.SaleEnabled &&
      props.subscription?.TotalTickets > 0 &&
      !props.subscription?.GroupLimits?.includes(14)
      // 14 - это id тестовой группы, они не должны отображаться на сайте
    );
  }, [props.subscription]);

  return (
    <Container>
      <BannerBackground
        srcL="/images/banners/bgSubscriptionL_v1.0.0.png"
        srcM="/images/banners/bgSubscriptionM_v1.0.0.png"
        srcS="/images/banners/bgSubscriptionS_v1.0.0.png"
      />
      <InvitationBlock>
        <Title>{lang[locale].subscription.bestSeats}</Title>

        <Text>{lang[locale].subscription.ticketsSection}</Text>
        {showBuySubscription && (
          <ButtonArrow
            type={"opacity"}
            withGap
            onClick={() =>
              push(`${process.env.NEXT_PUBLIC_TICKETS_URL}/view-available-zones/${props.subscription?.EventId}`)
            }
          >
            <IconArrowRight />

            <span>{lang[locale].subscription.buySubscription}</span>
          </ButtonArrow>
        )}
      </InvitationBlock>

      {width >= 1200 ? (
        <ContainerImage>
          <NextImage alt={"*держатель абонементов*"} src={"/images/tickets/abonements/abonementImage_v1.0.0.png"} />
        </ContainerImage>
      ) : null}
    </Container>
  );
};

const Container = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  margin-top: 0;
  font-weight: 500;
  margin-bottom: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const InvitationBlock = styled(ContentBlockBase)`
  display: flex;
  flex-direction: column;
  width: 51.39vw;
  box-sizing: border-box;
  grid-row-gap: 0.83vw;
  padding: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    grid-row-gap: 3.13vw;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    padding: 6.4vw;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 2.08vw;
  padding-right: 8vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-right: 10vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-right: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-right: 12vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: 0;
    font-size: 4.27vw;
  }
`;

const ButtonArrow = styled(CustomButton)`
  box-sizing: border-box;
  width: fit-content;
  margin-top: 1.25vw;
  border-color: ${theme.colors.white};
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.8vw;
    width: 100%;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const ContainerImage = styled.div`
  position: absolute;
  width: 15.78vw;
  height: 17.08vw;
  right: 16.41vw;
  bottom: 0;
`;
