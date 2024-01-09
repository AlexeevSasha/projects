import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { PersonCard } from "../../../components/personCard";
import { PersonWrapper } from "../personWrapper";
import { CardContainer, ShowMore } from "./../ui";

interface IProps {
  players: SearchResult["Players"];
}

export const BlockOfPlayersSearchResult = memo(({ players }: IProps) => {
  const { locale = "ru", query } = useRouter();

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList["shop/players"]}>
        <CardContainer isInDropdown>
          {players?.map((player) => (
            <PersonWrapper key={player.Id} person={player} isPlayer>
              <PersonCard data={player} />
            </PersonWrapper>
          ))}
        </CardContainer>
      </DropdownList>

      <Link prefetch={false} href={{ pathname: "/search", query: { ...query, tab: "Players" } }} passHref>
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});
