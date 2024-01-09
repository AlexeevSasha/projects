import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IClubContacts } from "../../src/api/dto/ICLubContacts";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { ClubsDropdownList } from "../../src/componentPages/pageClub/clubsDropdownList";
import { BannerHistory } from "../../src/componentPages/pageClub/pageResults/bannerHistory";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";

interface IProps {
  contacts?: IClubContacts;
}

export default function Contacts(props: IProps) {
  const { locale } = useRouter();

  return (
    <>
      <BannerHistory mainInfo={props.contacts?.mainInfo} />
      {props.contacts ? (
        <Container>
          {props.contacts?.clubContacts?.map((elem, index) => (
            <ClubsDropdownList
              defaultState={!index}
              key={"contact_" + index}
              title={getLocalValue(elem.title, locale)}
              description={getLocalValue(elem.description, locale)}
            />
          ))}
        </Container>
      ) : (
        <NoData />
      )}
    </>
  );
}

Contacts.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "clubContacts" })).value[0];
  const contacts = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: contacts?.metaTags || (seodata as Record<string, any>)["/club/contacts"] || null,
      contacts,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const Container = styled(ContainerContent)`
  box-sizing: border-box;
  flex-direction: column;
  margin: 4.17vw auto 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw auto 13.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto 26.67vw;
  }
`;
