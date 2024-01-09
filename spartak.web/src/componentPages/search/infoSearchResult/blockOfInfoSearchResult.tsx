import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { infoSections } from "../../../assets/constants/infoSections";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { ShowMore } from "./../ui";

interface IProps {
  info: SearchResult["Info"];
}

export const BlockOfInfoSearchResult = memo(({ info }: IProps) => {
  const { locale = "ru", query } = useRouter();

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList["shop/info"]}>
        <CardContainer isInDropdown rows={Math.ceil((info?.length || 1) / 2)}>
          {info?.map((item) => (
            <ContainerWithBackgroundImg
              key={item.Id}
              gradient={theme.gradients.first}
              src={item.ImageUrl}
              position="center"
            >
              <Link prefetch={false} href={infoSections[item.Type]?.link || ""} passHref locale={locale}>
                <ServiceCard>
                  <ServiceDescription>
                    <CardName>{getLocalValue(infoSections[item.Type]?.title, locale)}</CardName>
                  </ServiceDescription>

                  <Arrow>
                    <IconArrowRight />
                  </Arrow>
                </ServiceCard>
              </Link>
            </ContainerWithBackgroundImg>
          ))}
        </CardContainer>
      </DropdownList>

      <Link
        prefetch={false}
        href={{
          pathname: "/search",
          query: { ...query, tab: "Info" },
        }}
        passHref
      >
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});

const CardContainer = styled.div<{ isInDropdown?: boolean; rows: number }>`
  margin-top: ${(props) => (props.isInDropdown ? "-1.04vw" : "")};
  color: ${theme.colors.white};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 22.24vw)`};
  padding: 4.17vw 0;
  column-gap: 1.25vw;
  row-gap: 2.08vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;

    & > *:not(:last-child) {
      margin-bottom: 4.17vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > *:not(:last-child) {
      margin-bottom: 6.4vw;
    }
  }
`;

const CardName = styled.span`
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
    height: 51.36vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    height: 50.13vw;
  }

  :hover ${Arrow} {
    padding-right: 0;
  }
`;
