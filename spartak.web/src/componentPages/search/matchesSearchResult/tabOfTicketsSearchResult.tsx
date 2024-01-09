import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import { lang } from "../../../../public/locales/lang";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { SearchResult } from "../../../api/dto/search";
import { searchRepository } from "../../../api/searchRepository";
import { MoreButton } from "../../../components/buttons/moreButton";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
import { RowTicketInfo } from "../../pageMatches/matchTableInfo/rowMatchInfo";

interface IProps {
  matches: IMatchDto[];
  count: SearchResult["Count"];
}

export const TabOfTicketsSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [list, setList] = useState<IMatchDto[]>(props.matches);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    searchRepository
      .fetchSearch({
        SearchPhrase: query.search ? `${query.search}` : query.search,
        Page: newPage,
        Size: 6,
        CategoryTypes: "Tickets",
      })
      .then((res) => {
        setList([...list, ...(res.Matches || [])]);
      })
      .finally(() => {
        setPage(newPage);
        setLoading(false);
      });
  };

  return (
    <>
      {list.map((elem) => (
        <RowTicketInfo key={elem.Id} currentMatch={elem} typeMatch={elem.Type === "Past" ? "old" : "new"} />
      ))}

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
