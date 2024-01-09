import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { searchRepository } from "../../../api/searchRepository";
import { MoreButton } from "../../../components/buttons/moreButton";
import { PersonCard } from "../../../components/personCard";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
import { PersonWrapper } from "../personWrapper";
import { CardContainer } from "./../ui";

type Props = {
  coaches: SearchResult["Coaches"];
  bosses: SearchResult["Bosses"];
  staff: SearchResult["Staff"];
  count: SearchResult["Count"];
};

export const TabOfPersonSearchResult = memo(({ coaches = [], bosses = [], staff = [], count }: Props) => {
  const { locale = "ru", query } = useRouter();
  const [list, setList] = useState<any[]>([
    ...bosses,
    ...coaches.map((item) => ({ ...item, isCoach: true })),
    ...staff,
  ]);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    searchRepository
      .fetchSearch({
        SearchPhrase: query.search ? `${query.search}` : query.search,
        Page: newPage,
        Size: 6,
        CategoryTypes: "Staff&CategoryTypes=Coaches&CategoryTypes=Bosses",
      })
      .then((res) => {
        setList([
          ...list,
          ...(res.Bosses || []),
          ...(res.Coaches?.map((item) => ({ ...item, isCoach: true })) || []),
          ...(res.Staff || []),
        ]);
      })
      .finally(() => {
        setPage(newPage);
        setLoading(false);
      });
  };

  return (
    <>
      <CardContainer>
        {list.map((person) => (
          <PersonWrapper key={person.Id} person={person}>
            <PersonCard data={person} locationAcademy={false} showPosition />
          </PersonWrapper>
        ))}
      </CardContainer>

      <Spacer height={["2.08vw", "3.13vw", "4.27vw"]} />
      {count > page * 6 ? (
        <MoreButton type="opacity" onClick={onSearch(page + 1)}>
          {lang[locale].button.loadMore}
        </MoreButton>
      ) : null}

      <Spacer height={["2.08vw", "5.21vw", "0.53vw"]} />
    </>
  );
});
