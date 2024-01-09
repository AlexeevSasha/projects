import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { lang } from "../../../../public/locales/lang";
import { IMediaShort } from "../../../api/dto/IMedia";
import { CardNews } from "../../../components/cardNews/cardNews";
import { CardVideo } from "../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../components/clickPlayVideo/clickPlayVideo";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { CardContainer, ShowMore } from "./../ui";

interface IProps {
  media: IMediaShort[];
}

export const BlockOfMediaSearchResult = memo((props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();

  return (
    <>
      <DropdownList defaultState title={lang[locale].header.navList["shop/media"]}>
        <CardContainer isInDropdown>
          {props.media.map((value) => {
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
                  <>
                    <CardVideo key={value.Id} videoInfo={value} defaultUrl="/media/videos/" clickPlay={setShowModal} />
                    {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
                  </>
                );
              }
              default: {
                return null;
              }
            }
          })}
        </CardContainer>
      </DropdownList>

      <Link prefetch={false} href={{ pathname: "/search", query: { ...query, tab: "Media" } }} passHref>
        <ShowMore>{lang[locale].search.showAll}</ShowMore>
      </Link>
    </>
  );
});
