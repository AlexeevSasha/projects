import { useRouter } from "next/router";
import { Fragment, memo, useContext, useState } from "react";
import { lang } from "../../../../public/locales/lang";
import { IMediaShort } from "../../../api/dto/IMedia";
import { SearchResult } from "../../../api/dto/search";
import { searchRepository } from "../../../api/searchRepository";
import { MoreButton } from "../../../components/buttons/moreButton";
import { CardNews } from "../../../components/cardNews/cardNews";
import { CardVideo } from "../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../components/clickPlayVideo/clickPlayVideo";
import { Spacer } from "../../../components/spacer";
import { DataContext } from "../../../core/dataProvider";
import { CardContainer } from "./../ui";

interface IProps {
  media: IMediaShort[];
  count: SearchResult["Count"];
}

export const TabOfMediaSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  const [list, setList] = useState<IMediaShort[]>(props.media);
  const [page, setPage] = useState(1);
  const { setLoading } = useContext(DataContext);

  const onSearch = (newPage: number) => () => {
    setLoading(true);
    searchRepository
      .fetchSearch({
        SearchPhrase: query.search ? `${query.search}` : query.search,
        Page: newPage,
        Size: 6,
        CategoryTypes: "Media",
      })
      .then((res) => {
        setList([...list, ...(res.Media || [])]);
      })
      .finally(() => {
        setPage(newPage);
        setLoading(false);
      });
  };

  return (
    <>
      <CardContainer>
        {list.map((value) => {
          switch (value.MediaType) {
            case "News": {
              return (
                <CardNews
                  key={value.Id}
                  news={value}
                  defaultUrl={value.Section === "Site" ? "/media/news/" : "/academy/media/"}
                />
              );
            }
            case "Gallery": {
              return (
                <CardNews
                  key={value.Id}
                  news={value}
                  defaultUrl={value.Section === "Site" ? "/media/gallery/" : "/academy/media/"}
                />
              );
            }
            case "Video": {
              return (
                <Fragment key={value.Id}>
                  <CardVideo videoInfo={value} defaultUrl="/media/videos/" clickPlay={setShowModal} />
                  {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
                </Fragment>
              );
            }
            default: {
              return null;
            }
          }
        })}
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
