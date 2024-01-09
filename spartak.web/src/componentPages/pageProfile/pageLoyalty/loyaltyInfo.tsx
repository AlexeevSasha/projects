import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { LoyaltyConditionCheck, PromoDto } from "../../../api/dto/loyalty";
import { formatDate } from "../../../assets/constants/date";
import { ChecksIcon } from "../../../assets/icon/checksIcon";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { PromoAlert } from "./promoAlert";
import { PromoWinner } from "./promoWinner";
import { SaveAlert } from "../saveAlert";
import React from "react";

type Props = {
  promo?: PromoDto;
  accepted?: LoyaltyConditionCheck;
  confirm?: () => void;
};

export const LoyaltyInfo = ({ promo, accepted, confirm }: Props) => {
  const { locale = "ru", push } = useRouter();

  return promo ? (
    <>
      <ContainerWithBackgroundImg src={promo?.ImageUrl} gradient={theme.gradients.first} position="center">
        <BannerInner>
          <Button type="opacity" withGap onClick={() => push("/profile/loyalty")}>
            <IconArrowRight rotate="180deg" />
            {lang[locale].profileLoyalty.btnText}
          </Button>
        </BannerInner>
      </ContainerWithBackgroundImg>

      <Container>
        <div>
          <Title>{promo?.Title}</Title>

          <DateText>
            {lang[locale].profileLoyalty.from} {formatDate(promo?.StartDate, "dd.MM.yyyy", locale)}{" "}
            {lang[locale].profileLoyalty.to} {formatDate(promo?.EndDate, "dd.MM.yyyy", locale)}
          </DateText>

          <ContainerAlert show="mobile">
            <PromoAlert promo={promo} accepted={accepted} />
          </ContainerAlert>

          <SubTitle>{lang[locale].profileLoyalty.aboutTitle}</SubTitle>

          <Desc dangerouslySetInnerHTML={{ __html: promo?.Description }} />

          {promo?.NoCondition ? null : <SubTitle>{lang[locale].profileLoyalty.termsTitle}</SubTitle>}

          {promo?.NoCondition ? null : (
            <List>
              {promo?.BoughtTicket?.IsActive ? (
                <ListItem>
                  {promo?.IsWinner ? <ChecksIcon /> : accepted?.BoughtTicket?.IsCheck ? <ChecksIcon /> : <Dot />}
                  <span>
                    {lang[locale].profileLoyalty.terms.boughtTicket(
                      promo.BoughtTicket.MatchName,
                      promo.BoughtTicket.SectorNames,
                      promo.BoughtTicket.Quantity
                    )}
                  </span>
                </ListItem>
              ) : null}
              {promo?.NewUser ? (
                <ListItem>
                  {promo?.IsWinner ? <ChecksIcon /> : accepted?.NewUserCheck ? <ChecksIcon /> : <Dot />}
                  <span>{lang[locale].profileLoyalty.terms.newUser}</span>
                </ListItem>
              ) : null}
            </List>
          )}

          {promo?.IsWinner || accepted?.IsWinner || promo.LoyaltyAwardType === "ExternalReference" ? (
            <PromoWinner promo={promo} accepted={accepted} /> // Показывать элемент при победе
          ) : promo?.OutOfStock || new Date(promo.EndDate) < new Date() ? null : ( // Если акция закончилась и пользователь не победил, то не отображать кнопки
            <ButtonContainer>
              <CustomButton type="red" onClick={confirm}>
                {promo.LoyaltyAwardType === "FreeBet"
                  ? lang[locale].profileLoyalty.getFreebet
                  : lang[locale].profileLoyalty.confirm}
              </CustomButton>
            </ButtonContainer>
          )}
        </div>
        <SaveAlert> {lang[locale].profile.profileBanner.alertCopySuccess} </SaveAlert>

        <ContainerAlert show="desktop">
          <PromoAlert promo={promo} accepted={accepted} />
        </ContainerAlert>
      </Container>
    </>
  ) : null;
};

const Container = styled(ContainerContent)`
  justify-content: space-between;
  color: ${theme.colors.white};
  margin-bottom: 6.25vw;
  margin-top: 2.08vw;

  & > div:first-child {
    width: 54.635vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    flex-direction: column-reverse;
    margin-bottom: 13.04vw;
    margin-top: 0;

    & > div:first-child {
      width: 100%;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-bottom: 21.33vw;
  }
`;

const Button = styled(CustomButton)`
  border-color: ${({ theme }) => theme.colors.grayLight_gray1};
  color: ${({ theme }) => theme.colors.grayLight_gray1};
  padding: 0;
  width: 8.23vw;
  height: 2.08vw;
  z-index: 1;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_gray1};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 20.6vw;
    height: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 38.13vw;
    height: 8.53vw;
    font-size: 3.2vw;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white_black};
  margin: 0;
  margin-bottom: 0.83vw;
  font-weight: 700;
  font-size: 2.7vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.08vw;
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.266vw;
    font-size: 8.53vw;
  }
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-size: 1.25vw;
  margin-bottom: 2.08vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.346vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    margin-bottom: 6.4vw;
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.83vw;
  font-size: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.08vw;
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.26vw;
    font-size: 8.53vw;
  }
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.gray_black};
  font-weight: 500;
  font-size: 0.94vw;
  margin-bottom: 2.08vw;
  white-space: pre-line;

  a {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.346vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.266vw;
    margin-bottom: 6.4vw;
  }
`;

const List = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 1.25vw;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.346vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    margin-bottom: 6.4vw;
  }
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 2.08vw auto;
  grid-column-gap: 1.25vw;

  &:not(:last-child) {
    margin-bottom: 1.145vw;
  }
  span {
    display: flex;
    align-items: center;
  }
  & > svg {
    color: ${theme.colors.green};
    font-size: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 3.13vw auto;
    grid-column-gap: 1.04vw;

    &:not(:last-child) {
      margin-bottom: 2.08vw;
    }

    & > svg {
      font-size: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 6.4vw auto;
    grid-column-gap: 2.13vw;

    &:not(:last-child) {
      margin-bottom: 4.266vw;
    }

    & > svg {
      font-size: 6.4vw;
    }
  }
`;

const Dot = styled.div`
  width: 2.08vw;
  height: 2.08vw;
  background: #cc122d19;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &::after {
    content: "";
    background: ${theme.colors.red};
    width: 0.83vw;
    height: 0.83vw;
    border-radius: 50%;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;

    &::after {
      width: 1.56vw;
      height: 1.56vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;

    &::after {
      width: 3.2vw;
      height: 3.2vw;
    }
  }
`;

const BannerInner = styled.div`
  height: 31.25vw;
  padding: 0 0 2.08vw 8.75vw;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 0 5.215vw 4vw;
    height: 45.63vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 0 6.4vw 2.09vw;
    height: 80vw;
  }
`;

const ContainerAlert = styled.div<{ show?: "desktop" | "mobile" }>`
  display: ${({ show }) => (show === "mobile" ? "none" : "block")};
  width: 19.6875vw;
  align-self: flex-start;

  div > span {
    color: ${({ theme }) => theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ show }) => (show === "desktop" ? "none" : "block")};
    width: 49.28vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    margin-bottom: 6.4vw;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
  }
`;
