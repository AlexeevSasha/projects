import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ICardServices } from "../../../api/dto/ICardServices";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";

interface IProps {
  servicesData?: ICardServices[];
  defaultUrl?: string;
  webViewPrefix?: string;
}

export const CardServices = ({ servicesData, defaultUrl, webViewPrefix = "" }: IProps) => {
  const { locale = "ru", pathname } = useRouter();
  return (
    <ContainerContent>
      <Container rows={servicesData?.length}>
        {servicesData?.map((elem, index) => (
          <ContainerWithBackgroundImg
            key={index}
            gradient={theme.gradients.first}
            src={elem.photo}
            position="center"
            quality={100}
          >
            <Link
              prefetch={false}
              href={{ pathname: (defaultUrl || `${webViewPrefix}/stadium/services/`) + elem.path }}
              passHref
              locale={locale}
            >
              <ServiceCard>
                <ServiceDescription>
                  <CardName>{getLocalValue(elem.cardName, locale)}</CardName>

                  <CardDescription hide={pathname.includes("tickets/info") || pathname.includes("stadium/services")}>
                    {getLocalValue(elem.cardDescription, locale)}
                  </CardDescription>
                </ServiceDescription>

                <Arrow>
                  <IconArrowRight />
                </Arrow>
              </ServiceCard>
            </Link>
          </ContainerWithBackgroundImg>
        ))}
      </Container>
    </ContainerContent>
  );
};

const Container = styled.section<{ rows?: number }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(calc(${({ rows }) => rows} / 2), 22.24vw);
  padding: 4.17vw 0 10.1vw;
  gap: 1.25vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${({ rows }) => rows}, 51.37vw);
    padding: 5.22vw 0;
    gap: 4.17vw;
    height: inherit;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${({ rows }) => rows}, 50.13vw);
    padding: 10.67vw 0;
    gap: 6.4vw;
  }
`;

const CardName = styled.span`
  padding-right: 1.25vw;
  box-sizing: border-box;
  display: block;
  font-size: 2.08vw;
  width: 100%;
  color: ${theme.colors.white};
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const ServiceDescription = styled.span`
  display: block;
  z-index: 10;
  gap: 0.83vw;
  overflow: hidden;
`;

const Arrow = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  padding-right: 1.25vw;
  transition: 0.4s ease;
`;

const CardDescription = styled.span<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "block")};
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  transition: all 0.3s ease-in-out;
  transform: translateY(100%);
  height: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ServiceCard = styled.p`
  display: flex;
  align-items: end;
  padding: 1.25vw 2.08vw;
  z-index: 10;
  margin: 0;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
  }

  :hover ${CardDescription} {
    transform: translateY(0);
    height: auto;
  }

  :hover ${Arrow} {
    padding-right: 0;
  }
`;
