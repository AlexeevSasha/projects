import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import { lang } from "../../../../public/locales/lang";
import { IPlayer } from "../../../api/dto/IPlayer";
import { SearchResult } from "../../../api/dto/search";
import { searchRepository } from "../../../api/searchRepository";
import { MoreButton } from "../../../components/buttons/moreButton";
import { PersonCard } from "../../../components/personCard";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
import { PersonWrapper } from "../personWrapper";
import { CardContainer } from "./../ui";

interface IProps {
  players: IPlayer[];
  count: SearchResult["Count"];
}

export const TabOfPlayersSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [list, setList] = useState<IPlayer[]>(props.players);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    searchRepository
      .fetchSearch({
        SearchPhrase: query.search ? `${query.search}` : query.search,
        Page: newPage,
        Size: 6,
        CategoryTypes: "Players",
      })
      .then((res) => {
        setList([...list, ...(res.Players || [])]);
      })
      .finally(() => {
        setPage(newPage);
        setLoading(false);
      });
  };

  return (
    <>
      <CardContainer>
        {list?.map((player) => (
          <PersonWrapper key={player.Id} person={player} isPlayer>
            <PersonCard data={player} />
          </PersonWrapper>
        ))}
      </CardContainer>

      <Spacer height={["2.08vw", "3.13vw", "4.27vw"]} />
      {props.count > page * 6 ? (
        <MoreButton type="opacity" onClick={onSearch(page + 1)}>
          {lang[locale].button.loadMore}
        </MoreButton>
      ) : null}

      <Spacer height={["2.08vw", "5.21vw", "0.53vw"]} />
    </>
  );
});
