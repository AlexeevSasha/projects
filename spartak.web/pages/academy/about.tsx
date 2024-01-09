import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import { birthdayPeopleRepository } from "../../src/api/birthdayPeopleRepository";
import { ISliderAcademy } from "../../src/api/dto/IAcademySLider";
import { IBirthdayPeople } from "../../src/api/dto/IBirthdayPeople";
import { IMediaShort, listFieldMediaShort } from "../../src/api/dto/IMedia";
import { IMediaFilters, mediaRepository } from "../../src/api/mediaRepository";
import { AboutAcademyBanner } from "../../src/componentPages/pageAcademy/about/banner/aboutAcademyBanner";
import { BirthdayPeople } from "../../src/componentPages/pageAcademy/about/birthdayPeople/birthdayPeople";
import { GalleryAcademySlider } from "../../src/componentPages/pageAcademy/about/media/galleryAcademy";
import { NewsAcademy } from "../../src/componentPages/pageAcademy/about/media/newsAcademy";
import { VideoAcademy } from "../../src/componentPages/pageAcademy/about/media/videoAcademy";
import { PrivilegeComponents } from "../../src/componentPages/pageAcademy/about/privilegeComponents/privilegeComponents";
import { SupposrtAcademy } from "../../src/componentPages/pageAcademy/about/supposrtAcademy";
import { AcademyLayout } from "../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { SwiperWithBigActiveElem } from "../../src/components/reactSwiper/swiperWithBigActiveElem";

interface IProps {
  itemsList: ISliderAcademy[];
  newsList?: IMediaShort[];
  videoList?: IMediaShort[];
  galleryList?: IMediaShort[];
  birthdayList?: IBirthdayPeople[];
}

export default function AcademyAbout(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <AboutAcademyBanner />
      <PrivilegeComponents />
      <SwiperWithBigActiveElem itemsList={props.itemsList} title={lang[locale].academy.title.learnMore} />
      <NewsAcademy newsList={props.newsList} />
      <VideoAcademy videoList={props.videoList} />
      <GalleryAcademySlider galleryList={props.galleryList} />
      <BirthdayPeople birthdayList={props.birthdayList} />
      <SupposrtAcademy />
    </>
  );
}

AcademyAbout.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const academyMediaFilters: IMediaFilters = {
    IsDraft: "false",
    currentPage: 1,
    pageSize: 6,
    sorting: "PublishDateTime desc",
    Section: "Academy",
    PublishDateTime: true,
    MediaHeader: locale,
  };
  const [newsRes, videoRes, galleryRes, birthdayPeopleRes] = await Promise.allSettled([
    mediaRepository.fetchMedia(
      {
        MediaType: "News",
        ...academyMediaFilters,
      },
      listFieldMediaShort
    ),
    mediaRepository.fetchMedia(
      {
        MediaType: "Video",
        ...academyMediaFilters,
      },
      listFieldMediaShort
    ),
    mediaRepository.fetchMedia(
      {
        MediaType: "Gallery",
        ...academyMediaFilters,
      },
      listFieldMediaShort
    ),
    birthdayPeopleRepository.fetchBirthdayPeople(),
  ]);
  const itemsList = require("../../public/mockJSON/academyAbout.json");

  return {
    props: {
      newsList: newsRes.status === "fulfilled" ? newsRes.value.value || [] : [],
      videoList: videoRes.status === "fulfilled" ? videoRes.value.value || [] : [],
      galleryList: galleryRes.status === "fulfilled" ? galleryRes.value.value || [] : [],
      birthdayList: birthdayPeopleRes.status === "fulfilled" ? birthdayPeopleRes.value || [] : null,
      metaTags: (seodata as Record<string, any>)["/academy/about"] || null,
      title: (seodata as Record<string, any>)["/academy/about"].h1 || "academySpartak",
      itemsList: itemsList || [],
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
