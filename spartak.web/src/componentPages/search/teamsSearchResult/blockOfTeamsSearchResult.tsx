import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CardContainer, ShowMore } from "./../ui";

interface IProps {
  teams: SearchResult["Teams"];
}

export const BlockOfTeamsSearchResult = memo(({ teams }: IProps) => {
  const { locale = "ru", query } = useRouter();

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList["shop/teams"]}>
        <CardWrapper isInDropdown>
          {teams?.map((value) => (
            <Link
              key={value.Id}
              passHref
              href={value.Section === "Site" ? `/teams/${value.Id}` : `/academy/teams/${value.Id}`}
            >
              <TeamCard>
                <ImgWrapper>
                  <NextImage src={value.ImageUrl} />
                </ImgWrapper>

                <CardTitle>{getLocalValue(value.FullName, locale)}</CardTitle>
              </TeamCard>
            </Link>
          ))}
        </CardWrapper>
      </DropdownList>

      <Link prefetch={false} href={{ pathname: "/search", query: { ...query, tab: "Teams" } }} passHref>
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});

const CardWrapper = styled(CardContainer)`
  @media (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TeamCard = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const CardTitle = styled.div`
  font-family: "FCSM Text";
  font-weight: 700;
  font-size: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};
  text-align: center;
  margin-top: 1.04vw;
`;

const ImgWrapper = styled.div`
  border: 1px solid ${theme.colors.grayDark};
  width: 100%;
  height: 15.57vw;

  @media (max-width: ${theme.rubberSize.desktop}) {
    height: 30vw;
  }

  @media (max-width: ${theme.rubberSize.tablet}) {
    height: 25.866vw;
  }
`;
