import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IMediaShort, listFieldMediaShort } from "../../src/api/dto/IMedia";
import { mediaRepository } from "../../src/api/mediaRepository";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { PlayerNews } from "../../src/componentPages/pagePlayer/playerNews/playerNews";
import { MembershipOfTheVeteransCommittee } from "../../src/componentPages/pagesMore/oldPeople/membershipOfTheVeteransCommittee";
import { OldPeopleInfo } from "../../src/componentPages/pagesMore/oldPeople/oldPeopleInfo";
import { GetLayout } from "../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { Tour } from "../../src/components/tour/tour";
import { cmsRepository } from "../../src/api/cmsRepository";

interface IProps {
  dataJSON: any;
  playerNews: IMediaShort[];
  dataJSONmock: any;
}

export default function Legends(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <MainBannerWithTitle
        banner={props.dataJSON.mainInfo.previewImg.Ru}
        title={getLocalValue(props.dataJSON.mainInfo.title, locale)}
      />
      <Tour.RedBanner redBannerData={props.dataJSON.redBanner} />
      <MembershipOfTheVeteransCommittee
        membershipOfTheVeteransCommittee={props.dataJSON}
      />
      <OldPeopleInfo info={props.dataJSON.history} additional={props.dataJSON.additional} />
      <PlayerNews news={props.playerNews} title={getLocalValue(props.dataJSONmock.committeeNews.title, locale)} />
      <br />
      <br />
    </>
  );
}

Legends.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const dataJSONmock = require("../../public/mockJSON/more/oldPeople.json");

  // const gallery = (await mediaRepository.fetchMedia({ Id: "fbc4b4bd-107c-4adc-8bba-3c4016026041" })).value[0] || [];

  const playerNews = await mediaRepository.fetchMedia(
    {
      TeamsIds: "bac594c0-2e18-494e-bb0a-dc793a63cd31", //gallery?.TeamId,
      MediaStatus: "Published",
      MediaHeader: locale,
      sorting: "PublishDateTime desc",
      Section: "Site",
      pageSize: 15,
    },
    listFieldMediaShort
  );

  const res = (await cmsRepository.fetchCms({ Type: "legends" })).value[0];
  const dataJSON = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: dataJSON?.metaTags || dataJSONmock.metaTags,
      dataJSONmock,
      dataJSON,

      playerNews: playerNews.value,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
