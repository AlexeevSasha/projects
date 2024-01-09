import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { PersonCard } from "../../../components/personCard";
import { PersonWrapper } from "../personWrapper";
import { CardContainer, ShowMore } from "./../ui";

type Props = {
  coaches: SearchResult["Coaches"];
  bosses: SearchResult["Bosses"];
  staff: SearchResult["Staff"];
};

export const BlockOfPersonSearchResult = memo(({ coaches = [], bosses = [], staff = [] }: Props) => {
  const { locale = "ru", query } = useRouter();
  const persons = [...bosses, ...coaches.map((item) => ({ ...item, isCoach: true })), ...staff];

  return (
    <>
      <DropdownList defaultState title={lang[locale].search.liders}>
        <CardContainer isInDropdown>
          {persons.map((person) => (
            <PersonWrapper key={person.Id} person={person}>
              <PersonCard data={person} locationAcademy={false} showPosition />
            </PersonWrapper>
          ))}
        </CardContainer>
      </DropdownList>

      <Link prefetch={false} href={{ pathname: "/search", query: { ...query, tab: "Club" } }} passHref>
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});
