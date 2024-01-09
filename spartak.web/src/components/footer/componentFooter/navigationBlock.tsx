import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IProductCategory } from "../../../api/dto/IProduct";
import { ITeam } from "../../../api/dto/ITeam";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ApplicationBlock } from "./applicationBlock";
import { mockNav } from "./mockNav";
import { PaymentSystems } from "./paymentSystems";

type Props = {
  teams: ITeam[];
  shopCategories: {
    ru: IProductCategory[];
    en: IProductCategory[];
  };
};

export const NavigationBlock = ({ teams, shopCategories }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <FooterNavigationBlock>
      {mockNav(locale).map((elem, index) => (
        <NavigationColumns key={index}>
          <ColumnTitle>{lang[locale].footer.nav[elem.label]}</ColumnTitle>

          {elem.label != "paymentSystems" &&
            (elem.label === "teams"
              ? teams.map((team, index) => (
                  <Link prefetch={false} key={index} href={`/teams/${team.Id}`} passHref>
                    <StyledLink>{getLocalValue(team.FullName, locale)}</StyledLink>
                  </Link>
                ))
              : elem.label === "shop"
              ? shopCategories[locale as "ru" | "en"]?.map((child, index) => (
                  <Link
                    prefetch={false}
                    key={index}
                    href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}${child.link}`}
                    passHref
                  >
                    <StyledLink>{child.label}</StyledLink>
                  </Link>
                ))
              : elem.child?.map((child, index) => (
                  <Link prefetch={false} key={index} href={child.link} passHref>
                    <StyledLink target={child.link.startsWith("http") ? "_blank" : "_self"}>
                      {lang[locale].footer.nav[child.label]}
                    </StyledLink>
                  </Link>
                )))}

          {elem.secondBlock && <ColumnTitle>{lang[locale].footer.nav[elem.secondBlock.label]}</ColumnTitle>}

          {elem.label === "paymentSystems" && <PaymentSystems />}

          {elem.secondBlock?.child?.map((child, index) => (
            <Link prefetch={false} key={index} href={child.link} passHref>
              <StyledLink>{lang[locale].footer.nav[child.label]}</StyledLink>
            </Link>
          ))}

          {elem.label === "paymentSystems" && <ApplicationBlock />}
        </NavigationColumns>
      ))}
    </FooterNavigationBlock>
  );
};

const FooterNavigationBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 4vw;
  padding-bottom: 1.67vw;
  color: ${theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 7.56vw;
    grid-row-gap: 4.17vw;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 3.2vw;
    grid-row-gap: 6.4vw;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    padding-bottom: 6.4vw;
  }
`;

const NavigationColumns = styled.nav`
  display: flex;
  flex-direction: column;

  gap: 0.83vw;
  height: fit-content;

  h2:nth-of-type(2) {
    padding-top: 2.08vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-top: 2.61vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-top: 3.2vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 3.2vw;
  }
`;

const ColumnTitle = styled.h2`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.83vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: normal;
    font-size: 3.73vw;
  }
`;

const StyledLink = styled.a`
  font-family: "FCSM Text", sans-serif;
  cursor: pointer;
  font-size: 0.73vw;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;
