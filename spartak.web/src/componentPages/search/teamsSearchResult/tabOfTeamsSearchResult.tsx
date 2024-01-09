import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { SearchResult } from "../../../api/dto/search";
import { searchRepository } from "../../../api/searchRepository";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { MoreButton } from "../../../components/buttons/moreButton";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CardContainer } from "./../ui";

interface IProps {
  teams: SearchResult["Teams"];
  count: SearchResult["Count"];
}

export const TabOfTeamsSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [list, setList] = useState<SearchResult["Teams"]>(props.teams);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    searchRepository
      .fetchSearch({
        SearchPhrase: query.search ? `${query.search}` : query.search,
        Page: newPage,
        Size: 6,
        CategoryTypes: "Teams",
      })
      .then((res) => {
        setList([...(list || []), ...(res.Teams || [])]);
      })
      .finally(() => {
        setPage(newPage);
        setLoading(false);
      });
  };

  return (
    <>
      <CardWrapper>
        {list?.map((value) => (
          <Link
            key={value.Id}
            passHref
            href={value.Section === "Site" ? `/teams/${value.Id}` : `/academy/teams/${value.Id}`}
          >
            <TeamCard key={value.Id}>
              <ImgWrapper>
                <NextImage src={value.ImageUrl} />
              </ImgWrapper>

              <CardTitle>{getLocalValue(value.FullName, locale)}</CardTitle>
            </TeamCard>
          </Link>
        ))}
      </CardWrapper>

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
