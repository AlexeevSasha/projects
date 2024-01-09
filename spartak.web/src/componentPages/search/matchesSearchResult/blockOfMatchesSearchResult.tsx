import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { RowMatchInfo, RowTicketInfo } from "../../pageMatches/matchTableInfo/rowMatchInfo";
import { ShowMore } from "./../ui";

interface IProps {
  matches: IMatchDto[];
  isTickets?: boolean;
}

export const BlockOfMatchesSearchResult = memo(({ matches, isTickets }: IProps) => {
  const { locale = "ru", query } = useRouter();

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList[isTickets ? "shop/tickets" : "shop/matches"]}>
        <CardContainer isInDropdown>
          {isTickets
            ? matches.map((elem) => (
                <RowTicketInfo key={elem.Id} currentMatch={elem} typeMatch={elem.Type === "Past" ? "old" : "new"} />
              ))
            : matches.map((elem) => (
                <RowMatchInfo key={elem.Id} currentMatch={elem} typeMatch={elem.Type === "Past" ? "old" : "new"} />
              ))}
        </CardContainer>
      </DropdownList>

      <Link
        prefetch={false}
        href={{ pathname: "/search", query: { ...query, tab: isTickets ? "Tickets" : "Matches" } }}
        passHref
      >
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});

const CardContainer = styled.div<{ isInDropdown?: boolean }>`
  margin-top: ${({ isInDropdown }) => (isInDropdown ? "-1.04vw" : "")};
`;
