import { useRouter } from "next/router";
import styled from "styled-components";
import { SearchResult } from "../../api/dto/search";
import { Spacer } from "../../components/spacer";
import { InfoSearch } from "./infoSearch";
import { MatchesSearch } from "./matchesSearch";
import { MediaSearch } from "./mediaSearch";
import { PersonSearch } from "./personSearch";
import { PlayersSearch } from "./playersSearch";
import { ShopSearch } from "./shopSearch";
import { TeamsSearch } from "./teamsSearch";

export const Search = ({
  Count,
  Media,
  Matches,
  Players,
  Teams,
  Tickets,
  Staff,
  Bosses,
  Coaches,
  Info,
  Products,
}: SearchResult) => {
  const { query } = useRouter();
  return (
    <Container>
      {!!Media?.length && <MediaSearch media={Media} count={Count} />}

      {!!Matches?.length && <MatchesSearch matches={Matches} count={Count} />}

      {!!(Staff?.length || Bosses?.length || Coaches?.length) && (
        <PersonSearch staff={Staff} bosses={Bosses} coaches={Coaches} count={Count} />
      )}

      {!!Players?.length && <PlayersSearch players={Players} count={Count} />}

      {!!Teams?.length && <TeamsSearch teams={Teams} count={Count} />}

      {!!Tickets?.length && <MatchesSearch matches={Tickets} count={Count} isTickets />}

      {!!Products?.length && <ShopSearch products={Products} count={Count} />}

      {!!Info?.length && <InfoSearch info={Info} count={Count} />}

      {(query.tab === "All" || query.tab === "Shop") && <Spacer height={["10.83vw", "10.43vw", "10.66vw"]} />}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2.08vw;
`;
