import React from "react";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { Offers } from "../../../../../pages/more/loyalty/main";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import styled from "styled-components";
import { Spacer } from "../../../../components/spacer";
import { theme } from "../../../../assets/theme/theme";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { lang } from "../../../../../public/locales/lang";
import { NextLink } from "../../../../components/nextLink/nextLink";

export const LoyaltyFieldsOffers = ({ partnersOffers }: Offers) => {
  const { locale = "ru" } = useRouter();

  return partnersOffers?.length ? (
    <Container>
      <Title>{lang[locale].profile.specialOffers.partnersOffers}</Title>
      <Spacer height={["40px", "40px", "24px"]} />

      <GridList>
        {partnersOffers?.map((item, index) => (
          <div key={index}>
            <ImageContainer>
              <NextImage src={getLocalValue(item?.image, locale)} alt="" />
            </ImageContainer>

            <DescriptionContainer>{getLocalValue(item?.description, locale)}</DescriptionContainer>
          </div>
        ))}
      </GridList>
      <Spacer height={["40px", "40px", "24px"]} />
      <ToOffers>
        {lang[locale].profile.specialOffers.details}
        <NextLink url="/profile/specialOffers?tab=FromPartners" target={"_self"}>
          {" "}
          “{lang[locale].profile.specialOffers.partnersOffers}”
        </NextLink>
      </ToOffers>
    </Container>
  ) : null;
};
const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: start;
  margin-bottom: 6.2vw;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 20.53vw;
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 2.71vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-weight: 600;
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 2.08vw;
  column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    row-gap: 6.4vw;
  }
`;
const ImageContainer = styled.div`
  outline: 1px solid #5c6168;
  padding: 0.52vw 12.71vw 0.52vw 1.25vw;
  height: 6.35vw;
  width: 12.71vw;
  filter: ${({ theme }) => theme.colors.none_invert};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0;
    height: 15.91vw;
    width: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 22.4vw;
  }
`;
const DescriptionContainer = styled.div`
  font-size: 1.25vw;
  padding-top: 1.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-top: 4.27vw;
  }
`;

const ToOffers = styled.span`
  font-size: 0.94vw;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
  a {
    color: ${theme.colors.fireEngineRed};
    text-decoration: none;
    cursor: pointer;
  }
`;
